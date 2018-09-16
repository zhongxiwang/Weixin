using Microsoft.Rest.TransientFaultHandling;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Polly.Retry;
using Polly;
using Newtonsoft.Json;
using Message.Model;

namespace MessageService.Services
{
    public class JsApiTicket
    {
        public JsApiTicket(string token)
        {
            var dt = DateTime.Now;
            timestamp =dt.Year+dt.Month.ToString()+dt.Day+dt.Hour+dt.Minute+dt.Second.ToString();
            noncestr = "Wm3WZYTPz0wzccnW";
            tokens = token;
        }

        public string tokens { get; set; }
        /// <summary>
        /// token 时长
        /// </summary>
        public int TimeLong { get; set; }

        public string timestamp { get; set; }
        /// <summary>
        /// 上次获取
        /// </summary>
        public DateTime LastTime { get; set; }

        public string Ticket { get; set; }

        public string Signature { get; set; }

        public string noncestr { get; set; }

        public string Url { get; set; }

        private void GetTokenAsync()
        {
            string url = "https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=" + tokens;

            var res = WxUilt.Request.Get(url).Result;
            if (res == null) throw new MyException("token 获取失败", false);
            JObject obj = JObject.Parse(res);

            if (obj["errcode"].ToString().Equals("0"))
            {
                LastTime = DateTime.Now;
                Ticket = obj["ticket"].ToString();
                TimeLong = int.Parse(obj["expires_in"].ToString());
            }
            else throw new MyException(obj["errcode"].ToString());
            var policy = Policy.Handle<Exception>().WaitAndRetry(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)), (ex, time) =>
            {
                ///错误日志
                ///


            });


        }

        public static implicit operator string(JsApiTicket tokens)
        {
            if (tokens.LastTime.Add(TimeSpan.FromSeconds(tokens.TimeLong)) <DateTime.Now)
            {
                tokens.GetTokenAsync();
            }
            string str = string.Format("jsapi_ticket={0}&noncestr={1}&timestamp={2}&url={3}", tokens.Ticket, tokens.noncestr, tokens.timestamp, tokens.Url);
            tokens.Signature=  WxUilt.Cryptography.SHA1(str);
            return JsonConvert.SerializeObject(tokens);
            //return tokens.Ticket;
        }
    }
}
