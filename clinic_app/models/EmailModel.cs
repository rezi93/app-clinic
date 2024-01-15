namespace clinic_app.models
{
    public class EmailModel
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public string ActivationLink { get; set; } 

        public EmailModel(string to, string subject, string content, string activationLink)
        {
            To = to;
            Subject = subject;
            Content = content;
            ActivationLink = activationLink;
        }
    }
}
