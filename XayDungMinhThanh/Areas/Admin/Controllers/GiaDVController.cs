using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using XayDungMinhThanh.Areas.Admin.Models;
using XayDungMinhThanh.Models;

namespace XayDungMinhThanh.Areas.Admin.Controllers
{
    public class GiaDVController : Controller
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
                    from p in db.GiaDichVus
                    select new AltGiaDV()
                    {
                        id = p.ID,
                        TenDV = p.TenDV,
                        MaDV = p.MaDV,
                        GiaBaoHiem = p.GiaBaoHiem,
                        GiaVienPhi = p.GiaVienPhi,
                        GiaYeuCau = p.GiaYeuCau,
                    }
                ).ToList();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }
    }
}