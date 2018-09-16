
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WxUilt;

namespace MessageService.Services
{
    public class Token
    {
        public IConfiguration config { get; set; }
       
        private static Dictionary<string, WxUilt.Token> Cache = new Dictionary<string, WxUilt.Token>();
        const string Tokens = "Tocken";

        public Token(IConfiguration congif)
        {
            this.config = congif;
        }
        public void redisAdd(string Name)
        {
            var data = new WxUilt.Token(this.config[Name + ":SecRet"], this.config["CommpanyInfo:CorpID"]);
            if(!Cache.ContainsKey(Tokens + "_" + Name))
            Cache.Add(Tokens + "_" + Name, data);
            //this.Redis.Write(Tokens+"_"+Name, data, dbname.DataMap);
        }

        public WxUilt.Token redisGet(string Name)
        {
            if (Cache.ContainsKey(Tokens + "_" + Name))
                return Cache[Tokens + "_" + Name];
            return null;
            //return this.Redis.Read<WxUilt.Token>(Tokens + "_" + Name,dbname.DataMap);
        }

        public WxUilt.Token AddAndGet(string Name)
        {
            var res = redisGet(Name);
            if (res == null) redisAdd(Name);
            else return res;
            return redisGet(Name);
        }
        public void Remove(string Name)
        {
            if(Cache.ContainsKey(Tokens + "_" + Name))
                Cache.Remove(Tokens + "_" + Name);
            //this.Redis.Remove(Tokens + "_" + Name);
        }
    }
}
