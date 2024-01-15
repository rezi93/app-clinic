using clinic_app.models;

namespace clinic_app.service.email
{
    public interface IEmailService
    {
        void SendEmail(EmailModel emailModel);
        void SendEmailForForgetPassword(EmailModel emailModel);
    }
}
