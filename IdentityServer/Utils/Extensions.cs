using System.Security.Claims;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace IdentityServerSample.Extensions
{
    public static class Extensions
    {
        public static string GetClaimValueByShortName(this ClaimsPrincipal claims, string shortName) {
            return claims.GetClaimByShortName(shortName)?.Value;
        }
        public static Claim GetClaimByShortName(this ClaimsPrincipal claims, string shortName) {
            return claims.Claims.Where(claim => claim.GetShortName() == shortName).FirstOrDefault();
        }
        public static string GetShortName(this Claim claim) {
            string shortNameKey = "http://schemas.xmlsoap.org/ws/2005/05/identity/claimproperties/ShortTypeName";
            if(claim.Properties.ContainsKey(shortNameKey)) {
                return claim.Properties[shortNameKey];
            }
            return claim.Type;
        }
    }   
}