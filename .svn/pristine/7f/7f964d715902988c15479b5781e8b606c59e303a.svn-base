using DataMsgBus.MessageBus;
using DataMsgBus.MessageBus.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WeiXinMessageTs.Websocket
{
    public class RequestService : ServiceBase
    {
        public override void RegisterServieceRequest(ServiceRegister Register)
        {
            Register.Register(RequestType.Message,
                (Request parameter, ref Request result) =>
                {
                     socket.Send(parameter);
                });
            Register.Register(RequestType.File,
                 (Request parameter, ref Request result) =>
                 {
                     result.Content = FileUpAsync(parameter);
                 });
        }
        private UseSocket socket { get; set; }
        public RequestService()
        {
            socket = UseSocket.CreateSocket();
        }
        public UpFileInfo FileUpAsync(Request request)
        {
            string filename = request.Head["FileName"];
            var len = request.GetHead("FileLength");
            long filesize = 0;
            if (IsNum(len) && !string.IsNullOrWhiteSpace(len)) filesize = long.Parse(len);
            len = null;
            return new UpFileInfo()
            {
                FileName = filename,
                FileSize = filesize
            };
            //await Rec(filename, filesize);
        }

        /// <summary>
        /// 字符串是数字
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        private bool IsNum(string s)
        {
            return s.Any(c =>
            {
                if (c >= '0' && c <= '9') return true;
                else return false;
            });

        }
    }
}
