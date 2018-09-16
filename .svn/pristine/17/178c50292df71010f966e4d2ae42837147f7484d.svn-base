using System;
using System.Collections.Generic;
using System.Text;

namespace Message.Model
{
    public class User
    {
        /// <summary>
        /// 成员UserID。对应管理端的帐号，企业内必须唯一。
        /// 不区分大小写，长度为1~64个字节
        /// 是否必须：是
        /// </summary>
        public string userid { get; set; }

        /// <summary>
        /// 成员名称。长度为1~64个字符
        /// 是否必须：是
        /// </summary>
        public string name { get; set; }

        /// <summary>
        /// 英文名。长度为1-64个字节，由字母、数字、点(.)、减号(-)、空格或下划线(_)组成
        /// 是否必须：
        /// </summary>
        public string english_name { get; set; }

        /// <summary>
        /// 手机号码。企业内必须唯一，mobile/email二者不能同时为空
        /// 是否必须：
        /// </summary>
        public string mobile { get; set; }

        /// <summary>
        /// 成员所属部门id列表,不超过20个
        /// 是否必须：是
        /// </summary>
        public int[] department { get; set; }

        /// <summary>
        /// 部门内的排序值，默认为0，成员次序以创建时间从小到大排列。数量必须和department一致，数值越大排序越前面。
        /// 有效的值范围是[0, 2^32)
        /// 是否必须：
        /// </summary>
        public List<int> order { get; set; }

        /// <summary>
        /// 职位信息。长度为0~128个字符
        /// 是否必须：
        /// </summary>
        public string position { get; set; }

        /// <summary>
        /// 性别。1表示男性，2表示女性
        /// 是否必须：
        /// </summary>
        public int gender { get; set; }

        /// <summary>
        /// 邮箱。长度不超过64个字节，且为有效的email格式。
        /// 企业内必须唯一，mobile/email二者不能同时为空
        /// 是否必须：
        /// </summary>
        public string email { get; set; }
        /// <summary>
        /// 座机。由1-32位的纯数字或’-‘号组成。
        /// 
        /// </summary>
        public string telephone { get; set; }

        /// <summary>
        /// 上级字段，标识是否为上级。
        /// 在审批等应用里可以用来标识上级审批人
        /// 
        /// </summary>
        public string isleader { get; set; }

        /// <summary>
        /// 成员头像的mediaid，通过素材管理接口上传图片获得的mediaid
        /// 
        /// </summary>
        public string avatar_mediaid { get; set; }

        /// <summary>
        /// 启用/禁用成员。1表示启用成员，0表示禁用成员
        /// 
        /// </summary>
        public string enable { get; set; }

        /// <summary>
        /// 自定义字段。自定义字段需要先在WEB管理端添加，见扩展属性添加方法，否则忽略未知属性的赋值。
        /// 自定义字段长度为0~32个字符，超过将被截断
        /// </summary>
        public List< Extattr> extattr { get; set; }
        /// <summary>
        /// 是否邀请该成员使用企业微信
        /// （将通过微信服务通知或短信或邮件下发邀请，每天自动下发一次，最多持续3个工作日），
        /// 默认值为true。
        /// </summary>
        public bool to_invite { get; set; }

        /// <summary>
        /// 成员对外属性，字段详情见对外属性
        /// </summary>
        public List<Foreign> external_profile { get; set; }

        public User()
        {
            this.extattr = new List<Extattr>();
            external_profile = new List<Foreign>();
        }

        public static User CreateDeraultUser(string username,int[] departments,string position,  int sex,string moblie,string email )
        {
            return new User()
            {
                userid = Guid.NewGuid().ToString(),
                name= username,
                department= departments,
                position= position,
                gender =sex,
                mobile= moblie,
                email=email
            };
        }
    }

    /// <summary>
    /// 自定义字段
    /// </summary>
    public class Extattr
    {
        /// <summary>
        /// 名称
        /// </summary>
        public string name { get; set; }
        /// <summary>
        /// 数据
        /// </summary>
        public string value { get; set; }
    }

    
}
