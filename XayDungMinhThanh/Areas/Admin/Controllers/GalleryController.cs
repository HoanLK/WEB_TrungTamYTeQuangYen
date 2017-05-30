using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using XayDungMinhThanh.Areas.Admin.Models;
using XayDungMinhThanh.Models;

namespace XayDungMinhThanh.Areas.Admin.Controllers
{
    public class GalleryController : Controller
    {
        // GET: Admin/Gallery
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
                    from p in db.Galleries
                    select new AltGallery()
                    {
                        id = p.id,
                        title = p.title,
                        alias = p.alias,
                        published = p.published,
                        featured = p.featured,
                        note = p.note
                    }
                ).ToList();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }

        public int DeleteImages(int id)
        {
            using(MinhThanhEntities db =new MinhThanhEntities())
            {
                var model = db.Images.Where(p => p.idGallery == id);
                if(model != null)
                {
                    db.Images.RemoveRange(model);
                    db.SaveChanges();

                    return 1;
                }

                return 0;
            }
        }
    }
}