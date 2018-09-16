using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataMsgBus;
using DataMsgBus.MessageBus;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using WeiXinMessageTs.Websocket;

namespace WeiXinMessageTs
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //注册websocket
            // WebsocketRegedit();
            MessageEvent();

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        }

        /// <summary>
        /// 设置心跳
        /// </summary>
        public void MessageEvent()
        {
            string url = this.Configuration["RecUrl"];
            string wx = this.Configuration["WeixinUrl"];
            int time = int.Parse(this.Configuration["SleepTime"]);
            //UseSocket us = UseSocket.CreateSocket();
            Task.Run(() =>
            {
                while (true)
                {
                    Thread.Sleep(time);
                    var result = WxUilt.Request.Get(url).Result;
                    if (string.IsNullOrEmpty(result)) continue;
                    var resulst = JsonConvert.DeserializeObject<List<Request>>(result);
                    if (resulst.Count != 0)
                    {
                        foreach (var key in resulst)
                        {
                            var json = JsonConvert.SerializeObject(key.Content);
                            var proname= key.GetHead("programname");
                            var urls = string.Format(wx, proname);
                            var userstr = string.Format("?Type={0}&time={1}&userlist={2}", key.GetHead("messagetype"), key.GetHead("messagetime"), key.GetHead("userlist"));

                            //推送消息到前台
                            //us.Send(CreateMsg.CreateMsgRequest("收到新消息"), proname);
                            WxUilt.Request.Post(urls + userstr, json);
                        }
                    }
                }


            });
        }

        /// <summary>
        /// websocket注册
        /// </summary>
        public void WebsocketRegedit()
        {
            UseSocket use = UseSocket.CreateSocket();
            use.Message = (username, Message) =>
            {
                var result = JsonConvert.DeserializeObject<Request>(Message);
                if (result.ClientType.type == "File") 
                {
                    var item = CreateMsg.Run(result);
                    use.CreatStream(username, (UpFileInfo)item.Content);
                }
                else
                {
                    CreateMsg.Run(result); 
                }
            };
            use.BinaryMessage = (username, key) =>
            {
                use.listfs[username].Write(key);
            };


        }
    }
}
