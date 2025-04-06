using AppLibrary.Interfaces;
using AppLibrary.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace DepNails.Server.ServiceSetup
{
    public static class Settings
    {
        public static void AddAppServices(this IServiceCollection services, string connectionString)
        {
            // Register the connection string as a singleton
            services.AddSingleton(connectionString);

            services.AddTransient<ITechniciansRepository>(provider => new TechniciansRepository(connectionString));
            services.AddTransient<IServicesRepository>(provider => new ServicesRepository(connectionString));
            // Add other repositories or services here
        }
    }
}
