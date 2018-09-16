using System;
using Xunit;

namespace WxUnit.Test
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            
            
            //Assert.True(n != null ? true : false);
        }
        [Fact]
        public void Post()
        {

           // var n = Request.Post("https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ww086e61d21d6452c8&corpsecret=4xT7cNvc2YpQ-fKpsYZM-s6Tiebw4KOcLj5Hv8pmemw");
           // Assert.True(n != null ? true : false);
        }

        [Fact]
        public void ds()
        {
            MessageService.Services.JsApiTicket jat = new MessageService.Services.JsApiTicket("test");

        }
    }
}
