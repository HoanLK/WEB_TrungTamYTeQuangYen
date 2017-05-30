using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using XayDungMinhThanh.Models;
using XayDungMinhThanh.Models.AltModel;

namespace XayDungMinhThanh.Controllers
{
    [RoutePrefix("lien-he")]
    public class ContactController : Controller
    {
        [Route]
        // GET: Contact
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetPost()
        {
            using (MinhThanhEntities db = new MinhThanhEntities())
            {
                AltContact model = new AltContact();
                model.CategoryPost = db.CategoryPosts.Where(p => p.alias == "lien-he").FirstOrDefault();
                model.Info = db.InfoCompanies.FirstOrDefault();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }
    }
}