;(function ($) {
    $.fn.tab = function (options) {
        var _this = $(this);
        var timber;
        var toggle = false;
        this.each(function () {
            console.log("tab...")
            _this.find('.tabBar>li>a').bind('click',function () {
                console.log("clicks")
                $(this).parent().addClass('current').siblings().removeClass('current')
                var index = $(this).parent().index();
                console.log(index)
                _this.find('.content>div').eq(index).show().siblings().hide();
                if(index === 0) {
                    _this.find('.webMenu').slideDown();
                }
            });
            _this.find('.tabBar>li.one').bind('mouseleave',function () {
                var j = $(this).index();
                if(j === 0) {
                    _this.find('.webMenu').slideUp();
                }
            });

            _this.find('.webMenu>li').bind('click',function () {
                _this.find('.webMenu').slideToggle();
            });

            //轮播图
            var $wheel = $(this).find('.wheel');
            var $prev = $('.prev',$wheel);
            var $next = $('.next',$wheel);
            var $main = $('.wheel-main',$wheel);
            var $navs = $('.wheel-nav>ul>li',$wheel);

            $('li:not(:first)',$main).hide();
            var $pages = $main.find('li');
            console.log("gone...")
            var currentIndex = 0;
            console.log($next)
            $next.bind('click',function () {
                console.log('next click');
                next()
            });

            $pages.bind('mouseover',function () {
                console.log('mouseover')
                stop();
            }).bind('mouseleave',function () {
                start();
            });

            $navs.bind('click',function () {
                var nIndex = $(this).index();
                if(nIndex == currentIndex) {
                    return;
                }
                play(currentIndex,nIndex);
            })

            $prev.bind('click',function () {
                play(currentIndex,(currentIndex + 3) % 4)
            });

            start()


            function next() {
                play(currentIndex,(currentIndex+1) % 4);
            }

            function play(current,next) {
                $pages.eq(current).fadeOut(500);
                $pages.eq(next).fadeIn(1000);
                $navs.eq(next).addClass('nav-selected').siblings().removeClass('nav-selected');
                currentIndex = next;
            }

            function start() {
                if(!toggle) {
                    timber = setInterval(next,3000);
                    toggle = true;
                }
            }

            function stop() {
                if(toggle) {
                    clearInterval(timber);
                    toggle = false;
                }
            }

        });
    }
})(jQuery);