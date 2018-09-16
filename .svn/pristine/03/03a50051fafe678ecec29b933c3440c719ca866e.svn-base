using System;
using System.Collections.Generic;
using System.Text;

namespace Message.Model
{
    public class Department
    {
        /// <summary>
        /// 是	部门名称。长度限制为1~32个字符，字符不能包括\:?”<>｜
        /// </summary>
        public string name { get; set; }

        /// <summary>
        /// 是	父部门id，32位整型
        /// </summary>
        public int parentid { get; set; }

        /// <summary>
        /// 否	在父部门中的次序值。order值大的排序靠前。有效的值范围是[0, 2^32)
        /// </summary>
        public int order { get; set; }

        /// <summary>
        /// 部门id，32位整型，指定时必须大于1。若不填该参数，将自动生成id
        /// </summary>
        public int id { get; set; }
    }
}
