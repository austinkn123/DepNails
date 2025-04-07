using AppLibrary.Interfaces;
using AppLibrary.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;

namespace DepNails.Server.ServiceSetup
{
    public static class Settings
    {
        public static void AddServices(this IServiceCollection services, string connectionString)
        {
            var dbConnection = new NpgsqlConnection(connectionString);
            // Register the connection string as a singleton
            services.AddSingleton(connectionString);

            services.AddTransient<ITechniciansRepository>(provider => new TechniciansRepository(dbConnection));
            services.AddTransient<IServicesRepository>(provider => new ServicesRepository(dbConnection));
            // Add other repositories or services here
        }
    }
}
