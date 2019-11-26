$(document).ready(
    function () {

        // my home 搜索功能
        var commitButtom = document.getElementById("filterButton");
        var startTime = document.getElementById("start");
        var stopTime = document.getElementById("stop");
        var order_name_id = document.getElementById("order_name");
        //心愿单页面商品数量加减
        $(".button_two_jia").click(function () {
            var t = $(this).parent().find('input[class*=input_number]');
            t.val(parseInt(t.val()) + 1)
            //    可添加方法
        })
        $(".button_one_jian").click(function () {
            var t = $(this).parent().find('input[class*=input_number]');
            t.val(parseInt(t.val()) - 1)
            if (parseInt(t.val()) < 0) {
                t.val(0);
            }
            //    可添加方法
        })


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

var commitButtonOnclick = function () {
    var startTime = document.getElementById("start");
    var stopTime = document.getElementById("stop");
    var order_name_id = document.getElementById("order_name");
    var inputStartTime = startTime.value;
    var inputStopTime = stopTime.value;
    var input_order_name_id = order_name_id.value;
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



