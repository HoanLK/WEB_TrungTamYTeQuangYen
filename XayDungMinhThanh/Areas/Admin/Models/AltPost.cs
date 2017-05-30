using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XayDungMinhThanh.Areas.Admin.Models
{
    public class AltPost
    {
        public int id { get; set; }
        public string title { get; set; }
        public string alias { get; set; }
        public int? idCategory { get; set; }
        public bool published { get; set; }
        public bool featured { get; set; }
        public string note { get; set; }
    }
}