using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using XayDungMinhThanh.Models;
using XayDungMinhThanh.Models.AltModel;

namespace XayDungMinhThanh.Controllers
{
    [RoutePrefix("cam-ket")]
    public class CommitmentController : Controller
    {
        [Route]
        // GET: Commitment
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetPost()
        {
            using (MinhThanhEntities db = new MinhThanhEntities())
            {
                AltCommitment model = new AltCommitment();
                model.CategoryPost = db.CategoryPosts.Where(p => p.alias == "cam-ket").FirstOrDefault();
                model.Post = db.Posts.Where(
                    p => p.idCategory == (db.CategoryPosts.Where(cp => cp.alias == "cam-ket").FirstOrDefault().id) &&
                    p.featured == true &&
                    p.published == true
                ).OrderByDescending(p => p.id).FirstOrDefault();


                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }
    }
}