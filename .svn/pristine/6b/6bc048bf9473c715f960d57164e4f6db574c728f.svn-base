using DataMsgBus;
using DataMsgBus.MessageBus;
using DataMsgBus.MessageBus.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WeiXinMessageTs.Websocket
{
    class SystemService : ServiceBase
    {
        public override void RegisterServieceRequest(ServiceRegister Register)
        {
            Register.Register("System.CountUser",
                (Request parameter, ref Request result) =>
                {
                    var res = CreateMsg.CreateRequest(GetCount(), new RequestType() { Other = "System.CountUser" });
                    res.SendUser = "System";
                    result = res;
                    res.RecUserlist.Add(parameter.SendUser );
                    socket.Send(res);
                });
            Register.Register("System.GetUserList",
            (Request parameter, ref Request result) =>
            {
                Request request = (Request)parameter;
                var res = CreateMsg.CreateRequest(GetCount(), new RequestType() { Other = "System.GetUserList" });
                res.Content = GetUserList();
                res.SendUser = "System";
                res.RecUserlist = request.RecUserlist;
                result = res;
                socket.Send(res);
            });
        }

        private UseSocket socket { get; set; }
        public SystemService()
        {
            socket = UseSocket.CreateSocket();
        }

        /// <summary>
        /// 得到在线用户数据
        /// </summary>
        /// <returns></returns>
        public int GetCount()
        {
            return socket.GetUserList().Count();
        }
        /// <summary>
        /// 得到用户名
        /// </summary>
        /// <returns></returns>
        public string[] GetUserList()
        {
            return socket.GetUserList();
        }
    }
}
