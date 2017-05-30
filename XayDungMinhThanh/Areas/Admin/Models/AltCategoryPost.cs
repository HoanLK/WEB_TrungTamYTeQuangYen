using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XayDungMinhThanh.Areas.Admin.Models
{
    public class AltCategoryPost
    {
        public int id { get; set; }
        public string title { get; set; }
        public string alias { get; set; }
        public bool published { get; set; }
        public bool isService { get; set; }
        public string note { get; set; }
    }
}