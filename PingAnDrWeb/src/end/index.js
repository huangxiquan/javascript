/**
 * Created by 大礼包分享页女性类型
 */
const gift_one = "gift_one";
const gift_two = "gift_two";
const gift_three = "gift_three";
const gift_four = "gift_four";

var gift_type = gift_one;
var share_text = '青春不要痘，行走江湖靠神功。守护家园，和时间赛跑？一切秘密尽在这里！赶快点击来看看！';

var gift_datas = {
  gift_one: {
    title: "阅女无数",
    share_title: "震惊！我获封了“阅女无数”称号，还有好多不得了的小秘密！",
    src: "../assets/image/gift_one.png",
    desc: ""
  },
  gift_two: {
    title: "妇女之友",
    share_title: "震惊！我荣登了“妇女之友”榜单，还有好多不得了的小秘密！",
    src: "../assets/image/gift_four.png",
    desc: ""
  },
  gift_three: {
    title: "万花解语",
    share_title: "震惊！我解锁了“万花解语”技能，还有好多不得了的小秘密！",
    src: "../assets/image/gift_three.png",
    desc: ""
  },
  gift_four: {
    title: "御姐心经",
    share_title: "震惊！我习得了“御姐心经”口诀，还有好多不得了的小秘密！",
    src: "../assets/image/gift_two.png",
    desc: ""
  }
};

function GetRandomNum(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return (Min + Math.round(Rand * Range));
}


function initialize() {

  var num = GetRandomNum(0, 3);
  var randoms = [gift_one, gift_two, gift_three, gift_four];
  gift_type = randoms[num];
  console.log(gift_type + "" + num);
  //document.title = gift_datas[gift_type].title;
  document.getElementById("share_btn").addEventListener("click", function () {
    document.getElementById("share_wrap").style.display = "block";
  });

  document.getElementById("gift_image").setAttribute("src", gift_datas[gift_type].src);

  document.getElementById("share_mask").addEventListener("click", function () {
    document.getElementById("share_wrap").style.display = "none";
  });

  document.getElementById("share_hidden_text").textContent = share_text;
  $('#gift_detail_scroll').on('scroll',function (event) {
    event.stopPropagation();
  });
}

window.onload = function () {
  initialize();
  initShareData(gift_datas[gift_type].share_title, share_text, encodeURIComponent(location.href.split('#')[0]));
}
