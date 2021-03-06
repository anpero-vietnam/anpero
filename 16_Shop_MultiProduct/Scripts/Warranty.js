﻿var Warranty = (function () {
    var datas = {};
    function getAndValidateData() {
        var valid = true;
        datas.LocationId = 0;
        var _location = $("#country").val();
        var district = $("#prov").val();
        var captchaResponse = grecaptcha.getResponse(googleCatcha);
        if (district > 0) {
            datas.LocationId = district;
        } else if (_location > 0) {
            datas.LocationId = _location;
        }
         
        datas.Province = _location>0?$("select[name=province] option:selected").text():"";
        datas.District = district>0?$("select[name=district] option:selected").text():"";
        datas.seria = $("#seria").val();
        datas.Name = $("#fullName").val();
        datas.Address = $("#address").val();
        datas.identiryId = $("#identiryId").val();
        datas.Phone = $("#phone").val();
        datas.Mail = $("#emial").val();
        datas.IdCard = $("#identiryId").val();
        datas.Note = $("#note").val();
        datas.Reseller = $("#reseller").val();
        datas.capcha = captchaResponse;
        if (captchaResponse == null || captchaResponse == "") {
            Util.notify("", "Vui lòng click vào ô kiểm tra bảo mật. ");
            valid = false;
        }
        if (datas.IdCard == "") {
            Util.notify("", "Vui lòng nhập số CMTND hoặc hộ chiếu!");
            valid = false;
        }

        if (datas.LocationId == 0) {
            Util.notify("", "Vui lòng chọn tỉnh thành phố!");
            valid = false;
        }
        if (datas.seria == "") {
            Util.notify("", "Vui lòng nhập seria");
            valid = false;
        }
        if (datas.Name == "") {
            Util.notify("", "Vui lòng nhập đủ họ tên!");
            valid = false;
        }

        if (datas.Address == "") {
            Util.notify("", "Vui lòng nhập địa chỉ!");
            valid = false;
        }
        if (datas.Phone == "") {
            Util.notify("", "Vui lòng nhập số điện thoại!");
            valid = false;
        } else if (!Util.isVnFone(datas.Phone)) {
            Util.notify("", "Lỗi! Số điện thoại không đúng định dạng.");
        }
        
        if (datas.Mail.trim() != "" && !Util.isEmail(datas.Mail)) {
            Util.notify("", "Lỗi! Email không đúng định dạng.");
        }
        return valid;
    }
    function init() {
        $(document).ready(function () {
            $("#addWrr").click(function (e) {
                if (getAndValidateData()) {
                    $.ajax({
                        method: "post",
                        url: "/warranty/Register",
                        datatype: "json",
                        data:datas,
                        success: function (rs) {
                            if (rs.code != "" && rs.code != null && rs.code!=0) {
                                swal({
                                    title: "Đăng ký bảo hành thành công",
                                    text: "Cảm ơn bạn đã sử dụng sản phẩm của JAKI.",
                                    showConfirmButton: true,
                                    showCancelButton: true,

                                    cancelButtonText: 'Đăng ký tiếp',
                                    confirmButtonText: "Xem thông tin",
                                    type: "success"
                                }, function (confirm) {
                                    if (confirm) {
                                        window.location.href = "/warranty/success?id=" + rs.code;
                                    } else {
                                        $("#seria").val("");
                                        grecaptcha.reset();
                                    }

                                });
                            } else {
                                if (rs.msg == "Seria không tồn tại trên hệ thống") {
                                    Util.notify("", "Mã vạch " + datas.seria + " không tồn tại. Vui lòng kiểm tra lại mã sản phẩm vì sản phẩm này không phải là mã của thương hiệu Jaki.");
                                } else {
                                    Util.notify("", "Mã vạch " + datas.seria + " đã được đăng ký bảo hành chính hãng Jaki. Vui lòng kiểm tra lại với nhà sản xuất để được hỗ trợ nếu cần.");
                                }
                                grecaptcha.reset();
                                
                            }
                            

                        }
                    });
                }
            });
        });


    }
    function initCheck() {
        $(document).ready(function () {
            $("#checkWarranty").click(function () {
                var valid = true;
                var captchaResponse = grecaptcha.getResponse(googleCatcha);
               var seria =  $("#seria").val();
                var idCard= $("#identiryId").val();
                if (captchaResponse == null || captchaResponse == "") {
                    Util.notify("", "Vui lòng click vào ô kiểm tra bảo mật. ");
                    valid = false;
                    grecaptcha.reset();
                }
                if (seria == "") {
                    Util.notify("", "Vui lòng Nhập seria. ");
                    valid = false;
                }
                if (idCard == "") {
                    Util.notify("", "Vui lòng nhập số CMTND / Hộ chiếu. ");
                    valid = false;
                }

                if (valid) {                    
                    $.ajax({
                        url: "/warranty/ajaxinfo",
                        data: { seria: seria, idCard: idCard, capcha: captchaResponse },
                        type: "post",
                        success: function (rs) {                     
                            if ( rs != null && rs.trim() != "") {
                                $("#content-check").hide();
                                $("#content-check-rs").show().html(rs);
                            } else {
                                Util.notify("", "Mã vạch hoặc CMTND / Hộ chiếu này không tồn tại trên hệ thống của Jaki.");
                                Util.notify("", "Vui lòng kiểm tra lại mã sản phẩm này ");                                
                                grecaptcha.reset();
                            }
                        }
                    });
                    
                }
            });
        });

    }
    function initCheckSeria() {
        $(document).ready(function () {
            $("#checkWarranty").click(function () {
                var valid = true;
                var captchaResponse = grecaptcha.getResponse(googleCatcha);
                var seria = $("#seria").val();
                
                if (captchaResponse == null || captchaResponse == "") {
                    Util.notify("", "Vui lòng click vào ô kiểm tra bảo mật. ");
                    valid = false;
                    grecaptcha.reset();
                }
                if (seria == "") {
                    Util.notify("", "Vui lòng Nhập seria. ");
                    valid = false;
                }
                if (valid) {
                    $.ajax({
                        url: "/warranty/AjaxCheckseria",
                        data: { seria: seria,capcha: captchaResponse },
                        type: "post",
                        success: function (rs) {
                            if (parseInt(rs.code)>0) {
                                window.location.href = rs.link + "?seria=" + seria;
                            } else {
                                Util.notify("", "Mã vạch này không tồn tại trên hệ thống của Jaki.");
                                Util.notify("", "Vui lòng kiểm tra lại mã sản phẩm này ");
                                grecaptcha.reset();
                            }
                        }
                    });

                }
            });
        });

    }
    return {
        init: init,
        initCheck: initCheck,
        initCheckSeria: initCheckSeria
    };
})();

