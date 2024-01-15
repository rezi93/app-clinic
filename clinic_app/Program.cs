using clinic_app.data;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;

using Microsoft.IdentityModel.Tokens;
using System.Text;

using clinic_app.service.email;
using clinic_app.service.token;


using Microsoft.AspNetCore.Identity;


var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(x =>
{
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["localhost"],
        ValidAudience = builder.Configuration["localhost"],
        IssuerSigningKey = new SymmetricSecurityKey
        (Encoding.UTF8.GetBytes(builder.Configuration["Token:Key"])),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = true,
        ClockSkew = TimeSpan.Zero
    };
});

   
    builder.Services.AddSingleton<IEmailService, EmailService>();

  
















builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("EnableCORS", builder =>
    {
        builder.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});
builder.Services.AddDbContext<clinicDBcontext>(Options=>
Options.UseSqlServer(builder.Configuration.GetConnectionString("ConnString")));
var app = builder.Build();
app.UseCors("EnableCORS");




if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthorization();

app.MapControllers();

app.Run();
