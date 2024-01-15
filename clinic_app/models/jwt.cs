using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace clinic_app.models
{
    public class jwt
    {
        public string SecretKey { get; set; }
        public int TokenDuration { get; set; }
        private readonly IConfiguration config;

        public jwt(IConfiguration _config)

    
        {
            this.config = _config;
            this.SecretKey = config.GetSection("jwtconfig").GetSection("Key").Value;
            this.TokenDuration = Int32.Parse(config.GetSection("jwtconfig").GetSection("Duration").Value);
            
        }

        public string GenerateToken(string Id,string FirstName, string  LastName, string Email, string Password,string IdNumber, string Category)
        {
            var key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
            var signature=new SigningCredentials(key,SecurityAlgorithms.HmacSha256);
            var payload = new[]
            {
                new Claim("Id",Id),
                new Claim("FirstName",FirstName),
                 new Claim("LastName",LastName),
                  new Claim("Email",Email),
                   new Claim("Password",Password),
                    new Claim("IdNumber",IdNumber),
                     new Claim("Category",Category),
            };
            var jwtToken = new JwtSecurityToken(
                issuer:"localhost",
                audience:"localhost",
                claims:payload,
                signingCredentials:signature
                );

            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
           
        }
    }
}
