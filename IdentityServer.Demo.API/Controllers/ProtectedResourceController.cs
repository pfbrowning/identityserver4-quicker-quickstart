using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace IdentityServerSample.API.Controllers
{
    // Require a bearer token
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class ProtectedResourceController : ControllerBase
    {
        private ClaimsPrincipal claimsPrincipal;
		public ProtectedResourceController(ClaimsPrincipal pClaimsPrincipal) {
            this.claimsPrincipal = pClaimsPrincipal;
		}

        /* Return the provided access token claims in order to demonstrate how to access them
        via dependency injection. */
        [HttpGet]
        public IEnumerable<KeyValuePair<string, string>> Get()
        {
            return this.claimsPrincipal.Claims.Select(claim => new KeyValuePair<string, string>(claim.Type, claim.Value));
        }
    }
}