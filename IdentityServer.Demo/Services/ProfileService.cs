using IdentityServer4.Services;
using System.Threading.Tasks;
using IdentityServer4.Models;
using System.Linq;
using System.Security.Claims;

namespace IdentityServerSample.Services
{
    public class ProfileService : IProfileService
    {
        public Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            /* Issue to the id token & access token each requested claim which 
            exists in the provided ClaimsPrincipal.  RequestedClaimTypes are 
            determined by the scopes requested by the client along with scopes &
            UserClaims configured on the IdentityResources (for id token claims) and
            ApiResources (for access token claims). */
            context.RequestedClaimTypes.ToList().ForEach(requestedClaimKey => {
                Claim requestedClaimMatch = context.Subject.FindFirst(requestedClaimKey);
                if(requestedClaimMatch != null) {
                    context.IssuedClaims.Add(requestedClaimMatch);
                }
            });

            return Task.CompletedTask;
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            context.IsActive = true;
            return Task.FromResult(true);
        }
    }
}