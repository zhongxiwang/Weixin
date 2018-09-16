using System.Threading.Tasks;

namespace EventBus.Abstractions
{
    public interface IDynamicIntegrationEventHandler
    {
        /// <summary>
        /// 标头
        /// </summary>
        /// <param name="eventData"></param>
        /// <returns></returns>
        Task Handle(dynamic eventData);
    }
}
