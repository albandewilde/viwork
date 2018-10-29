create view viw.vUser
as
    select
        UserId = u.UserId,
        FirstName = u.FirstName,
        LastName = u.LastName,
		Email = u.Email,
		[Type] = u.[Type]
    from viw.tUser u
    where u.UserId <> 0;