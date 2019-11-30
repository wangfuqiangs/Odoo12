$(document).ready(
    function () {

        // my home 搜索功能
        var commitButtom = document.getElementById("filterButton");
        var startTime = document.getElementById("start");
        var stopTime = document.getElementById("stop");
        var order_name_id = document.getElementById("order_name");
        //查找当前页面的 portal_pager_AddToCart_button 按钮
        var portal_pager_AddToCart_button = $(this).find('button[id*=portal_pager_AddToCart_button_id]');
        var shop_number_div = $(this).find('div[id*=shop_number_div_id]');
        //查找当前所有商品
        var checkboxs_amount = document.getElementsByClassName("products_item_input_class");
        //查找当前购物车内商品数量
        var shop_sup = document.getElementById("shop_sup_id");

        //在商品主页面展示商品下方添加 Add To cart 按钮功能
        $("#portal_pager_AddToCart_button_id").click(function () {
            var c = $("input:checkbox:checked").length;
            for (var i = 0; i < checkboxs_amount.length; i++) {
                if (checkboxs_amount[i].checked) {
                    var p_id = $(checkboxs_amount[i]).parent().parent().find('input[name*=product_id]').val();
                    var i_number = $(checkboxs_amount[i]).parent().find('input[class*=input_number]').val();
                    //向购车请求数据 post 请求
                    const params = $.param({product_id: p_id, add_qty: i_number})
                    fetch(
                        "/shop/cart/update?" + params, {
                            method: 'POST',
                        })
                        .then(response => console.log(response))
                        .catch(error => console.log(error))
                    checkboxs_amount[i].checked = false;
                    $(checkboxs_amount[i]).parent().find('input[class*=input_number]').val(1);
                    console.log(shop_sup);
                    shop_sup.innerHTML = parseInt(shop_sup.innerHTML) + parseInt(i_number);
                }
            }
            portal_pager_AddToCart_button.css("display", "none");
            shop_number_div.css('display','none');
        }

    )
        //商品展示页面商品数量加减
        $(".products_item_input_class").click(function () {
            //判断是否有 checkbox 被选中 是否显示 Add to cart 按钮
            if ($("input:checkbox:checked").length > 0) {
                portal_pager_AddToCart_button.css("display", "");
            } else {
                portal_pager_AddToCart_button.css("display", "none");
            }
            var checkboxs = $(this).parent().find('input[class*=products_item_input_class]');
            var products_item_div = $(this).parent().find('div[class*=wish_number_div]');
            var products_id = $(this).parent().parent().find('input[name*=product_id]');
            //判断当前 checkbox 是否被选中 是否展示商品数量选择框
            if (checkboxs[0].checked) {
                products_item_div.css("display", "");
                var t = $(this).parent().find('input[class*=input_number]');
            } else {
                products_item_div.css("display", "none");
            }
            //    可添加方法
        });
        //心愿单页面商品数量加减
        $(".button_two_jia").click(function () {
            var t = $(this).parent().find('input[class*=input_number]');
            t.val(parseInt(t.val()) + 1)
            //    可添加方法
        });
        $(".button_one_jian").click(function () {
            var t = $(this).parent().find('input[class*=input_number]');
            t.val(parseInt(t.val()) - 1)
            if (parseInt(t.val()) < 0) {
                t.val(0);
            }
            //    可添加方法
        });


        commitButtom.addEventListener("click", commitButtonOnclick);
        var lsbcStartTime = localStorage.bcStartTime;
        var lsbcStopTime = localStorage.bcStopTime;
        var user_input_name = localStorage.bcUserInputName;
        var urlcd = window.location.search;
        if (urlcd.length > 1) {
            startTime.value = lsbcStartTime;
            stopTime.value = lsbcStopTime;
            if (user_input_name == undefined) {
                order_name_id.value = "";
            } else {
                order_name_id.value = user_input_name;
            }

        } else {
            startTime.value = "";
            stopTime.value = "";
            order_name_id.value = "";
        }
        window.onbeforeunload = function (event) {
            window.localStorage.removeItem('bcUserInputName');
            window.localStorage.removeItem('bcStartTime');
            window.localStorage.removeItem('bcStopTime');


        }

    }
);

const getById = (id) => document.getElementById(id);

getCommitButtonData = () => {
    startTime : getById("start").value;
    stopTime : getById("stop").value;
    order_name_id : document.getElementById("order_name").value;
}


var commitButtonOnclick = function () {
    var startTime = getById("start");
    var stopTime = getById("stop");
    var order_name_id = document.getElementById("order_name");
    var inputStartTime = startTime.value;
    var inputStopTime = stopTime.value;
    var input_order_name_id = order_name_id.value;

    // var {startTime, stopTime, order_name_id} = getCommitButtonData()

    var urlname = window.location.pathname;

    var urlpx = window.location.search;
    if (input_order_name_id.length > 0) {
        window.location.href = urlname + "?&name_id=" + input_order_name_id + "#";
        localStorage.bcUserInputName = input_order_name_id;
    } else {
        var bcname_id = urlpx.substring(2, 10);
        if (bcname_id == 'name_id=') {
            urlpx = '';
            if (urlpx.length > 13) {
                var urlpxs = urlpx.substring(0, 13);
                var arr = urlpxs.split("&");

                window.location.href = urlname + arr[0] + "&date_begin=" + inputStartTime + "&date_end=" + inputStopTime + "#"
                localStorage.bcStartTime = inputStartTime;
                localStorage.bcStopTime = inputStopTime;

            } else {
                window.localStorage.removeItem('bcUserInputName');
                window.location.href = urlname + "?" + urlpx + "&date_begin=" + inputStartTime + "&date_end=" + inputStopTime + "#"
                localStorage.bcStartTime = inputStartTime;
                localStorage.bcStopTime = inputStopTime;

            }

        } else {
            if (urlpx.length > 13) {
                var urlpxs = urlpx.substring(0, 13);
                var arr = urlpxs.split("&");

                window.location.href = urlname + arr[0] + "&date_begin=" + inputStartTime + "&date_end=" + inputStopTime + "#"
                localStorage.bcStartTime = inputStartTime;
                localStorage.bcStopTime = inputStopTime;

            } else {
                window.localStorage.removeItem('bcUserInputName');
                window.location.href = urlname + "?" + urlpx + "&date_begin=" + inputStartTime + "&date_end=" + inputStopTime + "#"
                localStorage.bcStartTime = inputStartTime;
                localStorage.bcStopTime = inputStopTime;

            }
        }
    }


};



