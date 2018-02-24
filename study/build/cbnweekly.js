/**
 * Created by huangxiquan on 17/3/31.
 */
;(function ($) {
    $.fn.nav = function () {
        var $nav = $(this);
        var $dropToggle = $('.dropToggle',$nav);
        var $dropMenu = $('.dropMenu',$nav);
        $dropToggle.bind('mouseover',function () {
            console.log('mouseover')
            $dropMenu.show()
        }).bind('mouseleave',function () {
            $dropMenu.hide()
        })
    }
})(jQuery);