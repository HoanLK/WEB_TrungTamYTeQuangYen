using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using XayDungMinhThanh.Models;
using XayDungMinhThanh.Models.AltModel;

namespace XayDungMinhThanh.Controllers
{
    [RoutePrefix("thu-vien-anh")]
    public class Gallery2Controller : Controller
    {
        [Route]
        // GET: News
        public ActionResult Index()
        {
            return View();
        }

        [Route("{alias}-{id:int}")]
        public ActionResult Show(string alias, int id)
        {
            using (MinhThanhEntities db = new MinhThanhEntities())
            {
                var model = db.Galleries.Where(p => p.id == id && p.alias == alias).FirstOrDefault();

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


        public JsonResult GetGallery(string id)
        {
            using(MinhThanhEntities db = new MinhThanhEntities())
            {
                if(id  != null)
                {
                    int idGallery;
                    if(int.TryParse(id, out idGallery))
                    {
                        AltGallery model = new AltGallery()
                        {
                            Info = db.Galleries.Find(idGallery),
                            Images = db.Images.Where(p => p.idGallery == idGallery).ToList()
                        };

                        return Json(model, JsonRequestBehavior.AllowGet);
                    }
                }

                return null;
            }
        }
    }
}