using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using KursachReact.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace KursachReact.Controllers
{
    [Route("api/reply")]
    [ApiController]
    public class ReplyController : Controller
    {
        ApplicationContext db;
        public ReplyController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await db.Set<Reply>().ToListAsync());
        }

        [HttpGet]
        [Route("get/{chatId}")]
        public async Task<IActionResult> GetChatReplies(int chatId)
        {
            
            return Ok(await db.Set<Reply>().ToListAsync());
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddNewReply([Bind] Reply reply)
        {
            Reply c = new Reply
            {
                ReplyTitle = reply.ReplyTitle,
                SenderName = reply.SenderName
            };
            db.Replies.Add(c);
            db.SaveChanges();

            return Ok();
        }


    }
}
