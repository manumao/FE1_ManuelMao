Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr;
}

function removeClass(e,c) {
  var cls = e.getAttribute('class');
  e.setAttribute('class', cls.replace( new RegExp('(?:^|\\s)'+c+'(?!\\S)') ,''));
}

function addClass(e, c) {
    if (!hasClass(e, c)) {
        e.setAttribute('class', e.getAttribute('class') + ' ' + c);
    }
}

function hasClass(e, c) {
    return new RegExp(' ' + c + ' ').test(' ' + e.getAttribute('class') + ' ');
}


function extractClasses(el, classes) {

  if(!classes) {
    classes = [];
  }
  var children = $(el).children();

  var elClasses = [];
  for(var i = 0; i < children.length; i++) {

    var child = children[i];
    if($(child).css('display') !== 'none') {

      if($(child).attr('class')) {
        elClasses = $(child).attr('class').split(' ');
      }

      $(elClasses).each(function(n, itm) {

          /*
          * TODO: We need a better approach than this in the long run. This'll do for now though.
          */
          if(itm.indexOf('screenshot') === -1 ) {
            classes.push(itm);
          }

      });
      extractClasses(child, classes);
    }
  }
}

function updateCode() {

}


function inspectClasses() {

    //add classes to right
  var iconClasses = [];
  /*
  $('svg.iconic-main *').each(function (index) {

    if( $(this).attr('class') && $(this).attr('display') !== 'none') {

      var elClasses = $(this).attr('class').split(' ');
      $(elClasses).each(function(i, el) {
        iconClasses.push(el);
      });
    }
  });
*/
  $('svg.iconic-main').each(function (index) {
    extractClasses(this, iconClasses);
  });

  //only keep unique classes
  var uniqueNames = [];
  var uniqueNames = iconClasses.unique();
  uniqueNames.sort();


  var elementClasses = []
  var sizeClasses = ['iconic-lg', 'iconic-md', 'iconic-sm']
  var propertyClasses = []
  //sort by type
  $(uniqueNames).each(function(i, el) {
    if(el.indexOf('iconic-property') > -1) {
      propertyClasses.push(el);
    } else if(el !== 'iconic-container' && el !== 'iconic-metadata' && el !== 'iconic-lg' && el !== 'iconic-md' && el !== 'iconic-sm' ) {
      elementClasses.push(el);
    }
  })

  $('.icon-classes-elements').empty();
  $('.icon-classes-properties').empty();
  $('.icon-classes-sizes').empty();

  if(elementClasses.length) {
    $('.icon-classes-elements, .icon-classes-elements-header').show();
    $(elementClasses).each(function(i, cls) {
      $('.icon-classes-elements').append('<li>.' + cls + '</li>');
    })
  } else {
    $('.icon-classes-elements, .icon-classes-elements-header').hide();
  }

  $(propertyClasses).each(function(i, cls) {
    $('.icon-classes-properties').append('<li>.' + cls + '</li>');
  })

  $(sizeClasses).each(function(i, cls) {
    $('.icon-classes-sizes').append('<li>.' + cls + '</li>');
  })

  // Hover list items and highlight active svg elements
  styleInspector();
}

