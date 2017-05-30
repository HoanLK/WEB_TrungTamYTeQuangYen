using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using XayDungMinhThanh.Models;
using XayDungMinhThanh.Models.AltModel;

namespace XayDungMinhThanh.Controllers
{
    [RoutePrefix("bac-si")]
    public class DoctorController : Controller
    {
        [Route]
        // GET: Doctor
        public ActionResult Index()
        {
            return View();
        }

        [Route("{alias}-{id:int}")]
        public ActionResult Show(string alias, int id)
        {
            using (MinhThanhEntities db = new MinhThanhEntities())
            {
                var model = db.BacSis.Where(p => p.id == id && p.alias == alias).FirstOrDefault();

                if (model == null)
                {
                    return RedirectToAction("Index", "Home");
                }

                return View(model);
            }
        }
    }
}