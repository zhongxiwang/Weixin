using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using WxUilt;

namespace Message.Model
{

    /// <summary>
    /// 文本消息
    /// </summary>
    public class Message
    {
        /// <summary>
        /// 成员ID列表（消息接收者，多个接收者用‘|’分隔，最多支持1000个）。
        /// 特殊情况：指定为@all，则向该企业应用的全部成员发送
        /// touser、toparty、totag不能同时为空;
        /// 否必须
        /// </summary>
        public string touser { get; set; }
        /// <summary>
        /// 部门ID列表，多个接收者用‘|’分隔，最多支持100个。
        /// 当touser为@all时忽略本参数
        /// 否必须
        /// </summary>
        public string toparty { get; set; }
        /// <summary>
        /// 标签ID列表，多个接收者用‘|’分隔，最多支持100个。
        /// 当touser为@all时忽略本参数
        /// 否必须
        /// </summary>
        public string totag { get; set; }
        /// <summary>
        /// 消息类型，此时固定为：text
        /// 必须
        /// </summary>
        public string msgtype { get; set; }
        /// <summary>
        /// 企业应用的id，整型。可在应用的设置页面查看
        /// 必须
        /// </summary>
        public string agentid { get; set; }
        /// <summary>
        /// 消息内容，最长不超过2048个字节
        /// 其中text参数的content字段可以支持换行、以及A标签，即可打开自定义的网页
        /// (注意：换行符请用转义过的\n)
        /// 必须
        /// </summary>
        
        /// <summary>
        /// 表示是否是保密消息，0表示否，1表示是，默认0
        /// 必须
        /// </summary>
        public int safe { get; set; }

        /// <summary>
        /// 创建一个默认消息体
        /// </summary>
        /// <param name="agenid">程序id</param>
        /// <param name="userlist">接收用户列表，默认所有人</param>
        /// <param name="safe">是否加密（0，1），默认不加班</param>
        /// <param name="msgtp">消息类型，默认text</param>
        /// <returns></returns>
        public static Message CreateDefaultMessage(string agenid, string msgtp = "text", string userlist="@all",int safe=0)
        {
            return new Message()
            {
                touser = userlist,
                msgtype = msgtp,
                agentid = agenid,
                safe = safe,
            };
        }
        /// <summary>
        /// 给制定部门发送消息
        /// </summary>
        /// <param name="agenid"></param>
        /// <param name="party">部门id</param>
        /// <param name="msgtp"></param>
        /// <param name="safe"></param>
        /// <returns></returns>
        public static Message CreateDepartMessage(string agenid, string party, string msgtp = "text", int safe = 0)
        {
            return new Message()
            {
                toparty= party,
                msgtype = msgtp,
                agentid = agenid,
                safe = safe,
            };
        }
        /// <summary>
        /// 给制定标签发送消息
        /// </summary>
        /// <param name="agenid"></param>
        /// <param name="Tag">标签名</param>
        /// <param name="msgtp"></param>
        /// <param name="safe"></param>
        /// <returns></returns>
        public static Message CreateTagMessage(string agenid, string Tag, string msgtp = "text", int safe = 0)
        {
            return new Message()
            {
                toparty = Tag,
                msgtype = msgtp,
                agentid = agenid,
                safe = safe,
            };
        }
    }
    public class Text:Message
    {
        public TextContent text { get; set; }
        public static Message CreateDefaultMessage(string Msg, string agenid)
        {
            return new Text()
            {
                touser = "@all",
                msgtype = "text",
                agentid = agenid,
                safe = 0,
                text = new TextContent() { content = Msg }
            };
        }
    }
    public class TextContent
    {
        [StringLength(2048)]
        public string content { get; set; }
    }

    public class Image : Message
    {
        
    }
}
