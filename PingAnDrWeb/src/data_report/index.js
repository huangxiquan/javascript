/**
 * Created by 数据报告女性类型
 */
const nymph = "nymph";
const whiteCollar = "whiteCollar";
const yummyMummy = "yummyMummy";
const housewife = "housewife";

var type = nymph;
const share_title = "那些女性的小秘密~";
const share_text = '青春不要痘，行走江湖靠神功。守护家园，和时间赛跑？一切秘密尽在这里！赶快点击来看看！';
var datas = {
  nymph: {
    title: share_title,
    share_title: "震惊！困扰三四线少女的健康问题竟然是……",
    desc: "",
    out: "../assets/image/circle_out_beautiful_girl@2x.png",
    inner: "../assets/image/circle_inner_beautiful_girl@2x.png",
    detail: "../assets/image/data_nymph.png"
  },
  whiteCollar: {
    title: share_title,
    share_title: "震惊！失眠和抑郁情绪在职场女性中的渗透率竟然已经达到了……",
    desc: "",
    out: "../assets/image/circle_out_white_collar@2x.png",
    inner: "../assets/image/circle_inner_white_collar@2x.png",
    detail: "../assets/image/data_white_collar.png"
  },
  yummyMummy: {
    title: share_title,
    share_title: "震惊！这个时代，竟然还有人在“医院”搞个人崇拜！……",
    desc: "",
    out: "../assets/image/circle_out_hot_mom@2x.png",
    inner: "../assets/image/circle_inner_hot_mom@2x.png",
    detail: "../assets/image/data_yummy_mummy.png"
  },
  housewife: {
    title: share_title,
    share_title: "震惊！最爱减肥的都市女性，除了少女竟然是……",
    desc: "",
    out: "../assets/image/circle_out_housewife@2x.png",
    inner: "../assets/image/circle_inner_housewife@2x.png",
    detail: "../assets/image/data_housewife.png"
  }
};


/* queryString*/
function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function () {

  document.getElementById("share_btn").addEventListener("click", function () {
    document.getElementById("share_wrap").style.display = "block";
  });


  document.getElementById("share_mask").addEventListener("click", function () {
    document.getElementById("share_wrap").style.display = "none";
  });


  document.title = datas[type].title;
  document.getElementById("outer").setAttribute("src", datas[type].out);
  document.getElementById("inner").setAttribute("src", datas[type].inner);
  document.getElementById("data_report_img").setAttribute("src", datas[type].detail);

});


window.onload = function () {
  initShareData(datas[type].share_title, share_text, encodeURIComponent(location.href.split('#')[0]));
};

