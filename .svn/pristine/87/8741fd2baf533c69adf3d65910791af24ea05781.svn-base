using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using log4net;
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
    [Produces("application/json")]
    [Route("api/User")]
    [EnableCors("any")]
    public class UserController : Controller
    {
        private ILog log = LogManager.GetLogger(Startup.repository.Name, typeof(UserController));
        public WxUilt.Token token { get; set; }
        public IConfiguration config { get; set; }
        public Token tk { get; set; }

        public UserController(Token token)
        {
            this.config = config;
            this.tk = token;
            this.token = token.AddAndGet("CommpanyInfo");
        }
        // GET: api/User
        [HttpGet]
        public string Get(string userid)
        {
            //log.Info("获取user" + userid);
            DateTime dt = DateTime.Now;
            string url = "https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token="+token+"&userid="+ userid;
            var n = DateTime.Now - dt;
            return WxUilt.Request.Get(url).Result;
        }


        // POST: api/User
        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="username">用户名</param>
        /// <param name="department">部门id列表</param>
        /// <param name="posi">身份</param>
        /// <param name="sex">性别</param>
        /// <param name="moblie">手机号码</param>
        /// <param name="email">邮箱</param>
        /// <returns></returns>
        [HttpPost]
        public string Post(string username,int[] department,string posi, int sex,string moblie,string email)
        {
            User user = Message.Model.User.CreateDeraultUser(username, department, posi, sex, moblie,email);
            string url = "https://qyapi.weixin.qq.com/cgi-bin/user/create?access_token="+token;
            return WxUilt.Request.Post(url,JsonConvert.SerializeObject(user)).Result;
        }
        
        /// <summary>
        /// 自定义添加用户
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("self")]
        public string Post([FromBody]User json)
        {
            string url = "https://qyapi.weixin.qq.com/cgi-bin/user/create?access_token=" + token;
            return WxUilt.Request.Post(url, JsonConvert.SerializeObject( json)).Result;
        }
        /// <summary>
        /// 批量删除数据
        /// </summary>
        /// <param name="json">{"useridlist": ["zhangsan", "lisi"] }</param>
        /// <returns></returns>
        [HttpPost]
        [Route("delete")]
        public string deletem([FromBody]JObject json)
        {
            string url = "https://qyapi.weixin.qq.com/cgi-bin/user/batchdelete?access_token=" + token;
            return WxUilt.Request.Post(url, json.ToString()).Result;
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public string Put(string id, [FromBody]JObject value)
        {
            value.Add("userid", id);
            string url = "https://qyapi.weixin.qq.com/cgi-bin/user/update?access_token=" + token;
            return WxUilt.Request.Post(url, value.ToString()).Result;
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public string Delete(string id)
        {
            string url = "https://qyapi.weixin.qq.com/cgi-bin/user/delete?access_token="+token+"&userid="+id;

            var json= WxUilt.Request.Get(url).Result;
            try
            {
                new MyException(json, true);
            }
            catch (Exception e)
            {
                return e.Message;
            }
            return json;
        }

        /// <summary>
        /// 通过user_ticket获取用户信息
        /// </summary>
        /// <param name="Name"></param>
        /// <param name="user_ticket"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("ticketuserinfo/{Name:minlength(1)}")]
        public string Get(string Name, string user_ticket)
        {
            var tks = this.tk.AddAndGet(Name);
            string url = "https://qyapi.weixin.qq.com/cgi-bin/user/getuserdetail?access_token="+tks;
            string pst = "{\"user_ticket\": \""+user_ticket+"\"}";
            var json= WxUilt.Request.Post(url, pst).Result;
            try
            {
                new MyException(json, true);
            }
            catch (Exception e)
            {
                return e.Message;
            }
            return json;
        }

        /// <summary>
        /// 获取部门成员
        /// </summary>
        /// <param name="deparment_id">获取的部门id</param>
        /// <param name="fetch_child">1/0：是否递归获取子部门下面的成员</param>
        /// <returns></returns>
        [HttpGet]
        [Route("user/{deparment_id:int}/{fetch_child:int}")]
        public string GetDepartmentUser(int deparment_id,int fetch_child)
        {
            string url = "https://qyapi.weixin.qq.com/cgi-bin/user/simplelist?access_token="+token+"&department_id="+deparment_id+"&fetch_child="+ fetch_child;
            var json= WxUilt.Request.Get(url).Result;
            try
            {
                new MyException(json, true);
            }
            catch (Exception e)
            {
                return e.Message;
            }
            return json;
        }


        /// <summary>
        /// 获取部门成员
        /// </summary>
        /// <param name="deparment_id">获取的部门id</param>
        /// <param name="fetch_child">1/0：是否递归获取子部门下面的成员</param>
        /// <returns></returns>
        [HttpGet]
        [Route("userInfo/{deparment_id:int}/{fetch_child:int}")]
        public string GetDepartmentUserInfo(int deparment_id, int fetch_child)
        {
            string url = "https://qyapi.weixin.qq.com/cgi-bin/user/list?access_token=" + token + "&department_id=" + deparment_id + "&fetch_child=" + fetch_child;
            var json= WxUilt.Request.Get(url).Result;
            try
            {
                new MyException(json, true);
            }
            catch (Exception e)
            {
                return e.Message;
            }
            return json;
        }


    }
}
