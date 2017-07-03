using System.Web.Mvc;
using FCSAmerica.Transact.WebUI.Common;

namespace FCSAmerica.Transact.WebUI
{
    public static class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(DependencyResolver.Current.GetService<AppExceptionsAttribute>());
        }
    }
}