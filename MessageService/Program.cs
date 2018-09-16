using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace MessageService
{
    public class Program
    {
        public static void Main(string[] args)
        {

            //BuildWebHost(args).Run();

    //        var host = new WebHostBuilder()
    //.UseUrls("http://0.0.0.0:82")
    //.UseKestrel()
    //.UseContentRoot(Directory.GetCurrentDirectory())
    //.UseIISIntegration()
    //.UseStartup<Startup>()
    //.Build();

    //        host.Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseUrls("http://0.0.0.0:82")
                .UseStartup<Startup>()
                .Build();
    }
}
