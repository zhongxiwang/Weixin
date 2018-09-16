using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MessageService.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;

namespace MessageService.Controllers
{
    /// <summary>
    /// 应用程序获取
    /// </summary>
    [Produces("application/json")]
    [EnableCors("any")]
    public class AppliactionController : Controller
    {
        public Token token { get; set; }
        public IConfiguration config { get; set; }

        public AppliactionController(Token token, IConfiguration config)
        {
            this.token = token;
            this.config = config;
        }

        /// <summary>
        /// 得到应用程序信息
        /// </summary>
        /// <param name="Name">程序名</param>
        /// <returns></returns>
        [HttpGet]
        [Route("Appliaction/{Name:minlength(1)}")]
        public string Get(string Name)
        {
            var tk= token.AddAndGet(Name);
            var agnetid= this.config[Name + ":agnetid"];
            var url = "https://qyapi.weixin.qq.com/cgi-bin/agent/get?access_token="+tk+"&agentid="+agnetid;
            return WxUilt.Request.Get(url).Result;
        }


        /// <summary>
        /// 程序列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("Appliaction/list")]
        public string Getlist()
        {
            var tk = token.AddAndGet("CommpanyInfo");
            var url = "https://qyapi.weixin.qq.com/cgi-bin/agent/list?access_token=" + tk;
            return WxUilt.Request.Get(url).Result;
        }


        /// <summary>
        /// 更新程序信息
        /// </summary>
        /// <param name="Name"></param>
        /// <param name="Data"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("Appliaction/{Name:minlength(1)}")]
        public string Put(string Name,[FromBody]JObject Data)
        {
            var tk = token.AddAndGet(Name);
            var agnetid = this.config[Name + ":agnetid"];
            var url = "https://qyapi.weixin.qq.com/cgi-bin/agent/get?access_token=" + tk + "&agentid=" + agnetid;
            Data.Add("agentid", agnetid);
            return WxUilt.Request.Post(url,Data.ToString()).Result;
        }

        
    }
}