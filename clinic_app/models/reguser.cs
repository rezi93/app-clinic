namespace clinic_app.models
{
    public class reguser
    {
        internal bool EmailConfirmed;

        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string  IdNumber { get; set; }
        public string Category { get; set; }
        public string Role { get; internal set; }

    }
}
