using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using XayDungMinhThanh.Models;
using XayDungMinhThanh.Models.AltModel;

namespace XayDungMinhThanh.Controllers
{
    [RoutePrefix("tim-kiem")]
    public class SearchController : Controller
    {
        [Route]
        // GET: Search
        public ActionResult Index()
        {
            return View();
        }

        //SearchByText
        public JsonResult SearchByText(string search)
        {
            search = search.ToLower();
            
            using(MinhThanhEntities db = new MinhThanhEntities())
            {
                var model = (
                    from p in db.Posts.Where(p => p.title.Contains(search) || p.description.Contains(search) || p.content.Contains(search))
                    where p.published == true
                    select new AltPost()
                    {
                        id = p.id,
                        alias = p.alias,
                        title = p.title,
                        description = p.description,
                        image = p.image,
                        timePublished = p.timePublished
                    }
                ).ToList();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }
    }
}