using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XayDungMinhThanh.Models.AltModel
{
    public class AllNews
    {
        public List<AltPost> Posts { get; set; }
        public AltCategoryPost CategoryPost { get; set; }
    }

    public class NewsShow
    {
        public Post Post { get; set; }
        public AltCategoryPost CategoryPost { get; set; }
        public List<AltPost> LastPosts { get; set; }
    }

}