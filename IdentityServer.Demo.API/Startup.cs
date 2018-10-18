using System;
using System.Collections.Generic;

using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Serilog;
using IdentityServerSample.API.Configuration;



namespace IdentityServerSample.API
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

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services, IHostingEnvironment env)
        {
            // Read GeneralConfig & AuthConfig from appsettings
            IConfigurationSection generalConfigSection = Configuration.GetSection("GeneralConfig");
            IConfigurationSection authConfigSection = Configuration.GetSection("AuthConfig");
            GeneralConfig generalConfig = generalConfigSection.Get<GeneralConfig>();
            AuthConfig authConfig = authConfigSection.Get<AuthConfig>();

            // Register configs for dependency injection
            services.Configure<GeneralConfig>(options => generalConfigSection.Bind(options));   
            services.Configure<AuthConfig>(options => authConfigSection.Bind(options));
            
            /* Register the ClaimsPrincipal of the HttpContext User so that we can
            access the provided access token claims via dependency injection */
            services.AddHttpContextAccessor();
            services.AddTransient<ClaimsPrincipal>(s => s.GetService<IHttpContextAccessor>().HttpContext.User);
            
            // Configure JWT bearer token authentication
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = authConfig.Authority;
                    options.Audience = authConfig.Audience;
                    // Allow HTTP for local debugging, but require HTTPS otherwise
                    options.RequireHttpsMetadata = !env.IsDevelopment();
                });
            
            // Configure CORS based on the allowed origins specified in appsettings
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                    .WithOrigins(generalConfig.AllowedCorsOrigins)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials() );
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
                app.UseHsts();
            }
            
            /* Clear the inbound claim type map so that we get the correct OIDC standard claims
            https://leastprivilege.com/2017/11/15/missing-claims-in-the-asp-net-core-2-openid-connect-handler/
            https://leastprivilege.com/2016/08/21/why-does-my-authorize-attribute-not-work/ */
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            // Add Serilog to the global logging pipeline
            loggerFactory.AddSerilog();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
