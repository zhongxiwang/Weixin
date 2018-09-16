using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using MessageService.Model;
using MessageService.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WxUilt;

namespace MessageService.Controllers
{

    [EnableCors("any")]
    public class VerificationController : Controller
    {
        public IConfiguration Config { get; set; }
        public VerificationController(IConfiguration Config)
        {
            this.Config = Config;
        }

        /// <summary>
        /// 验证消息
        /// </summary>
        /// <param name="name">程序名</param>
        /// <returns></returns>
        [HttpGet]
        [Route("/api/ver/msg")]
        public string Get()
        {
            var msg_signature = Request.Query["msg_signature"];
            var timestamp = Request.Query["timestamp"];
            var nonce = Request.Query["nonce"];
            var echostr = Request.Query["echostr"];
            try
            {
                WXBizMsgCrypt wxcpt = new WXBizMsgCrypt(Config["CommpanyInfo:UrlVerificationToken"], Config["CommpanyInfo:EncodingAESKey"], Config["CommpanyInfo:CorpID"]);
                int ret = 0;
                string sEchoStr = "";
                ret = wxcpt.VerifyURL(msg_signature, timestamp, nonce, echostr, ref sEchoStr);
                if (ret != 0)
                {
                    System.Console.WriteLine("ERR: VerifyURL fail, ret: " + ret);
                    return "";
                }
                return sEchoStr;
            }
            catch
            {
                throw;
            }
        }



        //[HttpGet]
        //[Route("/api/{Name:minlength(1)}/msg")]
        //public string Gets(string name)
        //{
        //    var msg_signature = Request.Query["msg_signature"];
        //    var timestamp = Request.Query["timestamp"];
        //    var nonce = Request.Query["nonce"];
        //    var echostr = Request.Query["echostr"];
        //    try
        //    {

        //        WXBizMsgCrypt wxcpt = new WXBizMsgCrypt(Config["CommpanyInfo:UrlVerificationToken"], Config["CommpanyInfo:EncodingAESKey"], Config["CommpanyInfo:CorpID"]);
        //        int ret = 0;
        //        string sEchoStr = "";
        //        ret = wxcpt.VerifyURL(msg_signature, timestamp, nonce, echostr, ref sEchoStr);
        //        if (ret != 0)
        //        {
        //            System.Console.WriteLine("ERR: VerifyURL fail, ret: " + ret);
        //            return "";
        //        }
        //        return sEchoStr;
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}

          //被动接收消息
        [HttpPost]
        [Route("/api/{Name:minlength(1)}/msg")]
        public string post(string name)
        {
            var msg_signature = Request.Query["msg_signature"];
            var timestamp = Request.Query["timestamp"];
            var nonce = Request.Query["nonce"];
            try
            {
                WXBizMsgCrypt wxcpt = new WXBizMsgCrypt(Config["CommpanyInfo:UrlVerificationToken"], Config["CommpanyInfo:EncodingAESKey"], Config["CommpanyInfo:CorpID"]);
                string msg = null;
                System.IO.StreamReader sr = new System.IO.StreamReader(Request.Body);
                var sPostData = sr.ReadToEnd();
                sr.Close();
                wxcpt.DecryptMsg(msg_signature, timestamp, nonce, sPostData, ref msg);
                PassiveMessage pm = new PassiveMessage(msg,timestamp,nonce,wxcpt);
                return pm.GetXml();
            }
            catch
            {
                throw;
            }
        }

        private PassiveMsgModel GetPMM(string  msg,string timestamp,string nonce,WXBizMsgCrypt wxcpt)
        {
            XDocument xdoc = new XDocument();
            xdoc = XDocument.Parse(msg);
            var v = (XElement)xdoc.FirstNode;
            PassiveMsgModel model = new PassiveMsgModel(v.Element("type").Value, wxcpt);
            model.FromUserName = v.Element("ToUserName").Value;
            model.ToUserName = v.Element("FromUserName").Value;
            model.timestamp = timestamp;
            model.nonce = nonce;
            model.CreateTime = v.Element("CreateTime").Value;
            return model;
        }
    }
}