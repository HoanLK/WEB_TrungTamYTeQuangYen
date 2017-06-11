using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using XayDungMinhThanh.Models;

namespace XayDungMinhThanh.Controllers
{
    [RoutePrefix("danh-muc-bai-viet")]
    public class DanhMucBaiVietController : Controller
    {
        private MinhThanhEntities db = new MinhThanhEntities();
        [Route]
        public ActionResult Index()
        {
            ViewBag.Title = "Danh mục bài viết";

            return View();
        }

        [Route("{alias}-{id:int}")]
        public ActionResult Show(string alias, int id)
        {
            var model = db.CategoryPosts.Where(p => p.id == id && p.alias == alias).FirstOrDefault();



            if (model == null)
            {
                return HttpNotFound();
            }

            //SEO
            ViewBag.Title = model.title;
            ViewBag.Robots = model.robots;
            ViewBag.Image = model.image;

            return View(model);
        }
    }
}