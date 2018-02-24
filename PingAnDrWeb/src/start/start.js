/**
 * Created by yang on 2017/4/13.
 */



var progress = 1;
var loading_timer;
var flag = 1;
$(document).ready(function () {
  // 监听微信加载完毕
  document.addEventListener("WeixinJSBridgeReady", function () {
    document.getElementById("bg_music").play();
  }, false);

  var loadingProgress = document.getElementsByClassName('loadingProgress')[0];
  loading_timer = setInterval(function () {
    if (progress < 90) {
      progress = progress + Math.round(Math.random() * 9 + 1);
      loadingProgress.innerText = progress + '%';
    }
  }, 100);
  $('.scanPackageBox').fadeOut("slow");
});


window.onload = function () {
  var music = document.getElementById("bg_music");
  var bgclick = document.getElementById("bg_music_control");
  var loadingProgress = document.getElementsByClassName('loadingProgress')[0];
  bgclick.addEventListener("click", function () {
    if (flag == 1) {
      music.pause();
      /*音乐关闭*/
      flag = 0;
      console.log("关闭");
      bgclick.style.backgroundImage = "url(../assets/image/music_stop@2x.png)";
      bgclick.style.webkitAnimationPlayState = "paused";  //旋转动画暂停
    } else {
      music.play();
      /*音乐开启*/
      flag = 1;
      console.log("开启");
      bgclick.style.backgroundImage = "url(../assets/image/music_start@2x.png)";
      bgclick.style.webkitAnimationPlayState = "running";  //旋转动画暂停
    }
  });
  clearInterval(loading_timer);
  if (progress < 100) {
    loadingProgress.innerText = "100%";
  }
  setTimeout('loadAll()', 1000);
};

function loadAll() {

  $('.loadingGif').addClass('hidden');
  $('.second').removeClass('hidden');

  var scanContent = $(".scanContent");
  var scanBox = $(".scanTextBox");
  var heartImage = $(".heart");
  var bgm = document.getElementById("bg_music");
  var bgclick = document.getElementById("bg_music_control");
  var scanText = document.getElementsByClassName('scanText')[0];
  bgm.play();
  autoPlayAudio();
  bgclick.style.visibility = "visible";
  //点击❤️图片
  heartImage.click(function () {
    //显示无字扫描框
    scanContent.css("display", "none");
    heartImage.css("display", "none");
    scanBox.css("visibility", "visible");

    $('.scanPackageBox').fadeIn(2000, function () {
      setTimeout('slideDown()', 2000);
    });
  });
}

function slideDown() {
  var second = $(".second");

  var seconds = document.getElementsByClassName("second")[0];
  second.css({
    'transition-timing-function': 'linear',
    'transition-duration': '800ms',
    'transform': 'translate3d( 0rem, -10.7rem,0rem)', //设置页面X轴移动
    '-webkit-transform': 'translate3d( 0rem, -10.7rem,0rem)', //设置页面X轴移动
    'overflow': 'visible'
  });

  seconds.addEventListener('webkitTransitionEnd', function () {
    setTimeout('beginMarqueeAnimation()', 1000);
  }, false);
}

function beginMarqueeAnimation() {
  var marqueeBox = $('.marqueeBox');
  var marquee_highlight = document.getElementsByClassName('marquee_highlight')[0];
  var marquee_highlight_box = $('.marquee_highlight_box');
  var marqueeText = $('.marqueeText');
  marqueeText.removeClass('hidden');


  // 当滑动到一定高度，跑马灯开始闪
  marqueeBox.css("background-image", "url(../assets/image/marquee_highlight_two@2x.png)");
  marqueeBox.css("display", "none");
  marquee_highlight_box.css("visibility", "visible");
  marquee_highlight.style.display = "block";

  var marquee_timer = setInterval(function () {
    if (marquee_highlight.src.lastIndexOf('marquee_highlight_one@2x.png') != -1) {
      marquee_highlight.src = '../assets/image/marquee_highlight_two@2x.png';
    } else {
      marquee_highlight.src = '../assets/image/marquee_highlight_one@2x.png';
    }
  }, 900);
}


function autoPlayAudio() {
  wx.config({
// 配置信息, 即使不正确也能使用 wx.ready
    debug: false,
    appId: '',
    timestamp: 1,
    nonceStr: '',
    signature: '',
    jsApiList: []
  });
  wx.ready(function () {
    document.getElementById("bg_music").play();
  });
}

