using FCSAmerica.Transact.WebUI.Common;
using System.Collections.Generic;
using System.Configuration;
using System.Web.Mvc;

namespace FCSAmerica.Transact.WebUI.Controllers
{
    public class HomeController : Controller
    {
        public HomeController()
        {
        }

        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
    }
}