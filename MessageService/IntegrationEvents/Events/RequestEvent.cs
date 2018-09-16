using DataMsgBus;
using DataMsgBus.MessageBus;
using EventBus.Abstractions;
//using InterfaceBase;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace MessageService.IntegrationEvents.Events
{
    public class RequestEvent : IIntegrationEventHandler<Request>
    {
        public RequestEvent()
        {

        }
        public Task Handle(Request @event)
        {
            BinData.Switch(@event);
            return Task.CompletedTask;
        }
    }
}
