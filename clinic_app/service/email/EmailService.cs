

using clinic_app.models;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Routing.Template;
using MimeKit;
using System.Net.Mail;
using System.Net;
using System.Text;

using Microsoft.Extensions.Configuration;

using System;
using Azure.Core;

namespace clinic_app.service.email
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void SendEmail(EmailModel emailModel)
        {
            var emailMessage = new MimeMessage();
            var from = _configuration["EmailSettings:From"];
            emailMessage.From.Add(new MailboxAddress("Email Confirmation", from));
            emailMessage.To.Add(new MailboxAddress(emailModel.To, emailModel.To));
            emailMessage.Subject = emailModel.Subject;

            
            var emailBody = $"<p>{emailModel.Content}</p>";
            emailBody += $"<p>Click <a href=\"{emailModel.ActivationLink}?confirmed=true\">click Here</a> to activate your account.</p>";

            

            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = emailBody
            };
            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                try
                {
                    client.Connect(_configuration["EmailSettings:SmtpServer"], 465, true);
                    client.Authenticate(_configuration["EmailSettings:From"], _configuration["EmailSettings:Password"]);
                    client.Send(emailMessage);
                }
                catch (Exception ex)
                {
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }


        public void SendEmailForForgetPassword(EmailModel emailModel)
        {
            var emailMessage = new MimeMessage();
            var from = _configuration["ForgotPassword:From"];
            emailMessage.From.Add(new MailboxAddress("forgot Password", from));
            emailMessage.To.Add(new MailboxAddress(emailModel.To, emailModel.To));
            emailMessage.Subject = emailModel.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = string.Format(emailModel.Content)
            };

            using (var client = new MailKit.Net.Smtp.SmtpClient()) 
            {
                try
                {
                    client.Connect(_configuration["ForgotPassword:SmtpServer"], 465, true);
                    client.Authenticate(_configuration["ForgotPassword:From"], _configuration["ForgotPassword:Password"]);
                    client.Send(emailMessage);
                }
                catch (Exception ex)
                {
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }
    }
}


       
         
    

