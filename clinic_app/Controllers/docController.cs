using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

using System.Data;
using System.Data.SqlClient;
using Dapper;
using clinic_app.internal_class;
using Microsoft.EntityFrameworkCore;
using clinic_app.models;
using DocumentFormat.OpenXml.Spreadsheet;
using Nest;
using clinic_app.@class;
using clinic_app.data;
using Microsoft.IdentityModel.Tokens;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Authorization;

namespace clinic_app.Controllers
{
    public class docController : Controller
    {
        SqlConnection conn = new SqlConnection("Server=DESKTOP-U5F239D\\SQLEXPRESS;Database=doctor;Trusted_Connection=True;");

        [HttpGet("GetDocList")]
        public string GetDocList()
        {
            SqlDataAdapter da = new SqlDataAdapter("SELECT TOP (1000) [id]  ,[first_name] ,[last_name],[email],[password],[id_number] ,[category] ,[rating],[descri] ,[thumbnail] ,[images] FROM [doctor].[dbo].[dtable]", conn);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<doctors> doctar = new List<doctors>();

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                doctors doc = new doctors
                {
                    id = Convert.ToInt32(dt.Rows[i]["id"]),
                    first_name = Convert.ToString(dt.Rows[i]["first_name"]),
                    last_name = Convert.ToString(dt.Rows[i]["last_name"]),
                    email = Convert.ToString(dt.Rows[i]["email"]),
                    password = Convert.ToString(dt.Rows[i]["password"]),
                    id_number = Convert.ToString(dt.Rows[i]["id_number"]),
                    category = Convert.ToString(dt.Rows[i]["category"]),
                    rating = Convert.ToDecimal(dt.Rows[i]["rating"]),
                    descri = Convert.ToString(dt.Rows[i]["descri"]),
                    thumbnail = Convert.ToString(dt.Rows[i]["thumbnail"]),
                    images = Convert.ToString(dt.Rows[i]["images"])
                };
                doctar.Add(doc);
            }

            return JsonConvert.SerializeObject(doctar);
        }



        [HttpGet("doctor/{id}")]
        public string GetDoctor(int id)
        {
            SqlConnection conn = new SqlConnection("Server=DESKTOP-U5F239D\\SQLEXPRESS;Database=doctor;Trusted_Connection=True;");

            {

                conn.Open();
                var query = "SELECT * FROM dtable WHERE id = @id";
                var parameters = new { id };
                var doct = conn.QueryFirstOrDefault<doctors>(query, parameters);
                return JsonConvert.SerializeObject(doct);
            }
        }

        [HttpGet("category/{category}")]
        public string Getcategory(string category)
        {
            SqlConnection conn = new SqlConnection("Server=DESKTOP-U5F239D\\SQLEXPRESS;Database=doctor;Trusted_Connection=True;");

            {

                conn.Open();
                var query = "SELECT * FROM dtable WHERE category = @category";
                var parameters = new { category
                };
                var cat = conn.QueryFirstOrDefault<doctors>(query, parameters);
                return JsonConvert.SerializeObject(cat);
            }
        }

