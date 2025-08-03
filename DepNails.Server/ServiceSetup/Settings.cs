using Amazon.CognitoIdentityProvider;
using AppLibrary.Interfaces;
using AppLibrary.Repositories;
using DepNails.Server.Services;
using Npgsql;
using System.Data;
using AppLibrary.Models.Configuration;

namespace DepNails.Server.ServiceSetup
{
    public static class Settings
    {
        public static void AddDataServices(this IServiceCollection services, string connectionString)
        {
            services.AddScoped<IDbConnection>(provider => new NpgsqlConnection(connectionString));

            // Register repositories
            services.AddScoped<ITechniciansRepository, TechniciansRepository>();
            services.AddScoped<IServicesRepository, ServicesRepository>();
            services.AddScoped<IClientsRepository, ClientsRepository>();
            services.AddScoped<ISchedulingRepository, SchedulingRepository>();
        }

        public static void AddAuthServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Configure and register ApplicationSettings and its components
            var applicationSettings = new ApplicationSettings();
            configuration.GetSection("AWS:Cognito").Bind(applicationSettings.Cognito);

            services.AddSingleton(applicationSettings); 
            services.AddSingleton(applicationSettings.Cognito);

            services.AddAWSService<IAmazonCognitoIdentityProvider>();
            services.AddScoped<IAuthService, AuthService>();
        }
    }
}
