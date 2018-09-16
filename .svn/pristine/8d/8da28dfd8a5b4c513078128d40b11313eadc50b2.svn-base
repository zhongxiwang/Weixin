using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MessageService.Model;
using MessageService.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace MessageService.Controllers
{
    /// <summary>
    /// 添加标签
    /// </summary>
    [EnableCors("any")]
    public class TagController : Controller
    {
        public WxUilt.Token token { get; set; }
        public IConfiguration config { get; set; }

        public TagController(IConfiguration config,Token token)
        {
            this.config = config;
            this.token = token.AddAndGet("CommpanyInfo");
        }
        /// <summary>
        /// 创建标签
        /// </summary>
        /// <param name="tag">消息体</param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/tag/create")]
        public string Post([FromBody]string tag)
        {
            var url = "https://qyapi.weixin.qq.com/cgi-bin/tag/create?access_token=" + this.token;
            return WxUilt.Request.Post(url, tag).Result;
        }
        [HttpPut]
        [Route("api/tag/update")]
        public string update([FromBody]string tag)
        {
            var url = "https://qyapi.weixin.qq.com/cgi-bin/tag/update?access_token=" + this.token;
            return WxUilt.Request.Post(url, tag).Result;
        }
        [HttpGet]
        [Route("api/tag/delete")]
        public string delete(string tagid)
        {
            var url = "https://qyapi.weixin.qq.com/cgi-bin/tag/delete?access_token=" + this.token+ "&tagid=" + tagid;
            return WxUilt.Request.Get(url).Result;
        }

        [HttpGet]
        [Route("api/tag/get")]
        public string get(string tagid)
        {
            var url = "https://qyapi.weixin.qq.com/cgi-bin/tag/get?access_token=" + this.token + "&tagid=" + tagid;
            return WxUilt.Request.Get(url).Result;
        }

        [HttpPost]
        [Route("api/tag/adduser")]
        public string Postuser([FromBody]string tag)
        {
            var url = "https://qyapi.weixin.qq.com/cgi-bin/tag/addtagusers?access_token=" + this.token;
            return WxUilt.Request.Post(url, tag).Result;
        }
        [HttpDelete]
        [Route("api/tag/deleteuser")]
        public string deleteuser([FromBody]string tag)
        {
            var url = "https://qyapi.weixin.qq.com/cgi-bin/tag/deltagusers?access_token=" + this.token;
            return WxUilt.Request.Post(url, tag).Result;
        }

        [HttpGet]
        [Route("api/tag/getlist")]
        public string getuserlist(string tagid)
        {
            var url = "https://qyapi.weixin.qq.com/cgi-bin/tag/list?access_token=" + this.token + "&tagid=" + tagid;
            return WxUilt.Request.Get(url).Result;
        }
    }
}