        [HttpPost("/api/doc/login")]
        public IActionResult LogIn([FromBody] login doct)
        {
            try
            {
                
                doctors authenticatedDoct = Authenticatedoct(doct.Email, doct.Password);

                if (authenticatedDoct != null)
                {
                    
                    return Ok(new { success = true, doct = authenticatedDoct });
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

        private doctors Authenticatedoct(string email, string password)
        {
            using (SqlConnection conn = new SqlConnection("Server=DESKTOP-U5F239D\\SQLEXPRESS;Database=doctor;Trusted_Connection=True;"))
            {
                conn.Open();

                string query = "SELECT * FROM dtable WHERE email = @email AND password = @password";
                SqlCommand command = new SqlCommand(query, conn);
                command.Parameters.AddWithValue("@email", email);
                command.Parameters.AddWithValue("@password", password);

                using (SqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        doctors authenticateddoct = new doctors
                        {
                            first_name = reader["first_name"].ToString(),
                            last_name = reader["last_name"].ToString(),
                            email = reader["email"].ToString(),
                            password = reader["password"].ToString(),
                            id_number = reader["id_number"].ToString(),
                            category = reader["category"].ToString(),
                            rating = decimal.Parse(reader["rating"].ToString()),
                            descri = reader["descri"].ToString(),
                            thumbnail = reader["thumbnail"].ToString(),
                            images = reader["images"].ToString()
                        };

                        return authenticateddoct;
                    }
                }

                return null;
            }
        }


        [HttpGet("/api/doct")]
        public IActionResult GetDoctInformation(string email, string password)
        {
            using (SqlConnection conn = new SqlConnection("Server=DESKTOP-U5F239D\\SQLEXPRESS;Database=doctor;Trusted_Connection=True;"))
            {
                conn.Open();
                var query = "SELECT * FROM dtable WHERE Email = @email AND Password = @password";
               
               

                var docparam = new { Email = email, Password = password };
                var doctor = conn.QueryFirstOrDefault<doctors>(query, docparam);
                if (doctor == null)
                {
                    return NotFound("User not found");
                }

                return Ok(doctor);
            }
        }


        [HttpPost("event")]
       
        public IActionResult SaveEvent([FromBody] @event eventData)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection("Server=DESKTOP-U5F239D\\SQLEXPRESS;Database=doctor;Trusted_Connection=True;"))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("INSERT INTO [dbo].[events] ([title], [start], [end]) VALUES (@title, @start, @end); SELECT SCOPE_IDENTITY()", conn);

                    cmd.Parameters.AddWithValue("@title", eventData.title);
                    cmd.Parameters.AddWithValue("@start", eventData.start);
                    cmd.Parameters.AddWithValue("@end", eventData.end);

                    var newEventId = cmd.ExecuteScalar();

                    
                    return Ok(newEventId);
                }
            }
            catch (Exception ex)
            {
               
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("event/{eventtitle}")]
        public IActionResult DeleteEvent(string eventtitle)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection("Server=DESKTOP-U5F239D\\SQLEXPRESS;Database=doctor;Trusted_Connection=True;"))
                {
                    var deleteQuery = "DELETE FROM [dbo].[events] WHERE [title] = @title";
                    SqlCommand cmd = new SqlCommand(deleteQuery, conn);
                    cmd.Parameters.AddWithValue("title", eventtitle);

                    conn.Open();
                    int rowsAffected = cmd.ExecuteNonQuery();
                    conn.Close();

                    if (rowsAffected > 0)
                    {
                        return Ok();
                    }
                    else
                    {
                        return NotFound();
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }



        [HttpGet("events")]
        public IActionResult GetEvents()
        {
            try
            {
                using (SqlConnection conn = new SqlConnection("Server=DESKTOP-U5F239D\\SQLEXPRESS;Database=doctor;Trusted_Connection=True;"))
                {
                    conn.Open();

                    string query = "SELECT * FROM events";

                    SqlCommand command = new SqlCommand(query, conn);
                    SqlDataReader reader = command.ExecuteReader();

                    List<@event> events = new List<@event>();

                    while (reader.Read())
                    {
                        @event eventData = new @event
                        {
                            id = reader.GetInt32(0),
                            title = reader.GetString(1),
                            start = reader.GetDateTime(2).ToString("yyyy-MM-ddTHH:mm:ss"), // Convert to string
                            end = reader.GetDateTime(3).ToString("yyyy-MM-ddTHH:mm:ss") // Convert to string
                        };

                        events.Add(eventData);
                    }

                    return Ok(events);
                }
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, ex.Message);
            }
        }









        //[HttpPost]
        //[Route("api/change-password")]
        //public IActionResult ChangePassword([FromBody] clinic_app.Controllers.changePassword requestData)
        //{
        //    using (SqlConnection conn = new SqlConnection("Server=DESKTOP-U5F239D\\SQLEXPRESS;Database=doctor;Trusted_Connection=True;"))
        //    {
        //        conn.Open();

        //        if (requestData.GetType() == typeof(changePassword))
        //        {
        //            Guid doctorId;
        //            if (Guid.TryParse(requestData.Id.ToString(), out doctorId))
        //            {
        //                string selectQuery = "SELECT * FROM dtable WHERE id = @DoctorId";
        //                string updateQuery = "UPDATE dtable SET password = @NewPassword WHERE id = @DoctorId";

        //                using (SqlCommand selectCmd = new SqlCommand(selectQuery, conn))
        //                {
        //                    selectCmd.Parameters.AddWithValue("@DoctorId", doctorId);
        //                    SqlDataReader reader = selectCmd.ExecuteReader();

        //                    if (!reader.Read())
        //                    {
        //                        reader.Close();
        //                        return BadRequest("Invalid user ID");
        //                    }

        //                    string currentPassword = reader["password"].ToString();
        //                    reader.Close();

        //                    if (currentPassword != requestData.CurrentPassword)
        //                    {
        //                        return BadRequest("Invalid current password");
        //                    }
        //                }

        //                using (SqlCommand updateCmd = new SqlCommand(updateQuery, conn))
        //                {
        //                    updateCmd.Parameters.AddWithValue("@NewPassword", requestData.NewPassword);
        //                    updateCmd.Parameters.AddWithValue("@DoctorId", doctorId);
        //                    int rowsAffected = updateCmd.ExecuteNonQuery();

        //                    if (rowsAffected > 0)
        //                    {
        //                        return Ok("Password changed successfully");
        //                    }
        //                    else
        //                    {
        //                        return BadRequest("Failed to change password");
        //                    }
        //                }
        //            }
        //        }


        //        return BadRequest("Invalid user ID");

        //    }
        //}



        //[HttpPost]
        //[Route("api/change-password")]
        //public IActionResult ChangePassword([FromBody] object requestData)
        //{
        //    if (requestData.GetType() == typeof(changeDocPassword))
        //    {
        //        changeDocPassword model = requestData as changeDocPassword;

        //        int doctorId = model.id;
        //        string currentPassword = model.currentPassword;
        //        string newPassword = model.newPassword;

        //        using (SqlConnection conn = new SqlConnection("Server=DESKTOP-U5F239D\\SQLEXPRESS;Database=doctor;Trusted_Connection=True;"))
        //        {
        //            conn.Open();

        //            string selectQuery = "SELECT * FROM dtable WHERE id = @DoctorId";
        //            string updateQuery = "UPDATE dtable SET password = @NewPassword WHERE id = @DoctorId";

        //            using (SqlCommand selectCmd = new SqlCommand(selectQuery, conn))
        //            {
        //                selectCmd.Parameters.AddWithValue("@DoctorId", doctorId);
        //                SqlDataReader reader = selectCmd.ExecuteReader();

        //                if (!reader.Read())
        //                {
        //                    reader.Close();
        //                    return BadRequest("Invalid user ID");
        //                }

        //                string dbCurrentPassword = reader["password"].ToString();
        //                reader.Close();

        //                if (dbCurrentPassword != currentPassword)
        //                {
        //                    return BadRequest("Invalid current password");
        //                }
        //            }

        //            using (SqlCommand updateCmd = new SqlCommand(updateQuery, conn))
        //            {
        //                updateCmd.Parameters.AddWithValue("@NewPassword", newPassword);
        //                updateCmd.Parameters.AddWithValue("@DoctorId", doctorId);
        //                int rowsAffected = updateCmd.ExecuteNonQuery();

        //                if (rowsAffected > 0)
        //                {
        //                    return Ok("Password changed successfully");
        //                }
        //                else
        //                {
        //                    return BadRequest("Failed to change password");
        //                }
        //            }
        //        }
        //    }

        //    return BadRequest("Invalid object type");
        //}



        [HttpPost]
        [Route("api/change-password")]
        public IActionResult ChangePassword([FromBody] changeDocPassword model)
        {
            using (SqlConnection conn = new SqlConnection("Server=DESKTOP-U5F239D\\SQLEXPRESS;Database=doctor;Trusted_Connection=True;"))
            {
                conn.Open();

                if (!int.TryParse(model.Id.ToString(), out int doctorId))
                {
                    return BadRequest("Invalid user ID");
                }

                string changePasswordProcedure = "ChangeDoctorPassword";
                SqlCommand cmd = new SqlCommand(changePasswordProcedure, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", doctorId);
                cmd.Parameters.AddWithValue("@CurrentPassword", model.CurrentPassword);
                cmd.Parameters.AddWithValue("@NewPassword", model.NewPassword);
                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected > 0)
                {
                    return Ok("Password changed successfully");
                }
                else
                {
                    return BadRequest("Invalid current password or failed to change password");
                }
            }
        }


    }
}
 

    


