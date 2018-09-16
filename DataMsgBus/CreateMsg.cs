using DataMsgBus.MessageBus;


namespace DataMsgBus
{
    public class CreateMsg
    {
        public static Request CreateMsgRequest(string messages)
        {
            var req= CreateRequest(messages, new RequestType() { type = RequestType.Message });
            return req;
        }

        /// <summary>
        /// RequestKey
        /// </summary>
        /// <param name="Content"></param>
        /// <param name="reqtype"></param>
        /// <returns></returns>
        public static Request CreateRequest(object Content,RequestType reqtype)
        {
            Request request = new Request()
            {
                Content = Content,
                ClientType = reqtype,
                RecUserlist = new System.Collections.Generic.List<string>()
            };
            PipelineObject pipe = new PipelineObject();
            pipe.AddModule(PipelineModules.CheckRequestContent);
            pipe.AddModule(PipelineModules.AddRequestHead);
            pipe.AddModule(PipelineModules.TransferRequestFormat);
            pipe.AddModule(PipelineModules.ReduceRequest);
            pipe.Runpipeline(request);
            var v = DataMsgBus.MessageBus.IbuildOperationObject.OperationLogicPipelineObjectFactory.Create(new RequestType() { type = RequestType.Message });
            var result = v.BuildOperationPipeline(request);//.Runpipeline(request);
            result.Add(PipelineModules.CheckRequestContent);
            return request;
        }

        /// <summary>
        /// 运行
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="req"></param>
        /// <returns></returns>
        public static Request Run(Request req)
        {
            return DataMsgBus.MessageBus.Service.MessageBus.SendBusAndAction(req);
        }
    }
}
