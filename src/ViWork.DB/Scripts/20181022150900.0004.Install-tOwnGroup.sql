create table viw.tOwnGroup
(
	OId int identity(0,1),
	UserId int not null,
	GroupId int not null,

	constraint Pk_tOwnGroup primary key(OId),
	constraint FK_tOwnGroup_tUser foreign key(UserId) references viw.tUser(UserId),
	constraint FK_tOwnGroup_tGroup foreign key(GroupId) references viw.tGroup(GroupId)

);

GO
			
insert into viw.tOwnGroup(UserId, GroupId) values(0,0);