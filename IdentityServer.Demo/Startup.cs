using System;
using System.Collections.Generic;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using IdentityServerSample.Configuration;
using IdentityServerSample.Services;
using Serilog;

namespace IdentityServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            // Initialize Serilog from appsettings
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(Configuration)
                .CreateLogger();
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Initialize strongly-typed general configuration and add it to our dependency injection container
            IConfigurationSection generalConfigSection = Configuration.GetSection("GeneralConfig");
            GeneralConfig generalConfig = generalConfigSection.Get<GeneralConfig>();
            
            services.Configure<GeneralConfig>(options => generalConfigSection.Bind(options));

            // Configure CORS based on the origins specified in our configuration
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                    .WithOrigins(generalConfig.AllowedCorsOrigins)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials() );
            });

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => false;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            /* Configure our instance of IdentityServer.  This is where 
            much of the magic happens. */
            services.AddIdentityServer()
                /* Add statically-generated clients, identity resources, and API resources
                for our quickstart.  For an important production application we'd probably 
                want to configure this from a persistent store. */
                .AddInMemoryClients(ClientConfig.GetClients())                         
                .AddInMemoryIdentityResources(ResourceConfig.GetIdentityResources())
                .AddInMemoryApiResources(ResourceConfig.GetApiResources())
                /* Add our test users alice and bob for demo purposes.  For a production 
                application we'd obviously want to replace this with a persistent user
                store, which generally would be implementation-specific. */
                .AddTestUsers(TestUsersConfig.GetUsers())
                /* Use AddDeveloperSigningCredential for debugging only.  When we deploy
                we should consider using AddSigningCredential. */
                .AddDeveloperSigningCredential()
                /* ProfileService is used to issue claims for our id tokens
                and access tokens. */
                .AddProfileService<ProfileService>();

            // Configure external identity providers
            services.AddAuthentication()
                /* As a demo external identity provider we're using the hosted IdentityServer demo
                application.  Users can log in via their Google account or as alice/alice or bob/bob. */
                .AddOpenIdConnect("oidc", "OpenID Connect", options =>
                {
                    options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
                    options.SignOutScheme = IdentityServerConstants.SignoutScheme;

                    options.Authority = "https://demo.identityserver.io/";
                    options.ClientId = "implicit";

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        NameClaimType = "name",
                        RoleClaimType = "role"
                    };
                });


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            /* "Fix" claim mapping so that claims don't get mapped to Microsoft's legacy proprietary
            format and, by extension, so that we can process claims using the standard oidc caim types.
            For further reading:
            https://leastprivilege.com/2017/11/15/missing-claims-in-the-asp-net-core-2-openid-connect-handler/
            https://leastprivilege.com/2016/08/21/why-does-my-authorize-attribute-not-work/ */
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            // Add Serilog to the global logging pipeline
            loggerFactory.AddSerilog();
            
            // Tell the app to use the CORS policy that we configured in ConfigureServices.
            app.UseCors("CorsPolicy");

            // Tell the app to use IdentityServer
            app.UseIdentityServer();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
