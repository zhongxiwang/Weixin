using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WxUilt;

namespace MessageService.Model
{
    public class PassiveMsgModel
    {
        /// <summary>
        /// 接收用户
        /// </summary>
        public string ToUserName { get; set; }
        /// <summary>
        /// 发送用户
        /// </summary>
        public string FromUserName { get; set; }

        public string CreateTime { get; set; }

        public string MsgType { get; set; }

        public WXBizMsgCrypt crp { get; set; }

        public string timestamp { get; set; }

        public string nonce { get; set; }

        public PassiveMsgModel(string type, WXBizMsgCrypt wxcpt)
        {
            this.MsgType = type;
            this.crp = wxcpt;
        }
    }
    public class PassiveMsgText
    {
        public string Content { get; set; }
        public PassiveMsgModel pm { get; set; }
        public PassiveMsgText(string content, PassiveMsgModel pm)
        {
            this.Content = content;
            this.pm = pm;
        }
        public static implicit operator string(PassiveMsgText text)
        {
            string str = @"<xml>
   <ToUserName><![CDATA[{0}]]></ToUserName>
   <FromUserName><![CDATA[{1}]]></FromUserName> 
   <CreateTime>{2}</CreateTime>
   <MsgType><![CDATA[{3}]]></MsgType>
   <Content><![CDATA[{4}]]></Content>
</xml>";
            str = string.Format(str, text.pm.ToUserName, text.pm.FromUserName, text.pm.CreateTime, "text", text.Content);
            string resmsg = "";
            int n = text.pm.crp.EncryptMsg(str, text.pm.CreateTime, text.pm.nonce, ref resmsg);
            if (n != 0) { throw new Exception("PassiveMsgText class error"); }
            return resmsg;
        }
    }
    public class PassiveMsgImage
    {
        public string MediaID { get; set; }
        public PassiveMsgModel pm { get; set; }
        public PassiveMsgImage(string Mediaid, PassiveMsgModel pm)
        {
            this.MediaID = Mediaid;
            this.pm = pm;
        }
        public static implicit operator string(PassiveMsgImage text)
        {
            string str = @"<xml>
   <ToUserName><![CDATA[{0}]]></ToUserName>
   <FromUserName><![CDATA[{1}]]></FromUserName> 
   <CreateTime>{2}</CreateTime>
   <MsgType><![CDATA[{3}]]></MsgType>
      <Image>
       <MediaId><![CDATA[{4}]]></MediaId>
   </Image>
</xml>";
            str = string.Format(str, text.pm.ToUserName, text.pm.FromUserName, text.pm.CreateTime, "image", text.MediaID);
            string resmsg = "";
            int n = text.pm.crp.EncryptMsg(str, text.pm.CreateTime, text.pm.nonce, ref resmsg);
            if (n != 0) { throw new Exception("PassiveMsgText class error"); }
            return resmsg;
        }
    }
    public class PassiveMsgVideo
    {
        public string MediaID { get; set; }
        public string title { get; set; }
        public string Description { get; set; }
        public PassiveMsgModel pm { get; set; }
        public PassiveMsgVideo(string Mediaid,string title,string descript, PassiveMsgModel pm)
        {
            this.MediaID = Mediaid;
            this.title = title;
            this.Description = descript;
            this.pm = pm;
        }
        public static implicit operator string(PassiveMsgVideo text)
        {
            string str = @"<xml>
   <ToUserName><![CDATA[{0}]]></ToUserName>
   <FromUserName><![CDATA[{1}]]></FromUserName> 
   <CreateTime>{2}</CreateTime>
   <MsgType><![CDATA[{3}]]></MsgType>
   <Video>
       <MediaId><![CDATA[{4}]]></MediaId>
       <Title><![CDATA[{5}]]></Title>
       <Description><![CDATA[{6}]]></Description>
   </Video>
</xml>";
            str = string.Format(str, text.pm.ToUserName, text.pm.FromUserName, text.pm.CreateTime, "video", text.MediaID,text.title,text.Description);
            string resmsg = "";
            int n = text.pm.crp.EncryptMsg(str, text.pm.CreateTime, text.pm.nonce, ref resmsg);
            if (n != 0) { throw new Exception("PassiveMsgText class error"); }
            return resmsg;
        }
    }

    public class PassiveMsgImTx
    {
        public List<ImTx> Litx { get; set; }
        public PassiveMsgModel pm { get; set; }
        public PassiveMsgImTx( PassiveMsgModel pm)
        {
            Litx = new List<ImTx>();
            this.pm = pm;
        }
        public static implicit operator string(PassiveMsgImTx text)
        {
            string str = @"<xml>
   <ToUserName><![CDATA[{0}]]></ToUserName>
   <FromUserName><![CDATA[{1}]]></FromUserName> 
   <CreateTime>{2}</CreateTime>
   <MsgType><![CDATA[{3}]]></MsgType>
   <ArticleCount>{4}</ArticleCount>
<Articles>{5}</Articles>
</xml>";
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            foreach (var key in text.Litx) sb.Append(key);
            str = string.Format(str, text.pm.ToUserName, text.pm.FromUserName, text.pm.CreateTime, "news", text.Litx.Count,sb.ToString());
            string resmsg = "";
            int n = text.pm.crp.EncryptMsg(str, text.pm.CreateTime, text.pm.nonce, ref resmsg);
            if (n != 0) { throw new Exception("PassiveMsgText class error"); }
            return resmsg;
        }
    }

    public class ImTx
    {
            public string Title { get; set; }
            public string Description { get; set; }
            public string PicUrl { get; set; }
            public string Url { get; set; }
            public static implicit operator string(ImTx xml)
        {
            string xmls = @"<item><Title><![CDATA[{0}]]></Title><Description><![CDATA[{1}]]></Description>
           <PicUrl><![CDATA[{2}]]></PicUrl>
           <Url><![CDATA[{3}]]></Url></item>";
            xmls = string.Format(xmls, xml.Title, xml.Description, xml.PicUrl, xml.Url);
            return xmls;
        }
    }
}
