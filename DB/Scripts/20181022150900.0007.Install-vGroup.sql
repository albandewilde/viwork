create view viw.vGroup
as
    select
        GroupId = g.GroupId,
        GroupName = g.GroupName,
        UserId = g.UserId
	
    from viw.tGroup g
    where g.GroupId <> 0;