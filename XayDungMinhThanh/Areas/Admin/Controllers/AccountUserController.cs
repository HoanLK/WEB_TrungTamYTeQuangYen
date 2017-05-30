using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using XayDungMinhThanh.Areas.Admin.Models;
using XayDungMinhThanh.Models;

namespace XayDungMinhThanh.Areas.Admin.Controllers
{
    [Authorize]
    public class AccountUserController : Controller
    {
        // GET: Admin/AccountUser
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAll()
        {
            using(MinhThanhEntities db = new MinhThanhEntities())
            {
                var model = (
                    from ac in db.AspNetUsers
                    select new AltAccount()
                    {
                        id = ac.Id,
                        email = ac.Email,
                        emailConfirmed = ac.EmailConfirmed,
                        twoFactor = ac.TwoFactorEnabled
                    }
                ).ToList();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }
    }
}