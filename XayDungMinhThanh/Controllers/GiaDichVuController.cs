using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace XayDungMinhThanh.Controllers
{
    [RoutePrefix("bang-gia")]
    public class GiaDichVuController : Controller
    {
        // GET: GiaDichVu
        [Route]
        public ActionResult Index()
        {
            return View();
        }
    }
}