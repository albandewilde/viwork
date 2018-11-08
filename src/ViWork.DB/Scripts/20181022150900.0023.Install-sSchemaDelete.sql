create procedure viw.sUserDelete
(
    @SchemaId int
)
as
begin
    delete from viw.tSchema where SchemaId = @SchemaId;
    delete from viw.tLnkSchema where SchemaId = @SchemaId;
    return 0;
end;