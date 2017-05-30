using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using XayDungMinhThanh.Areas.Admin.Models;
using XayDungMinhThanh.Models;

namespace XayDungMinhThanh.Areas.Admin.Controllers
{
    public class BacSiController : Controller
    {
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
                    from p in db.BacSis
                    select new AltBacSi()
                    {
                        id = p.id,
                        hoTen=p.hoTen,
                        alias=p.alias,
                        featured=p.featured
                    }
                ).ToList();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }
    }
}