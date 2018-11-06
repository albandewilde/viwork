create procedure viw.sUserDelete
(
    @UserId int
)
as
begin
    delete from viw.tPasswordUser where UserId = @UserId;
    delete from viw.tGoogleUser where UserId = @UserId;
    delete from viw.tGithubUser where UserId = @UserId;
    delete from viw.tUser where UserId = @UserId;
    return 0;
end;