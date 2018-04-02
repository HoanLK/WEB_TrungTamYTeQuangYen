using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XayDungMinhThanh.Areas.Admin.Models
{
    public class AltGiaDV
    {
        public int id { get; set; }
        public string MaDV { get; set; }
        public string TenDV { get; set; }
        public int? GiaBaoHiem { get; set; }
        public int? GiaVienPhi { get; set; }
        public int? GiaYeuCau { get; set; }
    }
}