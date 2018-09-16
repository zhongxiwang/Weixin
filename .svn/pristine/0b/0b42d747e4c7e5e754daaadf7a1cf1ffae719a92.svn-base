using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fleck;
using Newtonsoft.Json;
using System.IO;
using DataMsgBus.MessageBus;
using DataMsgBus;

namespace WeiXinMessageTs.Websocket
{
    public class UseSocket
    {
        static UseSocket socket = new UseSocket();
        string _address = null;
        const string username = "username";
        WebSocketConnection _websocketcon = null;
        static IWebSocketServer _Servier = null;
        public Action<string, string> Message { get; set; }
        public Action<string,byte[]> BinaryMessage { get; set; }
        public Dictionary<string, UpFile> listfs = new Dictionary<string, UpFile>();
        private UseSocket(string Ip)
        {
            this._address = Ip;
            try
            {
                _Servier = new WebSocketServer(this._address);
                _Servier.Start(socket =>
                {
                    socket.OnMessage =msg=> {
                        Message(socket.GetPaarmiter(username), msg);
                    };
                    socket.OnOpen = () =>
                    {
                        Open(socket);
                    };
                    socket.OnClose = () =>
                    {
                        OnClose(socket);
                    };
                    socket.OnBinary = b =>
                     {
                         BinaryMessage(socket.GetPaarmiter(username), b);
                     };
                });
            }
            catch
            {
                throw new Exception("参数错误！来自UseSocket ，初始化失败");
            }
        }
        private UseSocket() : this("ws://0.0.0.0:8181")
        {
        }
        private void Open(IWebSocketConnection socket)
        {
            var v = socket.GetPaarmiter(username);
            //如果未取到用户名，则断开连接
            if (string.IsNullOrWhiteSpace(v))
            {
                socket.Close();
                return;
            }
            if (!userlist.ContainsKey(v))
            {
                userlist.Add(v, socket);
                CreateMsg.Run(updatelist());
            }
            else
            {
                var n= CreateMsg.CreateMsgRequest("在其他地方登入");
                n.RecUserlist.Add(v);
                CreateMsg.Run(n);
                userlist[v].Close();
                userlist.Add(v, socket);
                CreateMsg.Run(updatelist());
            }

        }
        private void GetMessage(WebSocketConnection socket,string message)
        {
            
        }
        private void OnClose(IWebSocketConnection socket)
        {
            var un = socket.GetPaarmiter(username);
            userlist.Remove(un);
            CreateMsg.Run(updatelist());
        }

        public static UseSocket CreateSocket()
        {
            return socket;
        }
        public Dictionary<string, IWebSocketConnection> userlist = new Dictionary<string, IWebSocketConnection>();

        public void Close()
        {
            _websocketcon.Close();
        }

        public Request updatelist()
        {
            var v = CreateMsg.CreateRequest("", new RequestType() { type ="System.GetUserList" });
            v.RecUserlist.AddRange( userlist.Keys.ToArray());
            return  v;
        }

        /// <summary>
        /// 发送websocket消息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="Program">名称前缀</param>
        /// <returns></returns>
        public int Send(Request request,string Program=null)
        {
            if (request.RecUserlist==null || request.RecUserlist.Count == 0) return 0;
            int i = 0;
            if (Program != null)
            {
                request.RecUserlist.AsParallel().ForAll(key =>
                {
                    if (key.IndexOf(Program) == 0)
                    {
                        addHead(request, key);
                        var json = JsonConvert.SerializeObject(request);
                        userlist[key].Send(json);
                        i++;
                    }
                });
            }
            else
            request.RecUserlist.AsParallel().ForAll(key =>
            {
                if (key!=null&& userlist.ContainsKey(key))
                {
                    addHead(request, key);
                    var json = JsonConvert.SerializeObject(request);
                    userlist[key].Send(json);
                    i++;
                }
            });
            return i;
        }
        /// <summary>
        /// 设置标题
        /// </summary>
        /// <param name="request"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        private bool addHead(Request request,string key)
        {
            if (request.Head.ContainsKey("HeadReadonly") && request.Head["HeadReadonly"].Equals("true")) return false;
            foreach (var par in userlist[key].ConnectionInfo.Parameter)
            {
                if (request.Head.ContainsKey(par.Key)) request.Head[par.Key] = par.Value;
                else request.SetHead(par.Key, par.Value);
            }
            return true;
        }

        /// <summary>
        /// 返回用户
        /// </summary>
        /// <returns></returns>
        public string[] GetUserList()
        {
            try
            {
                return userlist.Select(key =>
                {
                    return key.Key + "," + key.Value.GetPaarmiter("name");
                }).ToArray();
            }
            catch
            {
                return null;
            }

        }

        public void CreatStream(string username,UpFileInfo item)
        {
            if (listfs.ContainsKey(username)) listfs[username].Add(item);
            else listfs.Add(username, new UpFile(item));
        }
    }
}