$(document).ready(function () {
  // Menu smooth scroll anchor links except
  $('.icon-meta a[href^="#"]').on('click', function (e) {
    $('html, body').animate({
      scrollTop: $(this.hash).offset().top
    }, 500);
    return false;
  });

  // Add body class if hovering on icon-classes area
  $('.icon-classes').hover(
    function() {
      $('body').addClass('icon-classes-hover');
    }, function() {
      $('body').removeClass('icon-classes-hover');
    }
  );

  // Normalize sizes toggle
  $('.icon-sizes-toggle').on('click', function (e) {
    var widthSm, heightSm, widthMd, heightMd;

    if ($(this).is('#icon-view-size-default')) {
      widthSm = $('.icon-sizes svg.iconic-sm').attr('width') / 8;
      heightSm = $('.icon-sizes svg.iconic-sm').attr('height') / 8;

      widthMd = $('.icon-sizes svg.iconic-md').attr('width') / 4;
      heightMd = $('.icon-sizes svg.iconic-md').attr('height') / 4;

      $('.icon-sizes svg.iconic-sm').css('width', widthSm);
      $('.icon-sizes svg.iconic-sm').css('height', heightSm);

      $('.icon-sizes svg.iconic-md').css('width', widthMd);
      $('.icon-sizes svg.iconic-md').css('height', heightMd);

      $('#icon-view-size-normalize').removeClass('active');
      $(this).toggleClass('active');

    }
    else if ($(this).is('#icon-view-size-normalize')) {
      widthSm = $('.icon-sizes svg.iconic-sm').attr('width');
      heightSm = $('.icon-sizes svg.iconic-sm').attr('height');

      widthMd = $('.icon-sizes svg.iconic-md').attr('width');
      heightMd = $('.icon-sizes svg.iconic-md').attr('height');

      $('.icon-sizes svg.iconic-sm').css('width', widthSm);
      $('.icon-sizes svg.iconic-sm').css('height', heightSm);

      $('.icon-sizes svg.iconic-md').css('width', widthMd);
      $('.icon-sizes svg.iconic-md').css('height', heightMd);

      $('#icon-view-size-default').removeClass('active');
      $(this).toggleClass('active');
    }
  });

  // CSS vs. markup toggle
  $('.icon-code-toggle').on('click', function (e) {
    if ($(this).is('#icon-view-markup') && !$('#icon-view-markup').hasClass('active')) {
      $('#icon-view-css').removeClass('active');
      $(this).toggleClass('active');
      $('.icon-code .icon-markup, .icon-code .icon-classes').toggleClass('active');
      $('.icon-code .icon-classes').removeClass('active');
    }
    else if ($(this).is('#icon-view-css') && !$('#icon-view-css').hasClass('active')) {
      $('#icon-view-markup').removeClass('active');
      $(this).toggleClass('active');
      $('.icon-code .icon-markup, .icon-code .icon-classes').toggleClass('active');
      $('.icon-code .icon-markup').removeClass('active');
    }
  });

  // Font variation code selector
  $('.icon-variations-font .icon-variation').on('click', function(e) {
    $('.icon-variations-font .icon-variation.active').removeClass('active');
    $(this).addClass('active');
    var fontIcon = $(this).find('.iconic');

    var code = '&lt;!-- Default --&gt;\n&lt;span class="iconic" data-glyph="' + fontIcon.attr('data-glyph') + '" title="' + fontIcon.attr('title') + '" aria-hidden="true"&gt;&lt;/span&gt;\n';
    code += '&lt;!-- Bootstrap --&gt;\n&lt;span class="iconic iconic-' + fontIcon.attr('data-glyph') + '" title="' + fontIcon.attr('title') + '" aria-hidden="true"&gt;&lt;/span&gt;\n'
    code += '&lt;!-- Foundation --&gt;\n&lt;span class="fi-' + fontIcon.attr('data-glyph') + '" title="' + fontIcon.attr('title') + '" aria-hidden="true"&gt;&lt;/span&gt;\n'

    $('.icon-variations-font code.language-markup').html(code);
    Prism.highlightElement($('.icon-variations-font code.language-markup')[0]);

  })

  // Variation selection
  var iconic = IconicJS({
    autoInjectDone: function () {
      $('.icon-variation-tab').on('click', function (e) {
        var iconName = $(this).find('.iconic').attr('data-icon');
        var attributes = [];


        var methodName = $(this).closest('.icon-variation-set').data('method-name');
        var attributeName = $(this).closest('.icon-variation-set').data('attribute-name');
        var attributeValue = $(this).attr('data-attribute-value');


        if ($(this).parents('.icon-variation-superset').length != 0) {
            //someone has this class
          $(this).parents('.icon-variation-set').find('.icon-variation-tab.active').removeClass('active');
          $(this).addClass('active');

          $(this).parents('.dropdown').find('.btn > svg.iconic').each(function(index, $icon) {
            if(typeof $icon[methodName] === 'function') $icon[methodName](attributeValue);
          });

          $(this).parents('.icon-variation-superset').find('.icon-variation-set').each(function() {
            var tab = $(this).find('.icon-variation-tab.active');
            attributes.push({key:$(this).data('attribute-name'), value:$(tab).attr('data-attribute-value')})
          })

        } else {
          $('.icon-variation-tab.active').removeClass('active');
          $(this).addClass('active');
          attributes.push({key:attributeName, value:attributeValue})
        }


        if (methodName && attributeValue) {
          $('svg.iconic-main').each(function (index, $icon) {
            if (typeof $icon[methodName] === 'function') $icon[methodName](attributeValue);
          });

          //update classes
          inspectClasses();

          var svgCode = '';
          svgCode = '&lt;img data-src="' + iconName + '.svg" class="iconic iconic-sm"';
          for(var i = 0; i < attributes.length; i++ ) {
            svgCode +=' ' + attributes[i].key + '="' + attributes[i].value + '"';
          }
          svgCode +=' alt="' + iconName + '" /&gt;\n';
          svgCode += '&lt;img data-src="' + iconName + '.svg" class="iconic iconic-md"';
          for(var i = 0; i < attributes.length; i++ ) {
            svgCode +=' ' + attributes[i].key + '="' + attributes[i].value + '"';
          }
          svgCode +=' alt="' + iconName + '" /&gt;\n';
          svgCode += '&lt;img data-src="' + iconName + '.svg" class="iconic iconic-lg"';
          for(var i = 0; i < attributes.length; i++ ) {
            svgCode+=' ' + attributes[i].key + '="' + attributes[i].value + '"';
          }
          svgCode +=' alt="' + iconName + '"&gt;\n';
          //update code
          $('.code-svg code').empty();
          $('.code-svg code').html(svgCode)
          Prism.highlightElement($('.code-svg code')[0]);

          if(!$(this).hasClass('icon-variation-font-ignore')) {
            var fontCodeDefault = '';
            var fontCodeBootstrap = '';
            var fontCodeFoundation = '';
            var fontName = iconName;
            for(var i = 0; i < attributes.length; i++ ) {
              fontName +='-' + attributes[i].value;
            }

            fontCodeDefault += '&lt;span class="iconic iconic-sm" data-glyph="' + fontName + '" title="' + fontName.replace(/-/g, ' ') + '" aria-hidden="true"&gt;&lt;/span&gt;\n';
            fontCodeBootstrap += '&lt;span class="iconic iconic-' + fontName + ' iconic-sm" title="' + fontName.replace(/-/g, ' ') + '" aria-hidden="true"&gt;&lt;/span&gt;\n';
            fontCodeFoundation += '&lt;span class="fi-' + fontName + ' iconic-sm" title="' + fontName.replace(/-/g, ' ') + '" aria-hidden="true"&gt;&lt;/span&gt;\n';

            fontCodeDefault += '&lt;span class="iconic iconic-md" data-glyph="' + fontName + '" title="' + fontName.replace(/-/g, ' ') + '" aria-hidden="true"&gt;&lt;/span&gt;\n';
            fontCodeBootstrap += '&lt;span class="iconic iconic-' + fontName + ' iconic-md" title="' + fontName.replace(/-/g, ' ') + '" aria-hidden="true"&gt;&lt;/span&gt;\n';
            fontCodeFoundation += '&lt;span class="fi-' + fontName + ' iconic-md" title="' + fontName.replace(/-/g, ' ') + '" aria-hidden="true"&gt;&lt;/span&gt;\n';

            fontCodeDefault += '&lt;span class="iconic iconic-lg" data-glyph="' + fontName + '" title="' + fontName.replace(/-/g, ' ') + '" aria-hidden="true"&gt;&lt;/span&gt;\n';
            fontCodeBootstrap += '&lt;span class="iconic iconic-' + fontName + ' iconic-lg" title="' + fontName.replace(/-/g, ' ') + '" aria-hidden="true"&gt;&lt;/span&gt;\n';
            fontCodeFoundation += '&lt;span class="fi-' + fontName + ' iconic-lg" title="' + fontName.replace(/-/g, ' ') + '" aria-hidden="true"&gt;&lt;/span&gt;\n';
            //update code
            $('.code-font code').empty();
            $('.code-font-default code').html(fontCodeDefault)
            $('.code-font-bootstrap code').html(fontCodeBootstrap)
            $('.code-font-foundation code').html(fontCodeFoundation)

            Prism.highlightElement($('.code-font-default code')[0]);
            Prism.highlightElement($('.code-font-bootstrap code')[0]);
            Prism.highlightElement($('.code-font-foundation code')[0]);
          }


        }
      });

      inspectClasses();
    }
  });


});


// // Copy to clipboard
// $(document).ready(function () {
//   var clip = new ZeroClipboard($('.icon-class'), {
//     moviePath: '/js/vendor/ZeroClipboard.swf'
//   });

//   clip.on("load", function (client) {
//     client.on("complete", function (client, args) {
//       var iconName = $(this).text();

//       $('.overlay-copy h3').text(iconName);
//       $('body').addClass('overlay-copy-open');
//       setTimeout(function () {
//         $('body').removeClass('overlay-copy-open');
//       }, 1000);
//     });
//   });

//   clip.on('dataRequested', function (client, args) {
//     var iconName = $(this).text();
//     client.setText(iconName);
//   });

//   $('.overlay-copy').click(function () {
//     $('body').removeClass('overlay-copy-open');
//   });
// });
