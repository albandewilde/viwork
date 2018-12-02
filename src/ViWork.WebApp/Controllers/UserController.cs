using System.Collections.Generic;
using System.Threading.Tasks;
using ViWork.DAL;
using ViWork.WebApp.Authentication;
using ViWork.WebApp.Models.AccountViewModels;
using ViWork.WebApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ViWork.WebApp.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerAuthentication.AuthenticationScheme)]
    public class UserController : Controller
    {
        readonly UserGateway _userGateway;

        public UserController( UserGateway userGateway)
        {
            _userGateway = userGateway;
        }

        //[HttpPost]
        //public async Task<IActionResult> CreateUser([FromBody] UserViewModel form)
        //{
        //    Result<int> result = await _userGateway.CreatePasswordUser(form.Name, model.Level);
        //    return this.CreateResult(result, o =>
        //    {
        //        o.RouteName = "GetClass";
        //        o.RouteValues = id => new { id };
        //    });
        //}
    }
}
