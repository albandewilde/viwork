create procedure viw.sPasswordUserCreate
(
    @Email    nvarchar(64),
	@FirstName nvarchar(32),
	@LastName nvarchar(32),
    @Password varbinary(128),
	@UserId  int out,
	@GroupId int out
)
as
begin
	set transaction isolation level serializable;
	begin tran;

	if exists(select * from viw.tUser u where u.Email = @Email)
	begin
		rollback;
		return 1;
	end;

    insert into viw.tUser(Email , FirstName, LastName) values(@Email ,@FirstName, @LastName);
		select @UserId = scope_identity();
    insert into viw.tPasswordUser(UserId,  [Password])
                           values(@UserId, @Password);
	
	insert into viw.tGroup( UserId)
						   values ( @UserId)
	select @GroupId = SCOPE_IDENTITY()
	insert into viw.tOwnGroup(UserId,GroupId)
							values(@UserId, @GroupId)

	commit;
    return 0;
end;