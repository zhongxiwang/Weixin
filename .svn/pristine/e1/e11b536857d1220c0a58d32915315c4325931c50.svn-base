namespace DataMsgBus
{
    class Server
    {
        //private static IContainer Container { get; set; }
        //static void Main()
        //{
            
        //    UseSocket use = UseSocket.CreateSocket();
        //    var t1 = new SystemService(use);
        //    var t2 = new RequestService(use);
        //    t1.Register();
        //    t2.Register();
        //    use.Message = (username,Message) =>
        //    {
        //        var result = JsonConvert.DeserializeObject<Request>(Message);
        //        if (result.ClientType.type == "System.CountUser" || result.ClientType.type == "System.GetUserList")
        //        {
        //            result.SetHead("RequestKey", result.ClientType.type);
        //            MessageBus.Service.MessageBus.SendBusAndAction<Request>(result);
        //        }
        //        else if (result.ClientType.type == "File")
        //        {
        //            var item= MessageBus.Service.MessageBus.SendBusAndAction<UpFileInfo>(result);
        //            use.CreatStream(username, item);
        //        }
        //        else
        //        {
        //            MessageBus.Service.MessageBus.SendBusAndAction<int>(result);
        //        }
        //    };
        //    use.BinaryMessage = (username,key) =>
        //    {
        //        use.listfs[username].Write(key);
        //    };
        //    string line = null;
        //    while ((line = Console.ReadLine()) != "")
        //    {
        //        var result = CreateMsg.CreateMsgRequest(line);
        //        var json = JsonConvert.SerializeObject(result);
        //        ServiceBase orderservices = new RequestService(use);
        //        orderservices.Register();
        //        MessageBus.Service.MessageBus.SendBusAndAction<int>(result);
        //        Console.WriteLine(json);
        //    }
        //}

        //static void register()
        //{
        //    ContainerBuilder builder = new ContainerBuilder();
        //    UseSocket use = UseSocket.CreateSocket();
        //    builder.RegisterType<SystemService>();
        //    builder.Register(k => new SystemService(use));
        //    builder.Register(k => new RequestService(use));
        //    Container = builder.Build();
        //    var r = Container.ResolveOptional<SystemService>();
        //    var r2 = Container.ResolveOptional<RequestService>();
        //    r2.Register();
        //    r.Register();
        //}

        //static void test()
        //{
        //    FleckLog.Level = LogLevel.Debug;
        //    var allSockets = new List<IWebSocketConnection>();
        //    var server = new WebSocketServer("ws://0.0.0.0:8181");
        //    server.Start(socket =>
        //    {
        //        socket.OnOpen = () =>
        //        {
        //            Console.WriteLine("Open!");
        //            allSockets.Add(socket);
        //        };
        //        socket.OnClose = () =>
        //        {
        //            Console.WriteLine("Close!");
        //            allSockets.Remove(socket);
        //        };
        //        socket.OnMessage = message =>
        //        {
        //            Console.WriteLine(message);
        //            allSockets.ToList().ForEach(s => s.Send("Echo: " + message));
        //        };
        //    });


        //    var input = Console.ReadLine();
        //    while (input != "exit")
        //    {
        //        foreach (var socket in allSockets.ToList())
        //        {
        //            socket.Send(input);
        //        }
        //        input = Console.ReadLine();
        //    }
        //}
    }
}
