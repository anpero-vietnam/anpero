﻿var Cart = {
    list: [],
    addProduct: function (_id, _price, _thumb, _title) {        
        var checkExited = false;
        if ($.cookie("CartList") != null && $.cookie("CartList") != "undefined" && $.cookie("CartList") != "null") {
            Cart.list = jQuery.parseJSON($.cookie("CartList"));
        }

        if (Cart.list.length == 0) {
            Cart.list.push({ id: _id, quantity: 1, price: _price, thumb: _thumb, title: _title });
        } else {
            for (var i = 0; i < Cart.list.length; i++) {
                if (Cart.list[i].id == _id) {
                    Cart.list[i].price = parseInt(_price) + parseInt(Cart.list[i].price)
                    Cart.list[i].quantity = parseInt(Cart.list[i].quantity) + 1;
                    checkExited = true;
                }
            }
            // if this product no in cart list
            if (!checkExited) {
                Cart.list.push({ id: _id, quantity: 1, price: _price, thumb: _thumb, title: _title });
            }
        }        
        $.cookie("CartList", JSON.stringify(Cart.list), {path: '/' });
        window.location.href = "/product/checkout";
    },
    addProduct2: function (_id, _price) {
        debugger
        if ($.cookie("CartList") != null && $.cookie("CartList") != "undefined" && $.cookie("CartList") != "null") {
            Cart.list = jQuery.parseJSON($.cookie("CartList"));
        }
        for (var i = 0; i < Cart.list.length; i++) {
            if (Cart.list[i].id == _id) {
                Cart.list[i].price = parseInt(Cart.list[i].price)
                Cart.list[i].quantity = parseInt(Cart.list[i].quantity) + 1;
                $("#prQuantity_" + _id).val(Cart.list[i].quantity);
            }
        }
        $.cookie("CartList", JSON.stringify(Cart.list), { path: '/' });
        Cart.bindCartTable();
    },
    bindCart: function () {
        var ttSC = 0;
        var htmlCat = "";
        if ($.cookie("CartList") != 'null' && $.cookie("CartList") != "undefined" && $.cookie("CartList") != undefined) {
            Cart.list = jQuery.parseJSON($.cookie("CartList"));
            $(".spN").html(Cart.list.length);
            for (var i = 0; i < Cart.list.length; i++) {
                ttSC += parseInt(Cart.list[i].price) * parseInt(Cart.list[i].quantity);
                htmlCat += '<li class="product-info"><div class="p-left">';
                htmlCat += '<a href="javascript:Cart.remove(' + Cart.list[i].id + ')" class="remove_link"></a>';
                htmlCat += '<img class="img-responsive" src="' + Cart.list[i].thumb + '" alt="' + Cart.list[i].title + '">';
                htmlCat += '</div>';
                htmlCat += '<div class="p-right">';
                htmlCat += '<p class="p-name">' + Cart.list[i].title + '</p>';
                //htmlCat += '<p class="p-rice">' + Util.toMoneyFormat(Cart.list[i].price) + ' đ</p>';
                //htmlCat += '<p>SL: ' + Cart.list[i].quantity + '</p>';
                htmlCat += '</div>';
                htmlCat += '</li>';
            }
            $("#ttSC").html(Util.toMoneyFormat(ttSC));
            $("#prCatCt").html(htmlCat);
            $(".toal-cart").show();
            $(".cart-buttons").show();
        }
    },
    bindCartTable: function () {

        var ttSC = 0;

        var _paymentFee = $('input[name=radio_4]:checked').attr("data-ship");
        var htmlCat = "";
        if ($.cookie("CartList") != null && $.cookie("CartList") != "undefined") {
            Cart.list = jQuery.parseJSON($.cookie("CartList"));
           
            $(".spN").html(Cart.list.length);
            for (var i = 0; i < Cart.list.length; i++) {
                ttSC += parseInt(Cart.list[i].price) * parseInt(Cart.list[i].quantity);
                htmlCat += '<tr>';
                htmlCat += '<td class="cart_product">';
                htmlCat += '<a href="#"><img src="' + Cart.list[i].thumb + '" alt="' + Cart.list[i].title + '"></a>';
                htmlCat += '</td>';
                htmlCat += '<td class="cart_description">';
                htmlCat += '<p class="product-name"><a href="#">' + Cart.list[i].title + ' </a></p>';

                htmlCat += '</td>';
                //htmlCat += '<td class="cart_avail"><span class="label label-success">Sẵn sàng</span></td>';
                if (Cart.list[i].price > 0) {
                    htmlCat += '<td class="price"><span>' + Util.toMoneyFormat(Cart.list[i].price) + '</span></td>';
                } else {
                    htmlCat += '<td class="price"><span>Liên hệ</span></td>';
                }
                
                
                //htmlCat += '<td class="price">';
                //htmlCat += '<span>' + Util.toMoneyFormat(parseInt(Cart.list[i].price) * parseInt(Cart.list[i].quantity)) + ' đ</span>';
                //htmlCat += '</td>';
                htmlCat += '<td class="action">';
                htmlCat += '<a href="javascript:Cart.remove2(' + Cart.list[i].id + ')" class="remove_link"></a>';
                htmlCat += '</td>';
                htmlCat += '</tr>';

            }
            var shipingFee = $('input[name=radio_3]:checked').attr("data-ship");

            $("#ttPrCt").html(Util.toMoneyFormat(ttSC) + " đ");
            $("#prCatCtTable").html(htmlCat);
        }
    },
    remove: function (prId) {
        Cart.list = jQuery.parseJSON($.cookie("CartList"));
        for (var i = 0; i < Cart.list.length; i++) {
            if (Cart.list[i].id == prId) {
                Cart.list.splice(i, 1);
            }
        }
        var date = new Date();
        var minutes = 60 * 2;
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        $.cookie("CartList", JSON.stringify(Cart.list), { path: '/' });
        Cart.bindCart();
    },
    remove2: function (prId) {
        Cart.list = jQuery.parseJSON($.cookie("CartList"));
        for (var i = 0; i < Cart.list.length; i++) {
            if (Cart.list[i].id == prId) {
                Cart.list.splice(i, 1);
            }
        }        
        $.cookie("CartList", JSON.stringify(Cart.list), { path: '/' });
        Cart.bindCartTable();
    },
    remove3: function (_id) {
        if ($.cookie("CartList") != null && $.cookie("CartList") != "undefined" && $.cookie("CartList") != "null") {
            Cart.list = jQuery.parseJSON($.cookie("CartList"));
        }
        for (var i = 0; i < Cart.list.length; i++) {

            if (Cart.list[i].id == _id && parseInt(Cart.list[i].quantity) > 1) {
                Cart.list[i].price = parseInt(Cart.list[i].price);
                Cart.list[i].quantity = parseInt(Cart.list[i].quantity) - 1;
            }
        }        
        $.cookie("CartList", JSON.stringify(Cart.list), { path: '/' });
        Cart.bindCartTable();
    },
    sendOrder: function () {
        var valid = true;
        var _name = $("#cName").val();
        var _detail = $("#detail").val();
        var _shipingType = $('input[name=radio_3]:checked').val();
        var _paymentType = $('input[name=radio_4]:checked').val();
        var _shipingFee = $('input[name=radio_3]:checked').attr("data-ship");
        var _paymentFee = $('input[name=radio_4]:checked').attr("data-ship"); 
        var _email = $("#cMail").val();
        var _phone = $("#cPhone").val();
        var _address = $("#cAddress").val();
        if (_name == 'null' || _name == "") {
            valid = false;
            Util.notify("Lỗi: ", "Bạn chưa nhập tên liên hệ");
        }
        if (_address == 'null' || _address == "") {
            valid = false;
            Util.notify("Lỗi: ", "Vui lòng nhập địa chỉ");
        }

        if (_email != "" && !Util.isEmail(_email)) {
            valid = false;
            Util.notify("Lỗi: ", "Email không đúng định dạng");
        }

        if (_phone == "" || _phone == 'null') {
            valid = false;
            Util.notify("Lỗi: ", "Số điện không được để trống");
        } else if (!Util.isVnFone(_phone)) {
            valid = false;
            Util.notify("Lỗi: ", "Số điện không đúng định dạng");
        }
        var captchaResponse = grecaptcha.getResponse(googleCatcha);
        if (captchaResponse == "" || captchaResponse == null) {
            grecaptcha.reset();
            Util.notify("Lỗi", "Vui lòng nhập click vào ô kiểm tra");
            valid = false;
        }
        if ($.cookie("CartList") == "[]") {
            Util.notify("Lỗi", "Giỏ hàng đang trống không thể tạo đơn hàng");
            valid = false;
        }
        _payMentType=0;
        switch (_shipingType) {
            case "0":
                    _payMentType = 0;
                break;
             case "1":
                 switch (_paymentType) {
                     case "0":
                         _payMentType = 0;
                         break;
                     case "1":
                         _payMentType = 6;
                         break;
                     case "2":
                         _payMentType = 1;
                         break;
                     default:
                 }
                 break;
            case "2":
                switch (_paymentType) {
                    case "0":
                        _payMentType = 0;
                        break;
                    case "1":
                        _payMentType = 7;
                        break;
                    case "2":
                        _payMentType = 2;
                        break;
                    default:
                }
                break;

            default:
                _payMentType = 0;
        }        
       
        if (valid) {
            $("#cartContent1").hide();
            $("#cartContent2").show();
            $("#cartContent2").html("<h4>Đơn hàng đang được gửi ...</h4>");
            $("#ajax_loader").show();
            $.ajax({
                method: "post",
                url: "/handler/ProductHandler.ashx",
                datatype: "text/plain",
                data: { op: "CreateOrder", detail: _detail,PayMentType:_payMentType, captcha: captchaResponse, name: _name, email: _email, phone: _phone, address: _address, ProductList: $.cookie("CartList"), shipingFee:parseInt(_shipingFee)+parseInt(_paymentFee) },
                success: function (rs) {
                    $("#ajax_loader").hide();
                    if (!isNaN(rs)) {
                        $.removeCookie('CartList', { path: '/' });
                        $("#cartContent2").html("<h4>Yêu cầu tư vấn số #" + rs + " đã được gửi thành công tới bộ phận chăm sóc khách hàng. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</h4>");
                        Util.notify("", "Đơn hàng đã được gửi tới bộ phận bán hàng. ");
                     
                    } else {
                        Util.notify("", rs);
                        $("#cartContent1").show();
                        grecaptcha.reset();
                    }
                }
            });
        }
    }
}