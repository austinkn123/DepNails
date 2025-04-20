using AppLibrary.Interfaces;
using AppLibrary.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;
using System.Data;

namespace DepNails.Server.ServiceSetup
{
    public static class Settings
    {
        public static void AddServices(this IServiceCollection services, string connectionString)
        {
            // Register the database connection as a scoped service
            services.AddSingleton<IDbConnection>(provider =>
            {
                var connection = new NpgsqlConnection(connectionString);
                connection.Open(); 
                return connection;
            });

            // Register repositories
            services.AddScoped<ITechniciansRepository, TechniciansRepository>();
            services.AddScoped<IServicesRepository, ServicesRepository>();
            services.AddScoped<IClientsRepository, ClientsRepository>();
            services.AddScoped<ISchedulingRepository, SchedulingRepository>();
        }
    }
}
