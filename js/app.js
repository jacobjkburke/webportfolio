$(function() {
    $('a[href*=#]').bind('click',function(event) {
        var $anchor=$(this);
        $('html, body').stop().animate( {
            scrollTop:$($anchor.attr('href')).offset().top
        },1600,'easeInOutExpo');
        event.preventDefault();
    });
});

// $(function() {
//     $('a.page-scroll').bind('click',function(event) {
//         var $anchor=$(this);
//         $('html, body').stop().animate( {
//             scrollTop:$($anchor.attr('href')).offset().top
//         },1600,'easeInOutExpo');
//         event.preventDefault();
//     });
// });

// $('body').scrollspy( {
//     target:'.navbar-fixed-top'
// })
// $('.navbar-collapse ul li a').click(function() {
//     $('.navbar-toggle:visible').click();
// });
