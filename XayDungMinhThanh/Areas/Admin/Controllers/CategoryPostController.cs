using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using XayDungMinhThanh.Areas.Admin.Models;
using XayDungMinhThanh.Models;

namespace XayDungMinhThanh.Areas.Admin.Controllers
{
    [Authorize]
    public class CategoryPostController : Controller
    {
        // GET: Admin/CategoryPost
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Modify()
        {
            return View();
        }


        //SUPPORT API
        public JsonResult GetAll()
        {
            using(MinhThanhEntities db = new MinhThanhEntities())
            {
                var model = (
                    from cp in db.CategoryPosts
                    select new AltCategoryPost()
                    {
                        id = cp.id,
                        title = cp.title,
                        alias = cp.alias,
                        published = cp.published,
                        isService = cp.isService,
                        note = cp.note
                    }
                ).ToList();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetList()
        {
            using (MinhThanhEntities db = new MinhThanhEntities())
            {
                var model = (
                    from cp in db.CategoryPosts
                    select new ListCategoryPost()
                    {
                        id = cp.id,
                        title = cp.title
                    }
                ).ToList();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }
    }
}