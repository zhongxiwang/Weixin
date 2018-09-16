
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MessageService.Services
{
    public class JsApiCache
    {
        
        public Dictionary<string, JsApiTicket> DsJAT = new Dictionary<string, JsApiTicket>();
        const string Ticket = "Ticket_";
        private string Token { get; set; }

        public JsApiCache(string Tokens)
        {
            this.Token = Tokens;
            
        }
        public void AddTicket(string Name)
        {
            JsApiTicket jat = new JsApiTicket(this.Token);
            if (!DsJAT.ContainsKey(Name))
                DsJAT.Add(Name, jat);
            //this.Redis.Write(Ticket+Name,jat,dbname.two);
        }

        public JsApiTicket GetTicket(string Name)
        {
            if (DsJAT.ContainsKey(Name))
                return DsJAT[Name];
            return null;
        }

        public JsApiTicket AddAndGet(string Name)
        {
            var res = GetTicket(Name);
            if (res == null) AddTicket(Name);
            else
            {
                res.tokens = this.Token;
                return res;
            }
            return GetTicket(Name);
        }
        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="Name"></param>
        public void Remove(string Name)
        {
            DsJAT.Remove(Ticket + Name);
        }
    }
}
