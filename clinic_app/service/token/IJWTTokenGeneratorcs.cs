
using System.Collections.Generic;
using System.Security.Claims;
using clinic_app.models;
using Microsoft.AspNetCore.Identity;

namespace clinic_app.service.token
{
    public interface IJWTTokenGenerator
    {
        string GenerateToken(IdentityUser user, IList<string> roles, IList<Claim> claims);
        
    }
}
