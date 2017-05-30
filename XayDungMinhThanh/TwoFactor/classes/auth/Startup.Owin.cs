using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(XayDungMinhThanh.Startup))]
namespace XayDungMinhThanh
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
