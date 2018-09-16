using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace WeiXinMessageTs.Websocket
{
   public class UpFile:IDisposable
    {
        public Queue<UpFileInfo> Filelist { get; set; }
        public UpFileInfo NowFile { get; set; }
        public FileStream Stream { get; set; }
        public UpFile(UpFileInfo item)
        {
            NowFile = item;
            Stream = new FileStream(item.FileName, FileMode.Create);
            Filelist = new Queue<UpFileInfo>();
        }
        public void Write(byte[] b)
        {
            if (NowFile.FileSize <= 0) GetNext();
            if (NowFile.FileSize > b.Length)
            {
                Stream.Write(b, 0, b.Length);
                NowFile.FileSize -= b.Length;
            }
            else if (NowFile.FileSize > 0 && NowFile.FileSize <= b.Length)
            {
                Stream.Write(b, 0, (int)NowFile.FileSize);
                this.NowFile.FileSize = 0;
                ReSet(b);
            }
        }
        private void ReSet(byte[] b)
        {
            Close();
            GetNext();
        }
        private void GetNext()
        {
            if (Filelist.Count == 0) return;
            this.NowFile = Filelist.Dequeue();
            this.Stream = new FileStream(this.NowFile.FileName, FileMode.Create);
        }
        public void Add(UpFileInfo item)
        {
            Filelist.Enqueue(item);
        }
        public void Close()
        {
            Dispose();
        }
        public void Dispose()
        {
            Stream.Close();
        }
    }
    public class UpFileInfo
    {
        public string FileName { get; set; }
        public long FileSize { get; set; }
    }
}
