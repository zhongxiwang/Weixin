using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Message.Model;
using MessageService.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace MessageService.Controllers
{
    /// <summary>
    /// 菜单
    /// </summary>
    [Produces("application/json")]
    [Route("api/Menum")]
    [EnableCors("any")]
    public class MenumController : Controller
    {
        public MenumController(IConfiguration config, Token token)
        {
            this.token = this.token = token.AddAndGet("CommpanyInfo");
            this.config = config;
        }
        public WxUilt.Token token { get; set; }
        public IConfiguration config { get; set; }

        /// <summary>
        /// 创建自定义菜单
        /// </summary>
        /// <param name="agentid">程序AgentId</param>
        /// <param name="json"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("{agentid:minlength(1)}/add")]
        public string post(string agentid,[FromBody]string json)
        {
            string url = "https://qyapi.weixin.qq.com/cgi-bin/menu/create?access_token="+this.token+"&agentid="+ agentid;
            var jsons= WxUilt.Request.Post(url, json).Result;
            try
            {
                new MyException(jsons, true);
            }
            catch (Exception e)
            {
                return e.Message;
            }
            return jsons;
        }

        /// <summary>
        /// 获取应用菜单
        /// </summary>
        /// <param name="agentid">程序AgentId</param>
        /// <returns></returns>
        [HttpGet]
        [Route("{agentid:minlength(1)}/get")]
        public string get(string agentid)
        {
            string url = "https://qyapi.weixin.qq.com/cgi-bin/menu/get?access_token=" + this.token + "&agentid=" + agentid;
            return WxUilt.Request.Get(url).Result;
        }
        /// <summary>
        /// 删除菜单
        /// </summary>
        /// <param name="agentid">程序AgentId</param>
        /// <returns></returns>
        [HttpGet]
        [Route("{agentid:minlength(1)}/delete")]
        public string delete(string agentid)
        {
            string url = "https://qyapi.weixin.qq.com/cgi-bin/menu/delete?access_token=" + this.token + "&agentid=" + agentid;
            return WxUilt.Request.Get(url).Result;
        }
    }
}