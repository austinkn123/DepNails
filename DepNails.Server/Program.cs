using Amazon.CognitoIdentityProvider;
using AppLibrary.Interfaces;
using DepNails.Server.Services;
using DepNails.Server.ServiceSetup;
using AppLibrary.Models.Configuration; // Ensure this using statement is present

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
