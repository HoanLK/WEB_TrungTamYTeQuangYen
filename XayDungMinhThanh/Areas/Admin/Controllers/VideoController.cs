using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace XayDungMinhThanh.Areas.Admin.Controllers
{
    public class VideoController : Controller
    {
        // GET: Admin/Video
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Modify()
        {
            return View();
        }
    }
}