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
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace MessageService.Controllers
{
    /// <summary>
    /// 部门管理
    /// </summary>
    [Produces("application/json")]
    [EnableCors("any")]
    public class DepartmentController : Controller
    {
        public Token token { get; set; }
        public IConfiguration config { get; set; }

        public DepartmentController(Token token, IConfiguration config)
        {
            this.token = token;
            this.config = config;
        }
        /// <summary>
        /// 取得部门信息
        /// </summary>
        /// <param name="id">部门id</param>
        /// <returns></returns>
        [HttpGet]
        [Route("/api/department")]
        public string Get(string id)
        {
            var tokens = token.AddAndGet("CommpanyInfo");
            string url = "https://qyapi.weixin.qq.com/cgi-bin/department/list?access_token=" + tokens + "&id=" + id;
            return WxUilt.Request.Get(url).Result;
        }
        /// <summary>
        /// 添加部门
        /// </summary>
        /// <param name="body"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/department")]
        public string Post([FromBody]Department body)
        {
            var tokens = token.AddAndGet("CommpanyInfo");
            string url = "https://qyapi.weixin.qq.com/cgi-bin/department/create?access_token=" + tokens;
            return WxUilt.Request.Post(url, JsonConvert.SerializeObject(body)).Result;
        }
        /// <summary>
        /// 更新部门信息
        /// </summary>
        /// <param name="id"></param>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("api/department")]
        public string Put(string id, [FromBody]JObject obj)
        {
            obj.Add("id", id);
            var tokens = token.AddAndGet("CommpanyInfo");
            string url = "https://qyapi.weixin.qq.com/cgi-bin/department/update?access_token=" + tokens;
            return WxUilt.Request.Post(url, obj.ToString()).Result;
        }
        /// <summary>
        /// 删除部门（注：不能删除根部门；不能删除含有子部门、成员的部门）
        /// </summary>
        /// <param name="id"></param>
        [HttpDelete]
        [Route("api/department")]
        public string delete(string id)
        {
            var tokens = token.AddAndGet("CommpanyInfo");
            string url = "https://qyapi.weixin.qq.com/cgi-bin/department/delete?access_token=" + tokens + "&id=" + id;
            return WxUilt.Request.Get(url).Result;
        }
    }
}