using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KursachReact.Models
{
    public class ChatMember
    {
        public int id { get; set; }

        public int ChatId { get; set; }

        public int MemberId { get; set; }
    }
}
