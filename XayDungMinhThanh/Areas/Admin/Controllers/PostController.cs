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
    public class PostController : Controller
    {
        // GET: Admin/Post
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
            using (MinhThanhEntities db = new MinhThanhEntities())
            {
                var model = (
                    from p in db.Posts
                    select new AltPost()
                    {
                        id = p.id,
                        title = p.title,
                        alias = p.alias,
                        idCategory = p.idCategory,
                        published = p.published,
                        featured = p.featured,
                        note = p.note
                    }
                ).ToList();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }
    }
}