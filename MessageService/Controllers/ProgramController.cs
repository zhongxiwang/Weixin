using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MessageService.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Cors;

namespace MessageService.Controllers
{
    /// <summary>
    /// 发送消息
    /// </summary>
    [Produces("application/json")]
    [EnableCors("any")]
    public class ProgramController : Controller
    {
        public Token token { get; set; }
        public IConfiguration config { get; set; }

        public ProgramController(Token token,IConfiguration config)
        {
            this.token = token;
            this.config = config;
        }

        /// <summary>
        /// 发送消息
        /// </summary>
        /// <param name="Name">程序名</param>
        /// <param name="value">消息体</param>
        /// <param name="time">延迟发送</param>
        /// <param name="userlist">用户列表，默认所有人</param>
        [HttpPost]
        [Route("/api/{Name:minlength(1)}")]
        public async Task Post(string Name, [FromBody]string value,int time=0, string userlist="@all")
        {
            var tokens= token.AddAndGet(Name);
            var msg= Message.Model.Text.CreateDefaultMessage(value,config[Name+ ":agnetid"]);
            msg.touser = userlist;
            
            await Task.Delay(TimeSpan.FromSeconds(time));
            await Task.Factory.StartNew(() =>
            {
                var res = WxUilt.Request.Post("https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + tokens, JsonConvert.SerializeObject(msg)).Result;
            });
            
        }

        /// <summary>
        /// 发送消息，自定义报文体
        /// </summary>
        /// <param name="Name">程序名</param>
        /// <param name="value"></param>
        [HttpPost]
        [Route("/api/{Name:minlength(1)}/self")]
        public void Put(string Name, [FromBody]object value)
        {
            var tokens = token.AddAndGet(Name);
            var res = WxUilt.Request.Post("https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + tokens, JsonConvert.SerializeObject(value)).Result;
        }
        
        [HttpPost]
        [Route("/api/{Name:minlength(1)}/usual")]
        public void ImageMessage(string Name)
        {
            
            
        }
        /// <summary>
        /// 发送消息
        /// </summary>
        /// <param name="Name">程序名</param>
        /// <param name="Type">消息类型</param>
        /// <param name="Json">简要报文体</param>
        /// <param name="time">等待多少秒</param>
        /// <param name="userlist">用户列表</param>
        [HttpPost]
        [Route("/api/{Name:minlength(1)}/ued")]
        public async Task CurrencyMessageAsync(string Name, string Type,[FromBody]JObject Json,int time, string userlist = null)
        {
            var tokens = token.AddAndGet(Name);
            var msg = Message.Model.Message.CreateDefaultMessage(config[Name + ":agnetid"],Type);
            if (userlist != null) msg.touser = userlist;
            JObject jobj = JObject.Parse( JsonConvert.SerializeObject( msg));
            jobj.Add(Type, Json);
            string res = jobj.ToString();

           Task.Factory.StartNew(async () =>
           {
               await Task.Delay(TimeSpan.FromSeconds(time));
               var result = WxUilt.Request.Post("https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + tokens, jobj.ToString()).Result;
           });
            
        }
    }
}
