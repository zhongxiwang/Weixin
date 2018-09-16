﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataMsgBus;
using EventBus.Abstractions;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace MessageService.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("any")]
    public class ValuesController : Controller
    {

        public ValuesController(IEventBus eventBus, IHostingEnvironment env)
        {
            BinData bd = new BinData(eventBus,env.ApplicationName);
            var res = bd.FindLimit("uinfo");
        }
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost("ruiw")]
        public void Post(string ruiw, [FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
