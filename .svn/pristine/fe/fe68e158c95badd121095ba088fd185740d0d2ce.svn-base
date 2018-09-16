using System;

namespace EventBus.Events
{
    /// <summary>
    /// 创建event
    /// </summary>
    public class IntegrationEvent
    {
        public IntegrationEvent()
        {
            EventBusId = Guid.NewGuid();
            EventBusCreationDate = DateTime.UtcNow;
        }
        private Guid EventBusId { get;  set; }
        private DateTime EventBusCreationDate { get;  set; }
        public Guid GetEvnetId() { return EventBusId; }
        public DateTime CreateEventTime() { return EventBusCreationDate; }
    }
}
