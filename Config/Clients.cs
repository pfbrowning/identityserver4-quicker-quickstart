using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace IdentityServerSample.Configuration
{
    public class ClientConfig
    {

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
    }
}