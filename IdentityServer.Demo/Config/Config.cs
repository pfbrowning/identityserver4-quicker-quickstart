using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System.Collections.Generic;
using System.Security.Claims;

namespace IdentityServerSample.Configuration
{
    public class Config
    {
        /// <summary>
        /// Configure an IdentityResource with standard claims
        /// </summary>
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource> {
                // OpenId is always required
                new IdentityResources.OpenId(),
                new IdentityResources.Email(),
                /* Profile defines most of the identity claims that we care about, such
                as first & last name and website. */
                new IdentityResources.Profile()
            };
        }

        /// <summary>
        /// Configure sample API access, scopes, and user claims as an ApiResource
        /// </summary>
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource> {
                new ApiResource("IdentityServerSample.API", "Sample Api Resource") {
                    Description = "Sample Api Access",
                    
                    // Include the 'name' user claim in the access token
                    UserClaims = new List<string> {"name"},
                    Scopes = new List<Scope> {
                        new Scope("api", "Sample API Access")
                    }
                }
            };
        }

        /// <summary>
        /// Configure our Angular SPA demo client app as a Client
        /// </summary>
        public static IEnumerable<Client> GetClients()
        {
            return new List<Client> {
                new Client {
                    /* We need to use 'implicit' as a client id in order to use the hosted 
                    IdentityServer demo as an external provider. */
                    ClientId = "implicit",
                    ClientName = "IdentityServer Demo Client",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    AlwaysIncludeUserClaimsInIdToken = true,
                    AllowedScopes = new List<string> {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        /* Allow this client to request api access in additon to the 
                        above standard scopes. */
                        "api"
                    },
                    RedirectUris = new List<string> {
                        "http://localhost:4200/index.html",
                        "http://localhost:4200/silent-refresh.html"
                    },
                    PostLogoutRedirectUris = new List<string> {
                        "http://localhost:4200/index.html"
                    }
                }
            };
        }

        public static List<TestUser> GetUsers()
        {
            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "1",
                    Username = "alice",
                    Password = "password",

                    Claims = new List<Claim>
                    {
                        new Claim("name", "Alice"),
                        new Claim("website", "https://alice.com")
                    }
                },
                new TestUser
                {
                    SubjectId = "2",
                    Username = "bob",
                    Password = "password",

                    Claims = new List<Claim>
                    {
                        new Claim("name", "Bob"),
                        new Claim("website", "https://bob.com")
                    }
                }
            };
        }
    }
}