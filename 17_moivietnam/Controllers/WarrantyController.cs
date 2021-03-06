﻿using AnperoFrontend.WebService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AnperoFrontend.Controllers
{
    public class WarrantyController : BaseController
    {

        // GET: Warranty
        [BuildCommonHtml]
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Register(WebService.Contact contact, string seria, string note, string reseller, string capcha)
        {

            string _msg = "";
            //contact.District = "";
            //contact.Province="";
            contact.StoreId = StoreID.ToString();
            seria = seria.Replace(" ", string.Empty).Trim();
            contact.IdCard = contact.IdCard.Replace(" ", string.Empty).Trim();
            string rs = service.RegisterSeria(contact, seria, reseller, note, capcha, StoreID, TokenKey, out _msg);
            return Json(new
            {
                code = rs,
                msg = _msg
            });
        }
        [HttpGet]
        [BuildCommonHtml]
        public ActionResult Check(string seria, string idCard)
        {
            ViewBag.identiryId = idCard;
            ViewBag.seria = seria;
            return View();
        }
        [BuildCommonHtml]
        [HttpGet]
        public ActionResult Info(string seria, string idCard, string capcha)
        {

            AnperoClient client = new AnperoClient();
            client.AgenId = StoreID;
            client.Token = TokenKey;
            var rs = service.GetWarrantyCardInfo(seria, idCard, capcha, client);
            ViewBag.ProductItem = service.GetProductDetail(StoreID, TokenKey, rs.ProductId);

            return View(rs);
        }

        [HttpPost]
        public PartialViewResult AjaxInfo(string seria, string idCard, string capcha)
        {
            AnperoClient client = new AnperoClient();
            client.AgenId = StoreID;
            client.Token = TokenKey;
            var rs = service.GetWarrantyCardInfo(seria, idCard, capcha, client);
            ViewBag.ProductItem = service.GetProductDetail(StoreID, TokenKey, rs.ProductId);
            return PartialView(rs);
        }
        [HttpPost]
        public JsonResult AjaxCheckseria(string seria, string idCard, string capcha)
        {

            string msg = "";
            AnperoClient client = new AnperoClient();
            client.AgenId = StoreID;
            client.Token = TokenKey;
            var rs = service.GetProductIdBySeria(seria, capcha, client.AgenId);
            string _link = "";
            //WebService.ProductItem item
            if (rs > 0)
            {
                var productItem = service.GetProductDetail(StoreID, TokenKey, rs);
                _link = Anpero.StringHelpper.GetProductLink(productItem.PrName, productItem.Id);
            }
            

            return Json(new
            {
                code = rs,
                link= _link
            });
        }

        [BuildCommonHtml]
        [HttpGet]
        public ActionResult Success(string id)
        {

            string msg = "";
            AnperoClient client = new AnperoClient();
            client.AgenId = StoreID;
            client.Token = TokenKey;
            var rs = service.GetWarrantyCardById(id, client);
            //WebService.ProductItem item
            ViewBag.ProductItem = service.GetProductDetail(StoreID, TokenKey, rs.ProductId);

            return View("Info", rs);
        }
        [BuildCommonHtml]
        public ActionResult CheckSeria()
        {
            return View();
        }
    }
    //public class Contact
    //{   
    //    public string Phone { get; set; }
    //    public string Name { get; set; }
    //    public string Mail { get; set; }
    //    public string Address { get; set; }
    //    public int UserId { get; set; }        
    //    public string StoreId { get; set; }
    //    public int LocationId { get; set; }
    //    public string IdCard { get; set; }
    //}
}