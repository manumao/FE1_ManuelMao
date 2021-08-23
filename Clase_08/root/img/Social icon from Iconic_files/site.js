'use strict';


$(document).ready(function () {
});

$(window).load(function () {
});

$(window).resize(function () {
});


// Style hover tool to highlight svg elements
var styleInspector = function() {
  // Hover on li to reveal element
  $('.icon-classes li').on('mouseenter', function() {
    var val = $(this).text();
    $(this).addClass('active');
    $('svg.iconic-main ' + val + ', svg.iconic-main ' + val + ' *').each(function(){
      addClass(this, 'active');
    });
  });

  $('.icon-classes li').on('mouseleave', function() {
    var val = $(this).text();
    $(this).removeClass('active');
    $('svg.iconic-main ' + val + ', svg.iconic-main ' + val + ' *').each(function(){
      removeClass(this, 'active');
    });
  });
};

console.log('Hey, nice to see that you want to take a peek at what makes Iconic tick. We’d do the same exact thing!\n\nSo here’s the deal, you’ll soon see that we haven’t hidden our icons behind anything. No PNGs with little lines through the icons. You’re getting the real deal. That’s because we trust you. So, please, play around with our code, dissect our icons and do all the cool things you can do from the web inspector. We just sincerely ask that you purchase Iconic if you decide to use them.\n\nYou can buy Iconic here: http://useiconic.com/purchase\n\nThanks and happy hacking!')
