using DataMsgBus.MessageBus;
using EventBus.Abstractions;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace DataMsgBus
{
    /// <summary>
    /// 操作数据库
    /// </summary>
    public class BinData
    {
        private IEventBus EventBus { get; set; }
        private static string ApplicationName { get; set; }
        private flow CountGlipe { get; set; }
        private static Dictionary<string, flow> Dic = new Dictionary<string, flow>();
        /// <summary>
        /// 程序名
        /// </summary>
        /// <param name="bus">数据总线</param>
        /// <param name="Name">程序名，必须相同</param>
        public BinData(IEventBus bus,string Name)
        {
            EventBus = bus;
            CountGlipe = new flow();
            ApplicationName = Name;
        }

        /// <summary>
        /// 删除数据
        /// </summary>
        /// <param name="view">datamap映射数据</param>
        /// <param name="id">datamap映射主键</param>
        /// <returns></returns>
        public string Delete(string view, string id)
        {
            var request= CreM(view, "Delete");
            request.SetHead("id", id);
            return GetResult(request).ToString();
        }
        /// <summary>
        /// 添加数据
        /// </summary>
        /// <param name="view"></param>
        /// <param name="par"></param>
        /// <returns></returns>
        public string Add(string view, object par)
        {
            var request = CreM(view, "Add");
            request.Content = par;
            return GetResult(request).ToString();
        }
        /// <summary>
        /// 统计数据
        /// </summary>
        /// <param name="view"></param>
        /// <param name="where">where条件</param>
        /// <returns></returns>
        public string Count(string view, string where)
        {
            var request = CreM(view, "Count");
            request.SetHead("where", where);
            return GetResult(request).ToString();
        }

        /// <summary>
        /// 更新数据
        /// </summary>
        /// <param name="view">datamap映射数据</param>
        /// <param name="id">数据id</param>
        /// <param name="par">参数JObject</param>
        /// <returns></returns>
        public string Update(string view, string id, object par)
        {
            var request = CreM(view, "Update");
            request.SetHead("id", id);
            request.Content = par;
            return GetResult(request).ToString();
        }

        /// <summary>
        /// 查找数据
        /// </summary>
        /// <param name="view"></param>
        /// <param name="ItemId"></param>
        /// <returns></returns>
        public object Find(string view, string ItemId)
        {
            var request = CreM(view, "FindID");
            request.SetHead("id", ItemId);
            return GetResult(request);
        }

        /// <summary>
        /// 分页查找
        /// </summary>
        /// <param name="view">视图</param>
        /// <param name="where"></param>
        /// <param name="pagemax"></param>
        /// <param name="pagenum"></param>
        /// <param name="isdesc"></param>
        /// <param name="filed"></param>
        /// <param name="fileds"></param>
        /// <returns></returns>
        public object FindLimit(string view, string where=null, int pagemax=0, int pagenum=0, bool isdesc=false, string filed=null, string fileds = "*")
        {
            var request = CreM(view, "FindLimit");
            request.SetHead("where", where);
            request.SetHead("pagemax", pagemax.ToString());
            request.SetHead("pagenum", pagenum.ToString());
            request.SetHead("isdesc", isdesc ? "1" : "0");
            request.SetHead("filed", filed);
            request.SetHead("fileds", fileds);
            return GetResult(request);
        }

        /// <summary>
        /// 分页查找
        /// </summary>
        /// <param name="views"></param>
        /// <param name="where"></param>
        /// <param name="pagemax"></param>
        /// <param name="pagenum"></param>
        /// <param name="isdesc"></param>
        /// <param name="filed"></param>
        /// <param name="fileds"></param>
        /// <returns></returns>
        public object FindLimitMonery(string views, string where, int pagemax, int pagenum, bool isdesc, string filed, string fileds)
        {
            var request = CreM(views, "FindLimitMonery");
            request.SetHead("where", where);
            request.SetHead("pagemax", pagemax.ToString());
            request.SetHead("pagenum", pagenum.ToString());
            request.SetHead("isdesc", isdesc ? "1" : "0");
            request.SetHead("filed", filed);
            request.SetHead("fileds", fileds);
            return GetResult(request);
        }

        /// <summary>
        /// 运行sql
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="DataBaseName">配置文件配置的数据库名称</param>
        /// <returns></returns>
        public object RunSql(string sql,string DataBaseName)
        {
            var request = CreM(DataBaseName, "RunSql");
            request.Content = sql;
            return GetResult(request);
        }

        private Request CreM(string view,string Oper)
        {
            var request = CreateMsg.CreateMsgRequest("");
            request.SetHead("view", view);
            request.SetHead("Oper", Oper);
            request.SetHead("Request", "DB");
            var guid = Guid.NewGuid().ToString();
            request.SetHead("EventNo", guid);
            request.SendUser = ApplicationName;
            request.RecUserlist = new List<string>();
            request.RecUserlist.Add("DataBus");
            Dic.Add(guid, CountGlipe);
            return request;
        }

        private object GetResult(Request request)
            {
            object Result = "";
            try
            {
                this.EventBus.Publish(request);
                Result = CountGlipe.m_buffer.Receive<object>();
                Dic.Remove(request.GetHead("EventNo"));
                return Result;
            }
            catch
            {
                return Result;
            }
        }


        /// <summary>
        /// switch result
        /// </summary>
        /// <param name="req"></param>
        public static void Switch(Request req)
        {
            if (req.Head.ContainsKey("Response") && req.GetHead("Response").Equals("DB"))
            {
                if(req.RecUserlist.Contains(ApplicationName))
                PostResult(req.GetHead("EventNo"), req.Content.ToString());
            }
        }

        private static void PostResult(string guid,string str)
        {
            if (BinData.Dic.ContainsKey(guid))
            {
                flow fw = BinData.Dic[guid];
                flow flow = new flow();
                fw.bind(flow);
                fw.m_buffer.Post<object>(str);
                fw.Close();
            }
        }
    }
}
