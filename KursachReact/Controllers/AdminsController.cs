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
    [Route("api/admins")]
    [ApiController]
    public class AdminsController : Controller
    {
        ApplicationContext db;

        public AdminsController(ApplicationContext context)
        {
            db = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Admin>>> Get()
        {
            return await db.Set<Admin>().ToListAsync();
        }
        
        [HttpGet]
        [Route("status/{username}")]
        public async Task<ActionResult<bool>> GetStatus(string username)
        {
            return Ok(db.Set<Admin>().Where(c => c.Username == username).Any());
        }
    }
}
