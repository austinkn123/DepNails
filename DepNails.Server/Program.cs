using Amazon.CognitoIdentityProvider;
using AppLibrary.Interfaces;
using DepNails.Server.Services;
using DepNails.Server.ServiceSetup;
using AppLibrary.Models.Configuration; // Ensure this using statement is present
using Microsoft.AspNetCore.Authentication.JwtBearer; // Add this using statement
using Microsoft.IdentityModel.Tokens; // Add this using statement

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("LocalConnection");
if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Connection string 'LocalConnection' not found.");
}
builder.Services.AddServices(connectionString);

// Configure and register ApplicationSettings and its components
var applicationSettings = new ApplicationSettings();
// Bind the AWS:Cognito section to the Cognito property of ApplicationSettings
builder.Configuration.GetSection("AWS:Cognito").Bind(applicationSettings.Cognito);
// If ApplicationSettings has other properties to be loaded from config, bind them here.
// For example: builder.Configuration.GetSection("Email").Bind(applicationSettings.Email);

builder.Services.AddSingleton(applicationSettings); // Register the main ApplicationSettings object

// Also register the AwsCognitoSettings instance from ApplicationSettings as a singleton
// This allows other services to directly inject AwsCognitoSettings if they only need that part.
builder.Services.AddSingleton(applicationSettings.Cognito);

// Add AWS Cognito services
builder.Services.AddAWSService<IAmazonCognitoIdentityProvider>();
builder.Services.AddScoped<IAuthService, AuthService>();

//// Configure JWT Bearer Authentication
//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//})
//.AddJwtBearer(options =>
//{
//    var cognitoSettings = applicationSettings.Cognito ?? throw new InvalidOperationException("Cognito settings are not configured.");
//    options.Authority = cognitoSettings.Authority; // e.g., https://cognito-idp.us-east-1.amazonaws.com/YOUR_USER_POOL_ID
//    options.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidateIssuerSigningKey = true,
//        // Issuer signing key will be downloaded from Authority
//        ValidateAudience = true,
//        ValidAudience = cognitoSettings.AppClientId, // Your Cognito App Client ID
//        ValidateIssuer = true,
//        ValidIssuer = cognitoSettings.Authority, // Your Cognito User Pool URL
//        ValidateLifetime = true
//    };
//});

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
app.UseAuthentication(); // Add this line to enable authentication
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
