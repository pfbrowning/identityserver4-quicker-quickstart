using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System.Collections.Generic;
using System.Security.Claims;

namespace BL.IS.Sample.Configuration
{
    public class Config
    {
        // scopes define the resources in your system
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource> {
                new IdentityResources.OpenId(),
                new IdentityResources.Email(),
                new IdentityResources.Profile(),
                new IdentityResource("identity_token_profile", "Identity Profile", new string[] {"identity_claim", "shared_claim"})
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource> {
                new ApiResource("BL.IS.Sample.API", "Sample Api Resource") {
                    Description = "Sample Api Access",
                    
                    UserClaims = new List<string> {"resource_user_claim"},
                    Scopes = new List<Scope> {
                        new Scope("access_token_profile", "User Profile For Access Token", new string[] {"access_claim", "shared_claim"}),
                        new Scope("Sample_API", "Sample API Access")
                    }
                }
            };
        }

        // clients want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients()
        {
            return new List<Client> {
                new Client {
                    ClientId = "IS.Demo.Client",
                    ClientName = "IdentityServer Demo Client",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    AlwaysIncludeUserClaimsInIdToken = true,
                    AllowedScopes = new List<string> {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        "identity_token_profile",
                        "access_token_profile"
                    },
                    RedirectUris = new List<string> {
                        "http://localhost:4200/index.html",
                        "http://localhost:4200/silent-refresh.html"
                    },
                    PostLogoutRedirectUris = new List<string> {
                        "http://localhost:4200/index.html",
                        "http://localhost:4200/silent-refresh.html"
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