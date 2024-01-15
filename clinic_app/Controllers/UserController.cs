



using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using MimeKit;
using System.Security.Cryptography;

using clinic_app.data;
using clinic_app.models;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using DocumentFormat.OpenXml.Vml;
using Microsoft.AspNetCore.Identity;
using System.Net.Mail;
using clinic_app.service.email;
using Dapper;
using Xamarin.Essentials;
using DocumentFormat.OpenXml.Spreadsheet;
using Nest;
using Microsoft.EntityFrameworkCore;
using DocumentFormat.OpenXml.EMMA;

namespace clinic_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly clinicDBcontext _dbcontext;
        private readonly IConfiguration _config;
        private readonly JwtService _jwtService;
        private readonly object _userManager;

        private readonly IEmailService _emailService;

        public UserController(clinicDBcontext dbcontext, IConfiguration config, IEmailService emailService, JwtService jwtService = null )
        {
            _dbcontext = dbcontext;
            _config = config;
            _jwtService = jwtService;

            _emailService = emailService;
        }

        [AllowAnonymous]
        [HttpPost("/api/user/postuser")]
        public async Task<IActionResult> AddUser([FromBody] reguser userRequest)
        {
            try
            {

                userRequest.Id = Guid.NewGuid();


                if (userRequest.Category == "admin")
                {
                    userRequest.Role = "admin";
                }
                else
                {
                    userRequest.Role = "user";
                }

               
                await _dbcontext.regusers.AddAsync(userRequest);
                await _dbcontext.SaveChangesAsync();

                return Ok(JsonConvert.SerializeObject(userRequest));
            }
            catch
            {
                return BadRequest("Bad request from the server while creating owner");
            }
        }


        [AllowAnonymous]
        [HttpPost("/api/user/login")]
        public IActionResult LogIn([FromBody] login user)
        {
            try
            {
                var matchedUser = _dbcontext.regusers.FirstOrDefault(u => u.Email == user.Email && u.Password == user.Password); 
                
                if (matchedUser != null)
                {
                    return Ok(matchedUser);
                }
                else
                {
                    return Ok(new { success = false, message = "Invalid email or password." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error while logging in: {ex.Message}");
            }
        }

        




        [HttpPost("emailconfirm")]
        public async Task<IActionResult> SendEmailAsync([FromBody] EmailModel emailModel)
        {
            try
            {
                _emailService.SendEmail(emailModel);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("forgotpassword")]
        public async Task<IActionResult> SendEmailForForgetPasswordAsync([FromBody] EmailModel emailModel, [FromServices] clinicDBcontext _dbContext)
        {
            try
            {
                string newPassword = GenerateNewPassword();

                emailModel.Content = $"Your new password is: {newPassword}";
                _emailService.SendEmailForForgetPassword(emailModel);

                reguser user = _dbContext.regusers.FirstOrDefault(u => u.Email == emailModel.To);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                user.Password = newPassword;
                await _dbContext.SaveChangesAsync();

                return Ok("Password changed successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        private string GenerateNewPassword()
        {
           
            
            const string allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            Random random = new Random();
            var passwordChars = new char[8];
            for (int i = 0; i < passwordChars.Length; i++)
            {
                passwordChars[i] = allowedChars[random.Next(0, allowedChars.Length)];
            }
            return new string(passwordChars);
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                var stringBuilder = new StringBuilder();
                for (int i = 0; i < hashedBytes.Length; i++)
                {
                    stringBuilder.Append(hashedBytes[i].ToString("x2")); 
                }
                return stringBuilder.ToString();
            }
        }


        [HttpGet("/api/user")]
        public IActionResult GetUserInformation(string email, string password)
        {
            using (SqlConnection conn = new SqlConnection("Server=DESKTOP-U5F239D\\SQLEXPRESS;Database=UserData;Trusted_Connection=True;"))
            {
                conn.Open();
                var query = "SELECT * FROM regusers WHERE Email = @Email AND Password = @Password";
               
                var parameters = new { Email = email, Password = password };
                var user = conn.QueryFirstOrDefault<reguser>(query, parameters);
                
                
                if (user == null)
                {
                    return NotFound("User not found");
                }

                return Ok(user);
            }
        }

        [HttpGet("/api/userList")]
        public IActionResult GetUserList()
        {
            using (SqlConnection conn = new SqlConnection("Server=DESKTOP-U5F239D\\SQLEXPRESS;Database=UserData;Trusted_Connection=True;"))
            {
                conn.Open();
                var query = "SELECT * FROM regusers";

                var users = conn.Query<reguser>(query).ToList();

                if (users.Count == 0)
                {
                    return NotFound("No users found");
                }

                return Ok(users);
            }
        }

        [HttpDelete("/api/users/{id}")]
        public IActionResult DeleteUser(string id)
        {
            using (SqlConnection conn = new SqlConnection("Server=DESKTOP-U5F239D\\SQLEXPRESS;Database=UserData;Trusted_Connection=True;"))
            {
                conn.Open();

                var query = "DELETE FROM regusers WHERE id = @Userid";
                var parameters = new { Userid = id };

                int rowsAffected = conn.Execute(query, parameters);

                if (rowsAffected == 0)
                {
                    return NotFound("User not found");
                }

                return NoContent();
            }
        }


        [HttpPost]
        [Route("api/change-password")]
        public IActionResult ChangePassword([FromBody] clinic_app.Controllers.changePassword model, [FromServices] clinicDBcontext _dbcontext)
        {
            if (!Guid.TryParse(model.Id.ToString(), out Guid userId))
            {
                return BadRequest("Invalid user ID");
            }

            reguser user = _dbcontext.regusers.FirstOrDefault(u => u.Id == model.Id);

           
            if (user.Password != model.CurrentPassword)
            {
                return BadRequest("Invalid current password");
            }

            
            user.Password = model.NewPassword;
            _dbcontext.SaveChanges();

            
            return Ok("Password changed successfully");
        }








    }
}








