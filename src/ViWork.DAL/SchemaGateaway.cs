using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;
using Dapper;

namespace ViWork.DAL
{
    public class SchemaGateaway
    {
        readonly string _connectionString;

        public SchemaGateaway(string connectionString)
        {
            _connectionString = connectionString;
        }
        
        public async Task<SchemaData> FindById(int schemaId)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                return await con.QueryFirstOrDefault(
                    "Select * from viw.tSchema where SchemaId = @SchemaId",
                    new { SchemaId = schemaId});
            }
        }

        public async Task<SchemaData> FindSchemaGroup(int schemaId)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                return await con.QueryFirstOrDefault(
                    "Select g.GroupName , g.GroupId from viw.tSchema s " +
                    "Join viw.tLnkSchema l on s.SchemaID = s.SchemaId" +
                    "Join viw.tGroup g on l.groupId = g.GroupId" +
                    "Where s.SchemaId = @SchemaId",
                    new { SchemaId = schemaId });
            }
        }

        public async Task<Result<int>> AddSchema(string name, int groupID)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                var p = new DynamicParameters();
                p.Add("@SchemaName", name);
                p.Add("@GroupId", groupID);
                p.Add("@Statut", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);

                await con.ExecuteAsync("viw.sSchemaCreate", p, commandType: CommandType.StoredProcedure);

                int status = p.Get<int>("@Status");
                if (status == 1) return Result.Failure<int>(Status.BadRequest, "An schema with this name already exists.");

                Debug.Assert(status == 0);
                return Result.Success(p.Get<int>("@SchemaId"));
            }
        }
        
    }
}
