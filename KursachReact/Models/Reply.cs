using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace KursachReact.Models
{
    public class Reply
    {
        public int Id { get; set; }

        public string ReplyTitle { get; set; }

        public string SenderName { get; set; }
        
        public int chatId { get; set; }
    }
}
