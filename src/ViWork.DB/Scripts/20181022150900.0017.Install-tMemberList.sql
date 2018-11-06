create table viw.tMemberList
(
	UserId int not null,
	GroupId int not null,


	constraint FK_tMemberList_User foreign key(UserId) references viw.tUser(UserId),
	constraint FK_tOwnGroup_tGroup foreign key(GroupId) references viw.tGroup(GroupId)

);

GO

create unique index IX_tOwnGroup_UserId on viw.tOwnGroup(UserId) where UserId <> 0;
create unique index IX_tOwnGroup_GroupId on viw.tOwnGroup(GroupId) where GroupId <> 0;
insert into viw.tOwnGroup(UserId, GroupId) values(0,0);