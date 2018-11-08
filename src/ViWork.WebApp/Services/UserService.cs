﻿using System.Threading.Tasks;
using ViWork.DAL;

namespace ViWork.WebApp.Services
{
    public class UserService
    {
        readonly UserGateway _userGateway;
        readonly PasswordHasher _passwordHasher;

        public UserService(UserGateway userGateway, PasswordHasher passwordHasher)
        {
            _userGateway = userGateway;
            _passwordHasher = passwordHasher;
        }

        public Task<Result<int>> CreatePasswordUser(string email, string password, string firstname, string lastname)
        {
            return _userGateway.CreatePasswordUser(email, _passwordHasher.HashPassword(password), firstname, lastname);
        }

        public async Task<UserData> FindUser(string email, string password)
        {
            UserData user = await _userGateway.FindByEmail(email);
            if (user != null && _passwordHasher.VerifyHashedPassword(user.Password, password) == PasswordVerificationResult.Success)
            {
                return user;
            }

            return null;
        }
    }
}
