/**
 * Created by luying on 17/4/12.
 */
  function setGrabMiddle(){
    var grab = $(".middle_grab");
    var width = grab.width();
    var middle = $(".middle");
    var middleWidth = middle.width();
    // console.log(middleWidth+"   _______")
    // console.log(width+" +++  _______")
  grab.css({
    left: middleWidth/2,
    marginLeft: -width/2
    });

  }

  function setHumanOneMiddle(){
    var human = $(".human_one_white");
    var width = human.width();
    var middlePage = $(".middle-page");
    var middlePageWidth = middlePage.width();
    human.css({
      left: middlePageWidth/2,
      // marginLeft: -width/2
    })
  }

