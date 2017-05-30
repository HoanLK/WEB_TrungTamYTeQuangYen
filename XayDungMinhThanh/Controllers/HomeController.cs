using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using XayDungMinhThanh.Models;
using XayDungMinhThanh.Models.AltModel;

namespace XayDungMinhThanh.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetServices()
        {
            using(MinhThanhEntities db = new MinhThanhEntities())
            {
                var categoryPosts = (
                    from cp in db.Posts
                    where
                        cp.idCategory == (db.CategoryPosts.Where(p => p.alias == "dich-vu").FirstOrDefault().id) &&
                        cp.published == true &&
                        cp.featured == true
                    select new AltPost()
                    {
                        id = cp.id,
                        title = cp.title,
                        alias = cp.alias,
                        description = cp.description,
                        image = cp.image
                    }
                ).Take(4).ToList();

                return Json(categoryPosts, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetPosts()
        {
            using(MinhThanhEntities db = new MinhThanhEntities())
            {
                var model = (
                    from p in db.Posts
                    where
                        p.idCategory == (db.CategoryPosts.Where(cp => cp.alias == "tin-tuc").FirstOrDefault().id) &&
                        p.featured == true && p.published == true
                    orderby p.timePublished descending
                    select new AltPost()
                    {
                        id = p.id,
                        title = p.title,
                        alias = p.alias,
                        description = p.description,
                        image = p.image,
                        timePublished = p.timePublished
                    }
                ).Take(4).ToList();


                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetBacSi()
        {
            using (MinhThanhEntities db = new MinhThanhEntities())
            {
                var model = db.BacSis.Take(3).ToList();
                return Json(model, JsonRequestBehavior.AllowGet);
            }

        }
    }
}
