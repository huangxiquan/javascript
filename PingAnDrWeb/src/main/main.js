/**
 * Created by luying on 17/4/11.
 */

var type = nymph;


$(document).ready(function(){
  initShareData("那些女性的小秘密~","青春不要痘，行走江湖靠神功。守护家园，和时间赛跑？一切秘密尽在这里！赶快点击来看看！",encodeURIComponent(location.href.split('#')[0]));
  var grabShrinkAni = "middle_grab_shrink";
  var grabRestoreAni = "middle_grab_restore";
  var grabDownAni = "middle_grab_down";
  var grabUpAni = "middle_grab_up";
  var prospectsUpAni = "prospects_up";
  var moveAnimate = "middle-page-start";
  var fontSizeAni = 'font_size_scale';
  var $slidePage = $('.middle-page');
  var screenWidth = document.body.clientWidth;
  var $grab = $('.middle_grab');
  var $circleButton = $('.circle');
  var $finger = $('.finger');
  var $score = $('.love_gift_in');
  var $conveyorTop = $('.caterpillar_top');
  var isMoving = false;
  var totalLove = 0;
  var currentIndex = 0;
  var $currentProspects;
  var isClick = false;
  var $closeBtn = $('#close_btn')
  var $dialog = $('#dialog');
  var $giftDialog = $('#giftDialog');
  var marquee = $('.marqueeText');
  var $caterpillarTop = $('.caterpillar_top');
  var $caterpillarBottom = $('.caterpillar_bottom');
  var $second = $(".second");
  var fontSize = document.documentElement.style.fontSize;
  var $slideBg = $('.middle_bg');
  var $giftOpen = $('#giftOpen');
  var moving;
  var moves = [];
  var isOver = false;
  const nymph = "nymph";
  const whiteCollar = "whiteCollar";
  const yummyMummy = "yummyMummy";
  const housewife = "housewife";
  var temp = [];
  var $giftMusic = $('#giftMusic')[0];
  // var $bgMusic = $('#bg_music');

  // $('.whole').append('<audio id="bg_music" preload="auto" autoplay loop><source src="../assets/audio/music.mp3"></audio>')
  //
  // $('#bg_music')[0].play();



  var $gift = $('.love_gift_in>li:last>img:first');
  var $loveScore = $('.love_gift_in>li:first>img:first');
  // $gift.addClass('gift_scale');
  // $gift.addClass('gift_shake');
  // $loveScore.addClass('love_scale')
  // $gift.bind('click',function () {
  //   // $gift.addClass('gift_shake');
  //   $gift.bind('webkitAnimationEnd',function () {
  //     console.log('gift open done');
  //     // $gifOpen.show();
  //     $giftOpen.fadeIn(function () {
  //       setTimeout(function () {
  //         window.location.replace('../end/end.html')
  //       },1500)
  //
  //     })
  //   })
  //
  //   $gift.addClass('gift_move');
  //   var $bgMusic = $('#bg_music')[0];
  //   $bgMusic.pause();
  //   $giftMusic.play();
  // })
  // $dialog.hide();
  // console.log($second)
  $second.bind('webkitTransitionEnd',function () {
    // console.log('start')
    moves.push(setTimeout(pageMove,2500))

  })

  $slidePage.find('li:last>.human_one_white').bind('click',function () {
    showDateReport(4);
  })

  $caterpillarTop.bind('webkitAnimationEnd',function () {
    // console.log('end')
    $caterpillarTop.removeClass('caterpillar_top_move')
  });

  $caterpillarBottom.bind('webkitAnimationEnd',function () {
    $caterpillarBottom.removeClass('caterpillar_bottom_move')
  })

  //传送带动画监听
  $slidePage.bind('webkitAnimationEnd',function () {
    // console.log('stop')
    isMoving = false;
    $finger.fadeIn();
  })

  //机器爪动画监听
  $grab.bind("webkitAnimationEnd",function (arg) {
    var aniNmae = arg.originalEvent.animationName;
    // console.log(arg.originalEvent.animationName);
    //机器爪恢复
    // grabRestore();
    if(aniNmae == 'grabShrink') {
      // console.log("scale done:");
      $grab.removeClass(grabShrinkAni)
      grabUp();
    }else if(aniNmae == 'grabRestore') {
      // console.log('remove')
      // isClick = false;
      $grab.removeClass(grabRestoreAni)
      $grab.removeClass(grabDownAni)
      $grab.removeClass(grabUpAni)
      // setTimeout(pageMove,3000)
    }else if(aniNmae == 'grabDown') {
      grabShrink()
    }else if(aniNmae == 'grabUp') {

    }

  })


  //监听点击事件
  // console.log($circleButton)
  $circleButton.bind('click',function () {
    // console.log('click:' + isMoving)
    console.log('click before')
    if(isClick || isMoving) {
      return;
    }
    //停止滚动
    isClick = true;
    stopMove();
    // clearTimeout(moving)
    $finger.fadeOut()
    var leftOffset = $slidePage.position().left;
    if((leftOffset / screenWidth) % 1 != 0) {
        return;
    }

    window.isPrompt = true;
    var index = leftOffset / screenWidth;
    currentIndex = index;
    changeType(index)
    resetData();
    // console.log('click')
    $dialog.show();
    // $giftDialog.attr('open','').show();
    // window.open('../data_report/index.html')

    // // clearInterval(slideAnimate)
    // // console.log('click')

    $currentProspects = $(this).parent();
    //gif动图
    replaceGif();
    // grabDown();
  })

  // 改变参数类型
  function changeType(index) {
    switch (index) {
      case 0:
        type = nymph;
        break
      case 1:
        type = whiteCollar;
        break
      case 2:
        type = yummyMummy;
        break
      case 3:
        type = housewife;
        break
      case 4:
        type = nymph;
        break
    }
  }

  //停止滚动
  function stopMove() {
    marquee.css('animationPlayState','paused');
    marquee.css('webkitAnimationPlayState','paused');
    moves.forEach(function (move) {
      clearTimeout(move)
    })
    moves = [];
  }

  //继续滚动
  function keepMove() {
    isClick = false;
    moves.push(setTimeout(pageMove,2500))
  }

  //报告关闭按钮
  $closeBtn.bind('click',function () {
    $(this).parent().parent().parent().hide();
    if($.inArray(currentIndex,temp) == -1) {
      grabDown()
    }else {
      isMoving = true;
      pageMove();
    }
    marquee.css('animationPlayState','running');
    marquee.css('webkitAnimationPlayState','running');
  });


  function grabRestore() {
    // $grab.removeClass(grabShrinkAni)
    $grab.addClass(grabRestoreAni)
  }

  function grabShrink() {
    $grab.addClass(grabShrinkAni);
  }

  //机器爪向上
  function grabUp() {
    $grab.addClass(grabUpAni);
    $currentProspects.addClass(prospectsUpAni);
    $currentProspects.bind('webkitAnimationEnd',function () {
      // console.log('animate done')
        temp.push(currentIndex)
        if(currentIndex == 0) {
          temp.push(4)
        }else if(currentIndex == 4) {
          temp.push(0)
        }
        //红心加一
        scoreAdd();
        //词云显示
        // console.log($currentProspects.prev().prev())
        $currentProspects.prev().prev().fadeIn(500,'linear',function () {
          //关键词变大变小
          console.log('show done')
          $(this).find('.blue_text').addClass(fontSizeAni)
        });

        $currentProspects.prev().find('img:first').bind('click', function () {
          if(isMoving) {
            return;
          }
          var index = $(this).parent().parent().index();
          window.isPrompt = false;
          showDateReport(index)
        });
        grabRestore()
        keepMove()
    })
  }


  function showDateReport(index) {
    stopMove()
    changeType(index)
    resetData();
    $dialog.show();
  }

  function replaceGif() {
    var $people = $currentProspects.prev().find('img:first');
    var index = $currentProspects.parent().index();
    // console.log(index)
    var gifPath = "";
    switch (index) {
      case 0:
      case 4:
        gifPath = "../assets/image/beautiful_girl.gif"
        break;
      case 1:
        gifPath = "../assets/image/white_collar.gif"
        break;
      case 2:
        gifPath = "../assets/image/rude_mom.gif"
        break;
      case 3:
        gifPath = "../assets/image/housewife.gif"
        break;
    }
    // console.log(gifPath)
    // console.log($people)
    $people.attr('src',gifPath);

    if(currentIndex == 0) {
      $slidePage.children().eq(4).find('.human_prospects').css({display:'none'});
      $slidePage.children().eq(4).find('.human_one_white>img:first').attr('src',"../assets/image/beautiful_girl.gif");
      $slidePage.children().eq(4).find('.human_one_text').show(function () {
        $(this).find('.blue_text').addClass(fontSizeAni)
      })
    }else if(currentIndex == 4) {
      $slidePage.children().eq(0).find('.human_prospects').css({display:'none'});
      $slidePage.children().eq(0).find('.human_one_white>img:first').attr('src',"../assets/image/beautiful_girl.gif");
      $slidePage.children().eq(0).find('.human_one_text').show(function () {
        $(this).find('.blue_text').addClass(fontSizeAni)
      })
    }
  }

  //机器爪向下
  function grabDown() {
    $grab.addClass('middle_grab_down')
  }

  //积分加一
  function scoreAdd() {
    const $loveImg = $score.children().eq(totalLove).find('img:first');
    $loveImg.attr('src','../assets/image/love_red@2x.png');
    $loveImg.addClass('love_scale')
    totalLove ++;
    // $giftDialog.attr('open','').show();
    if(totalLove == 4) {
      //积满红心
      const $giftImg = $score.find('li:last>img:first');
      $giftImg.attr('src','../assets/image/gift_red@2x.png')
      //大礼包
      moves.forEach(function (move) {
        clearTimeout(move)
      })
      moves = [];
      isOver = true;
      $giftImg.addClass('gift_scale');
        // $giftImg.addClass('gift_move');
          // $giftDialog.show();
          // $giftImg.hide()
      // $giftImg.removeClass('gift_shake');
      // $giftImg.addClass('gift_move');

      $giftImg.bind('click',function () {
        $giftImg.removeClass('gift_scale');
        $giftImg.addClass('gift_move');
        var $bgMusic = $('#bg_music')[0];
        console.log(window.flag)
        if(window.flag == 1) {
          $bgMusic.pause();
          $giftMusic.play();
        }
      })

      $giftImg.bind('webkitAnimationEnd',function () {
        $giftOpen.fadeIn(function () {
          setTimeout(function () {
            window.location.replace('../end/end.html')
          },1500)

        })
      })

    }

  }




  //滚动
  function pageMove() {
    if(isClick) {
      return;
    }
    $finger.fadeOut(function () {
      // console.log( $(this).parent().parent().parent().index())
      var flag = $(this).parent().parent().parent().index();
      if(flag != currentIndex) {
        return;
      }
      isMoving = true;
      // console.log('fadeOut')
      var index = $slidePage.position().left / screenWidth;
      // console.log(index)
      // $slideBg.css('animationPlayState','running')
      if(!isClick) {
        $caterpillarTop.addClass('caterpillar_top_move')
        $caterpillarBottom.addClass('caterpillar_bottom_move')
      }
      if(index == 4) {
        $slidePage.css({left : 0});
        $slidePage.removeClass('middle-page-two');
        $slidePage.removeClass('middle-page-three');
        $slidePage.removeClass('middle-page-four');
        index = 0;
      }
      switch (index) {
        case 0:
          // console.log('add one')
          if(!isClick) {
            $slidePage.addClass('middle-page-one')
          }
          break;
        case 1:
          if(!isClick) {
            $slidePage.removeClass('middle-page-one')
            $slidePage.addClass('middle-page-two')
          }
          break;
        case 2:
          if(!isClick) {
            $slidePage.addClass('middle-page-three')
          }
          break;
        case 3:
          if(!isClick) {
            $slidePage.addClass('middle-page-four')
          }
          break;
      }
      if(!isClick) {
        moves.push(setTimeout(pageMove,6000))
      }
    });
  }

  function resetData() {
    document.title = datas[type].title;
    document.getElementById("outer").setAttribute("src", datas[type].out);
    document.getElementById("inner").setAttribute("src", datas[type].inner);
    document.getElementById("data_report_img").setAttribute("src", datas[type].detail);
    if (!window.isPrompt) {
      document.getElementById("scroll_tip_arrow").style.display = 'none';
    }else{
      document.getElementById("scroll_tip_arrow").style.display = 'block';
    }
    $('#data_report_scroll').off('scroll');
    $('#data_report_scroll').scrollTop(0);
    $('#data_report_scroll').on('scroll',function (event) {
      event.stopPropagation();
    })

    setTimeout(function () {
      $('#data_report_scroll').on('scroll',function (event) {
        console.log("do scroll");
        document.getElementById("scroll_tip_arrow").style.display = "none";
        $('#data_report_scroll').off('scroll');
      });
    },500)

  }

});



//
// function autoPlayAudio() {
//   wx.config({
// // 配置信息, 即使不正确也能使用 wx.ready
//     debug: false,
//     appId: '',
//     timestamp: 1,
//     nonceStr: '',
//     signature: '',
//     jsApiList: []
//   });
//   wx.ready(function () {
//     document.getElementById("bg_music").play();
//   });
// }
