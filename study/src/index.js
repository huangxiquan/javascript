$(document).ready(
    function () {
        $('p').click(function (a,b) {
            $(this).hide()
        })

        $('#test1').click(() => $('p').fadeOut())

        $('.test2').click(() => $('p').fadeIn())

        $('#test3').click(() => $('p').css("background-color","red"))

        $('#test4').click(() => $('p').fadeToggle())

        $('#test5').click(() => $('#board').slideToggle())

        $('#test6').click(() => $('#move').animate({
            left:'500px',
            opacity:'0.5',
            width:100,
        }))
    }
)