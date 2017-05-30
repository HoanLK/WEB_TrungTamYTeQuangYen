using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using XayDungMinhThanh.Models;
using XayDungMinhThanh.Models.AltModel;

namespace XayDungMinhThanh.Controllers
{
    [RoutePrefix("gioi-thieu")]
    public class IntroController : Controller
    {
        // GET: GioiThieu
        [Route]
        public ActionResult Index()
        {
            return View();
        }

        [Route("{alias}-{id:int}")]
        public ActionResult Show(string alias, int id)
        {
            using (MinhThanhEntities db = new MinhThanhEntities())
            {
                var model = db.Posts.Where(p => p.id == id && p.alias == alias).FirstOrDefault();

                if (model == null)
                {
                    return RedirectToAction("Index", "Home");
                }

                //SEO
                ViewBag.Title = model.title;
                ViewBag.Description = model.metaDescription;
                ViewBag.Keywords = model.metaKewords;
                ViewBag.Robots = model.robots;
                ViewBag.Image = model.image;

                return View(model);
            }
        }

        public JsonResult GetPost()
        {
            using(MinhThanhEntities db = new MinhThanhEntities())
            {
                AltIntro model = new AltIntro();
                model.CategoryPost = db.CategoryPosts.Where(p => p.alias == "gioi-thieu").FirstOrDefault();
                model.Post = db.Posts.Where(
                    p => p.idCategory == (db.CategoryPosts.Where(cp => cp.alias == "gioi-thieu").FirstOrDefault().id) &&
                    p.featured == true &&
                    p.published == true
                ).OrderByDescending(p => p.id).FirstOrDefault();


                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }
    }
}