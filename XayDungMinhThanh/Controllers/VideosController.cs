using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace XayDungMinhThanh.Controllers
{
    [RoutePrefix("video")]
    public class VideosController : Controller
    {
        [Route]
        // GET: Videos
        public ActionResult Index()
        {
            return View();
        }
    }
}