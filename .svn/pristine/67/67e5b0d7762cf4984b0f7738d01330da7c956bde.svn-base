using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MessageService.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Cors;

namespace MessageService.Controllers
{
    /// <summary>
    /// 文件上传
    /// </summary>
    [Produces("application/json")]
    [Route("api/FileUpLoad")]
    [EnableCors("any")]
    public class FileUpLoadController : Controller
    {
        public Token token { get; set; }
        public IConfiguration config { get; set; }
        //private IHostingEnvironment hostingEnv;


        public FileUpLoadController(Token token, IConfiguration config)
        {
            this.token = token;
            this.config = config;
            //this.hostingEnv = env;
        }
        /// <summary>
        /// 上传临时图片，并返回临时id
        /// 媒体文件类型，分别有图片（image）、语音（voice）、视频（video），普通文件（file）
        /// 图片（image）：2MB，支持JPG,PNG格式
        ///语音（voice） ：2MB，播放长度不超过60s，仅支持AMR格式
        ///视频（video） ：10MB，支持MP4格式
        ///普通文件（file）：20MB
        /// </summary>
        /// <param name="Type">image,voice,video,file</param>
        /// <param name="files"></param>
        [HttpPost]
        [Route("{Type:minlength(1)}")]
        public IEnumerable<string> UploadTempFile(string Type, IList<IFormFile> files)
        {
            var tokens = token.AddAndGet("CommpanyInfo");
            string url = "https://qyapi.weixin.qq.com/cgi-bin/media/upload?access_token="+tokens+"&type="+ Type;
            List<string> ls = new List<string>();
            foreach (var file in files)
            {
                byte[] b = new byte[file.Length]; 
                file.OpenReadStream().Read(b,0,b.Length);
                var re= WxUilt.Request.Post(url, b, file.FileName);
                ls.Add(re);
            }
            return ls;
        }

        /// <summary>
        /// 上传永久图片并返回图片url
        /// </summary>
        /// <param name="files"></param>
        /// <returns></returns>
        [HttpPost]
        public IEnumerable<string> UploadImage(IList<IFormFile> files)
        {
            var tokens = token.AddAndGet("CommpanyInfo");
            string url = "https://qyapi.weixin.qq.com/cgi-bin/media/uploadimg?access_token=" + tokens;
            List<string> ls = new List<string>();
            foreach (var file in files)
            {
                byte[] b = new byte[file.Length];
                file.OpenReadStream().Read(b, 0, b.Length);
                var re = WxUilt.Request.Post(url, b, file.FileName);
                ls.Add(re);
            }
            return ls;
        }
    }
}