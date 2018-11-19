using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ViWork.DAL;
using ViWork.WebApp.Authentication;
using ViWork.WebApp.Models.SchemaViewModels;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ViWork.WebApp.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerAuthentication.AuthenticationScheme)]
    public class SchemaController : Controller
    {
        SchemaGateaway _schemaGateaway;

        public SchemaController(SchemaGateaway schemaGateaway)
        {
            _schemaGateaway = schemaGateaway;
        }

        [HttpGet("{id}", Name = "GetSchema")]
        public async Task<IActionResult> GetSchema(int id)
        {
            SchemaData result = await _schemaGateaway.FindById(id);
            return Ok(result);
        }

        [HttpGet("{name}", Name = "GetSchemaByName")]
        public async Task<IActionResult> GetSchemaByName( string schemaName)
        {
            SchemaData result = await _schemaGateaway.FindByName(schemaName);
            return Ok(result);
        }

        [HttpGet("{id}", Name = "GetSchemaGroup")]
        public async Task<IActionResult> GetSchemaGroup(int schemaId)
        {
            GroupData result = await _schemaGateaway.FindSchemaGroup(schemaId);
            return Ok(result);
        }

        [HttpPost("{id}",Name = "Create")]
        public async Task<IActionResult> AddSchema(int groupId,[FromBody] SchemaViewModel model)
        {

            Result<int> result = await _schemaGateaway.AddSchema(model.SchemaName, model.GroupID);
            return this.CreateResult(result, o =>
            {
                o.RouteName = "GetSchema";
                o.RouteValues = id => new { id };
            });
        }


        [HttpDelete("{id}", Name = "DeleteScema")]
        public async Task<IActionResult> DeleteGroup(int schemaId)
        {
            Result result = await _schemaGateaway.DeleteSchema(schemaId);
            return this.CreateResult(result);
        }


    }
}
