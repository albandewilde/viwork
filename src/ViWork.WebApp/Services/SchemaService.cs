using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViWork.DAL;

namespace ViWork.WebApp.Services
{
    public class SchemaService
    {
        SchemaGateaway _schemaGateaway;

        public SchemaService(SchemaGateaway schemaGateaway)
        {
            _schemaGateaway = schemaGateaway;
        }

        public async Task<SchemaData> FindById(int schemaId)
        {
            return await _schemaGateaway.FindById(schemaId);
        }

        public async Task<SchemaData> FindByName(string schemaName)
        {
            return await _schemaGateaway.FindByName(schemaName);
        }

        public async Task<GroupData> FindSchemaGroup(int schemaId)
        {
            return await _schemaGateaway.FindSchemaGroup(schemaId);
        }

        public async Task<Result<int>> AddSchema(string schemaName, int groupId)
        {
            return await _schemaGateaway.AddSchema(schemaName, groupId);
        }

        public async Task DeleteSchema(int schemaId)
        {
            await _schemaGateaway.DeleteSchema(schemaId);
        }
    }
}
