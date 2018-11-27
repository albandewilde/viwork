﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ViWork.DAL;
using ViWork.WebApp.Authentication;
using ViWork.WebApp.Models.GroupViewModels;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ViWork.WebApp.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerAuthentication.AuthenticationScheme)]
    public class GroupController : Controller
    {

        readonly GroupGateaway _groupGateaway;

        public GroupController(GroupGateaway groupGateaway)
        {
            _groupGateaway = groupGateaway;
        }

        [HttpGet( "{userId}", Name = "GetGroup")]
        public async Task<IActionResult> GetGroupById(int id)
        {
            GroupData result = await _groupGateaway.FindGroupById(id);
            return Ok(result);
        }

        [HttpGet("GetAllGroup/{userId}")]
        public async Task<IActionResult> FindAllGroupById(int id)
        {
            GroupData result = await _groupGateaway.FindAllGroupById(id);
            return Ok(result);
        }
       

       [HttpGet("{id}", Name = "GetOwner")]
        public async Task<IActionResult> GetOwner(int groupId)
        {
            UserData result = await _groupGateaway.FindGroupOwnerById(groupId);
            return Ok(result);
        }

        [HttpGet("{id}", Name = "GetUserList")]
        public async Task<IActionResult> GetUserList(int groupId)
        {
            IEnumerable<UserData> result = await _groupGateaway.FindUserList(groupId);
            return Ok(result);
        }

        [HttpPost(Name = "CreateGroup")]
        public async Task<IActionResult> AddGroup([FromBody] GroupViewModels model)
        {

            Result<int> result = await _groupGateaway.AddGroup(model.OwnerID, model.GroupName);
            return this.CreateResult(result, o =>
            {
                o.RouteName = "GetGroup";
                o.RouteValues = id => new { id };
            });
        }

        [HttpPost]
        public async Task<IActionResult> AddUserInList(int groupId, int userId)
        {
            Result<int> result = await _groupGateaway.AddUserGroup(groupId, userId);
            return this.CreateResult(result, o =>
            {
                o.RouteName = "GetUserList";
                o.RouteValues = id => groupId;
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGroupName( int groupId, [FromBody] GroupViewModels model)
        {   
            Result result = await _groupGateaway.UpdateGroupName(groupId, model.GroupName);
            return this.CreateResult(result);
        }

        [HttpDelete ("{id}", Name = "DeleteGroup")]
        public async Task<IActionResult> DeleteGroup(int groupId)
        {
            Result result = await _groupGateaway.DeleteGroup(groupId);
            return this.CreateResult(result);
        }


        [HttpDelete(Name = "DeleteUserInGroup")]
        public async Task<IActionResult> DeleteUserInGroup(int groupId, int userId)
        {
            Result result = await _groupGateaway.DeleteUserInGroup(groupId, userId);
            return this.CreateResult(result);
        }
    }
}
 