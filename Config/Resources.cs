using IdentityServer4.Models;
using System.Collections.Generic;

namespace IdentityServerSample.Configuration
{
    public class ResourceConfig
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
    }
}