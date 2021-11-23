using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KursachReact.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Security.Claims;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

namespace KursachReact.Controllers
{
    [Route("api/chats")]
    [ApiController]
    public class ChatsController : Controller
    {
        ApplicationContext db;

        public ChatsController(ApplicationContext context)
        {
            db = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chat>>> Get()
        {
            return await db.Chats.ToListAsync();
        }
            
        [HttpGet]
        [Route("getByUsername/{username}")]
        public async Task<ActionResult<Chat>> GetChatByUsername(string username)
        {
            int memberId = db.Users.Where(c => c.Name == username).FirstOrDefault().Id;
            List<ChatMember> members = db.ChatMembers.Where(c => c.MemberId == memberId).ToList();
            List<Chat> chats = new List<Chat>();
            foreach(var i in members) 
            {
                chats.Add(db.Chats.Where(c => c.Id == i.ChatId).FirstOrDefault());
            }


            return Ok(chats);
        }
        
        
        
        //api/routes/remove/
        [HttpGet]
        [Route("remove/{id}")]
        public async Task<ActionResult> Remove(int id)
        {
            Chat route = db.Chats.Where(c => c.Id == id).FirstOrDefault();
            db.Chats.Remove(route);
            db.SaveChanges();
            
            return Ok(true);
        }
        
        
        
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddAccount([Bind] Chat chat)
        {
            db.Chats.Add(chat);
            db.SaveChanges();

            int newChatId = db.Chats.Where(c => c.Name == chat.Name).FirstOrDefault().Id;
            ChatMember member = new ChatMember
            {
                ChatId = newChatId,
                MemberId = chat.OwnerId
            };
            db.ChatMembers.Add(member);
            
            db.SaveChanges();
            
            return Ok();
        }
        
        [HttpGet]
        [Route("addMember/{userId}_{chatId}")]
        public async Task<ActionResult> AddMember(int userId, int chatId)
        {
            ChatMember newMember = new ChatMember
            {
                ChatId = chatId,
                MemberId = userId
            };
            db.Add(newMember);
            db.SaveChanges();
            
            return Ok();
        }
    }
}
