﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLibrary.Models
{
    public class Service
    {
        public int Id { get; set; }
        public string? ServiceName { get; set; }
        public string? Description { get; set; }
        public int? Duration { get; set; }
        public decimal? Price { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
