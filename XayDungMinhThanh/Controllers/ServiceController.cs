using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using XayDungMinhThanh.Models;
using XayDungMinhThanh.Models.AltModel;

namespace XayDungMinhThanh.Controllers
{
    [RoutePrefix("dich-vu")]
    public class ServiceController : Controller
    {
        [Route]
        // GET: Service
        public ActionResult Index()
        {
            return RedirectToAction("Index", "Home");
        }

        public JsonResult GetSerVices()
        {
            using (MinhThanhEntities db = new MinhThanhEntities())
            {
                var model = (
                    from cp in db.CategoryPosts
                    where cp.published == true && cp.isService
                    select new AltCategoryPost()
                    {
                        id = cp.id,
                        title = cp.title,
                        alias = cp.alias
                    }
                ).ToList();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }

        [Route("{alias}-{id:int}")]
        public ActionResult GetService(string alias, int id)
        {
            using (MinhThanhEntities db = new MinhThanhEntities())
            {
                var model = db.CategoryPosts.Where(p => p.id == id && p.alias == alias && p.published == true && p.isService == true).FirstOrDefault();

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

        [Route("{aliasCategoryPost}/{alias}-{id:int}")]
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

        public JsonResult GetPosts(string id)
        {
            using (MinhThanhEntities db = new MinhThanhEntities())
            {
                if(id != null)
                {
                    int idCategoryPost;
                    if(int.TryParse(id, out idCategoryPost))
                    {
                        var model = (
                            from p in db.Posts
                            where
                                p.idCategory == idCategoryPost &&
                                p.published == true
                            select new AltPost()
                            {
                                id = p.id,
                                title = p.title,
                                alias = p.alias,
                                description = p.description,
                                image = p.image,
                                timePublished = p.timePublished
                            }
                        ).OrderByDescending(p => p.id).ToList();

                        return Json(model, JsonRequestBehavior.AllowGet);
                    }
                }

                return null;
            }
        }

        public JsonResult GetPost(string id)
        {
            using (MinhThanhEntities db = new MinhThanhEntities())
            {
                if (id != null)
                {
                    int idPost;
                    if (int.TryParse(id, out idPost))
                    {
                        NewsShow model = new NewsShow();
                        model.Post = db.Posts.Where(p => p.id == idPost).FirstOrDefault();
                        model.CategoryPost = (
                            from cp in db.CategoryPosts
                            where cp.id == model.Post.idCategory
                            select new AltCategoryPost()
                            {
                                id = cp.id,
                                description = cp.description,
                                title = cp.title,
                                alias = cp.alias,
                                imageBanner = cp.imageBanner
                            }
                        ).FirstOrDefault();
                        model.LastPosts = (
                            from p in db.Posts
                            where
                                p.idCategory == model.CategoryPost.id &&
                                p.id != model.Post.id &&
                                p.published == true
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
                        ).ToList();

                        return Json(model, JsonRequestBehavior.AllowGet);
                    }
                }

                return null;
            }
        }


    }
}