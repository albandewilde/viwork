using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ViWork.DAL.Test
{
    [TestFixture]
    public class UsersGateAwayTest
    {
        readonly Random _random = new Random();

        [Test]
        public async Task can_create_find_update_and_delete_user()
        {
            UserGateway sut = new UserGateway(TestHelpers.ConnectionString);
            string email = "user{2}@test.com";
            string firstName ="test";
            string lastName = "test";
            byte[] password = Guid.NewGuid().ToByteArray();
        

            Result<int> result = await sut.CreatePasswordUser(email, password,firstName,lastName);
            UserData user = await sut.FindById(result.Content);

            {
                Assert.That(user.Email, Is.EqualTo(email));
                Assert.That(user.Password, Is.EqualTo(password));
            }

            {
                UserData u = await sut.FindById(user.UserId);
                Assert.That(u.Email, Is.EqualTo(email));
                Assert.That(u.Password, Is.EqualTo(password));
            }

            {
                email = string.Format("user{0}@test.com", Guid.NewGuid());
                await sut.UpdateEmail(user.UserId, email);
            }

            {
                UserData u = await sut.FindById(user.UserId);
                Assert.That(u.Email, Is.EqualTo(email));
                Assert.That(u.Password, Is.EqualTo(password));
            }

            {
                await sut.Delete(user.UserId);
                Assert.That(await sut.FindById(user.UserId), Is.Null);
            }
        }

    }
}
