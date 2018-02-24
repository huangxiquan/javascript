/**
 * Created by 分享页女性类型

const nymph_share = "nymph";
const whiteCollar_share = "whiteCollar";
const yummyMummy_share = "yummyMummy";
const housewife_share = "housewife";

var share_datas = {
  nymph: {
    title: "分享-美少女",
    desc: "../assets/image/circle_out_beautiful_girl@2x.png"
  },
  whiteCollar: {
    title: "分享-白领",
    desc: "../assets/image/circle_out_white_collar@2x.png"
  },
  yummyMummy: {
    title: "分享-辣妈",
    desc: "../assets/image/circle_out_hot_mom@2x.png"
  },
  housewife: {
    title: "分享-家庭主妇",
    desc: "../assets/image/circle_out_housewife@2x.png"
  }
};
 */

var link = 'http://z.dtcj.com/pinganDr03/main/main.html';
var title = '';
var desc = '';


/// 初始化分享数据
function initShareData(_title,_desc, auth_url) {
  title = _title;
  desc = _desc;
  //alert(title + "   " + _desc + "   " + auth_url);
  requestSign(auth_url);
}


requestSign().then(function (res) {


  wx.config({
    debug: false,
    appId: 'wx918e2834917e93dc',
    timestamp: res.timestamp,
    nonceStr: res.noncestr,
    signature: res.signature,
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone'
    ]
  });
  wx.ready(() => {
    const wxData = {
      imgUrl: 'http://z.dtcj.com/pinganDr_beta6/assets/image/share_icon.jpg',
      link: link,
      desc: desc,
      title: title
    }
    wx.onMenuShareTimeline(wxData);
    wx.onMenuShareAppMessage(wxData);
    wx.onMenuShareQQ(wxData);
    wx.onMenuShareWeibo(wxData);
    wx.onMenuShareQZone(wxData);

  });

}).catch(err => {
  console.log(err)
})


function requestSign(url) {
  var url = url || encodeURIComponent(location.href.split('#')[0]);
  var xhr = createCORSRequest('GET', `https://www.dtcj.com/wechat/signature?url=${url}`);
  if (!xhr) {
    throw new Error('CORS not supported');
  }
  ;

  return new Promise((resolve, reject) => {
    xhr.onload = function () {
      var responseText = xhr.responseText;
      resolve(JSON.parse(responseText));
    };
    xhr.onerror = function (error) {
      reject(error);
    };
    xhr.send();
  })
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;
}
