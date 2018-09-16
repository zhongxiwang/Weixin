using System;
using System.Collections.Generic;
using System.Text;

namespace Message.Model
{
    public abstract class Foreign
    {
        /// <summary>
        /// 	属性类型: 0-本文 1-网页 2-小程序
        /// 	必填
        /// </summary>
        public string type { get; set; }
        /// <summary>
        /// 属性名称： 需要先确保在管理端有创建改属性，否则会忽略
        /// 必填
        /// </summary>
        public string name { get; set; }

    }

    /// <summary>
    /// 成员对外信息
    /// </summary>
    public class ForeignText : Foreign
    {
        /// <summary>
        /// 文本类型的属性
        /// type为0时必填
        /// </summary>
        public List<string> text { get; set; }
        public ForeignText()
        {
            this.text = new List<string>();
        }
    }
    public class ForeignWeb: Foreign
    {
        public class Webs
        {
            public string url { get; set; }
            public string title { get; set; }
        }
        public Webs web { get; set; }
    }
    public class ForeignApp : Foreign
    {
        public class miniPro
        {
            public string appid { get; set; }
            public string pagepath { get; set; }
            public string title { get; set; }
        }
        public miniPro miniprogram { get; set; }
    }


}
