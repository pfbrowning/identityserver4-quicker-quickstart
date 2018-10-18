using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace IdentityServerSample.API.Controllers
{
    // No Authorization decorator: don't require a bearer token
    [Route("[controller]")]
    [ApiController]
    public class PublicResourceController : ControllerBase
    {
        /* Return simple dummy values without requiring a token as a contrast
        to ProtectedResourceController which does require a bearer token. */
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }
    }
}