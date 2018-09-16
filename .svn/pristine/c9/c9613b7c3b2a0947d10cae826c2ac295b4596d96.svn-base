using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks.Dataflow;

namespace DataMsgBus
{
    public class flow
    {
        /// <summary>
        /// BufferBlock是TDF中最基础的Block。
        /// BufferBlock提供了一个有界限或没有界限的Buffer，
        /// 该Buffer中存储T。该Block很像BlockingCollection<T>。
        /// 可以用过Post往里面添加数据，也可以通过Receive方法阻塞或异步的的获取数据，
        /// 数据处理的顺序是FIFO的。它也可以通过Link向其他Block输出数据。
        /// </summary>
        public BufferBlock<object> m_buffer { get; set; }

        public BroadcastBlock<string> BroadCast { get; set; }

        public IDisposable Di { get; set; }
        public flow()
        {
            m_buffer = new BufferBlock<object>();
            BroadCast = new BroadcastBlock<string>(str => str);
        }
        public void bind(flow f)
        {
            //限制流量
            // new DataflowBlockOptions() { BoundedCapacity = 2 };
            //传递返回结束
            Di = m_buffer.LinkTo(f.m_buffer, new DataflowLinkOptions() { PropagateCompletion = true });
        }
        public void Binds(flow f)
        {
            Di = BroadCast.LinkTo(f.m_buffer, new DataflowLinkOptions() { PropagateCompletion = true });
        }
        public void Close()
        {
            Di.Dispose();
        }
    }
}
