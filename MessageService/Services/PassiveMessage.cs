using MessageService.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using WxUilt;

namespace MessageService.Services
{
    public class PassiveMessage
    {
        private XDocument Xdoc { get; set; }
        private string timestamp { get; set; }
        private string nonce { get; set; }
        private WXBizMsgCrypt wxcpt { get; set; }

        public PassiveMessage(string xml, string timestamp, string nonce,WXBizMsgCrypt wxcpt)
        {
            Xdoc = new XDocument();
            Xdoc = XDocument.Parse(xml);
            this.wxcpt = wxcpt;
            this.nonce = nonce;
            this.timestamp = timestamp;

        }
        public string GetXml()
        {
            var v = (XElement)Xdoc.FirstNode;
            var type= v.Element("MsgType").Value;
            var model= GetPMM();
            switch (type)
            {
                case "text":
                    {
                        var content = v.Element("Content").Value;
                        return new PassiveMsgText("test", model);
                    }
                case "image":
                    {
                        var medisid=((XElement) v.Element("Image").NextNode).Value;
                        return new PassiveMsgImage(medisid, model);
                    }
                case "Video":
                    {
                        var medisid = ((XElement)v.Element("Video").NextNode).Element("MediaId").Value;
                        var title = ((XElement)v.Element("Video").NextNode).Element("Title").Value;
                        var descript = ((XElement)v.Element("Video").NextNode).Element("Description").Value;
                        return new PassiveMsgVideo(medisid,title,descript,model);
                    }
                case "news":
                    {
                        var count = ((XElement)v.Element("ArticleCount").NextNode).Value;
                        var ele= (XElement)v.Element("Articles");
                        var li= ele.Elements();
                        PassiveMsgImTx pit = new PassiveMsgImTx(model);
                        foreach(var key in li)
                        {
                            pit.Litx.Add(new ImTx()
                            {
                                Description = key.Element("Description").Value,
                                PicUrl = key.Element("PicUrl").Value,
                                Url = key.Element("Url").Value,
                                Title = key.Element("Title").Value
                            });
                        }

                        return pit;
                    }
                default:throw new Exception("微信消息类型不存在");
            }
        }
        private PassiveMsgModel GetPMM()
        {
            var v = (XElement)Xdoc.FirstNode;
            PassiveMsgModel model = new PassiveMsgModel(v.Element("MsgType").Value, wxcpt);
            model.FromUserName = v.Element("ToUserName").Value;
            model.ToUserName = v.Element("FromUserName").Value;
            model.timestamp = timestamp;
            model.nonce = nonce;
            model.CreateTime = v.Element("CreateTime").Value;
            return model;
        }
    }
}
