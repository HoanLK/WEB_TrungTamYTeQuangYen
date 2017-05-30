using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XayDungMinhThanh.Areas.Admin.Models
{
    public class AltBacSi
    {
        public int id { get; set; }
        public string hoTen { get; set; }
        public string alias { get; set; }
        public int? featured { get; set; }
    }
}