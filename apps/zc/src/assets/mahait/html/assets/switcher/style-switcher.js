!(function(a) {
  'function' == typeof define && define.amd
    ? define(['jquery'], a)
    : 'object' == typeof exports
    ? a(require('jquery'))
    : a(jQuery);
})(function(a) {
  function c(a) {
    return h.raw ? a : encodeURIComponent(a);
  }

  function d(a) {
    return h.raw ? a : decodeURIComponent(a);
  }

  function e(a) {
    return c(h.json ? JSON.stringify(a) : String(a));
  }

  function f(a) {
    0 === a.indexOf('"') &&
      (a = a
        .slice(1, -1)
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\'));
    try {
      return (
        (a = decodeURIComponent(a.replace(b, ' '))), h.json ? JSON.parse(a) : a
      );
    } catch (c) {}
  }

  function g(b, c) {
    var d = h.raw ? b : f(b);
    return a.isFunction(c) ? c(d) : d;
  }

  var b = /\+/g,
    h = (a.cookie = function(b, f, i) {
      if (arguments.length > 1 && !a.isFunction(f)) {
        if (((i = a.extend({}, h.defaults, i)), 'number' == typeof i.expires)) {
          var j = i.expires,
            k = (i.expires = new Date());
          k.setTime(+k + 864e5 * j);
        }
        return (document.cookie = [
          c(b),
          '=',
          e(f),
          i.expires ? '; expires=' + i.expires.toUTCString() : '',
          i.path ? '; path=' + i.path : '',
          i.domain ? '; domain=' + i.domain : '',
          i.secure ? '; secure' : ''
        ].join(''));
      }
      for (
        var l = b ? void 0 : {},
          m = document.cookie ? document.cookie.split('; ') : [],
          n = 0,
          o = m.length;
        o > n;
        n++
      ) {
        var p = m[n].split('='),
          q = d(p.shift()),
          r = p.join('=');
        if (b && b === q) {
          l = g(r, f);
          break;
        }
        b || void 0 === (r = g(r)) || (l[q] = r);
      }
      return l;
    });
  (h.defaults = {}),
    (a.removeCookie = function(b, c) {
      return void 0 === a.cookie(b)
        ? !1
        : (a.cookie(b, '', a.extend({}, c, { expires: -1 })), !a.cookie(b));
    });
});

/* Style Switcher */
jQuery(document).ready(function($) {
  (style_switcher = $('.style-switcher')),
    (panelWidth = style_switcher.outerWidth(true));

  $('.style-switcher .trigger').on('click', function() {
    var $this = $(this);
    if ($('.style-switcher.closed').length > 0) {
      style_switcher.animate({ left: '0px' });
      $('.style-switcher.closed').removeClass('closed');
      $('.style-switcher').addClass('opened');
      $('.style-switcher .trigger i')
        .removeClass('fa fa-cog')
        .addClass('fa fa-times');
    } else {
      $('.style-switcher.opened').removeClass('opened');
      $('.style-switcher').addClass('closed');
      $('.style-switcher .trigger i')
        .removeClass('fa fa-times')
        .addClass('fa fa-cog');
      style_switcher.animate({ left: '-' + panelWidth });
    }
    return false;
  });

  // Style Change
  var link = $('link[data-style="styles"]');
  // Resume Last Chosen Style
  var stylesheet = $.cookie('stylesheet');
  $('.style-switcher .selected').removeClass('selected');
  if (!$.cookie('stylesheet')) {
    $.cookie('stylesheet', 'red', 365);
    stylesheet = $.cookie('stylesheet');
    $(
      '.style-switcher .styleChange li[data-style="' + stylesheet + '"]'
    ).addClass('selected');
  } else {
    link.attr('href', 'assets/switcher/styles/' + stylesheet + '.css');
    $(
      '.style-switcher .styleChange li[data-style="' + stylesheet + '"]'
    ).addClass('selected');
    if ($('.header-page-dark').length > 0) {
      document.getElementById('logo').src =
        'assets/switcher/logos/logo_' + stylesheet + '.png';
    } else {
      document.getElementById('logo').src =
        'assets/switcher/logos/logo_' + stylesheet + '.png';
      document.getElementById('favicon').href =
        'assets/switcher/logos/favicon_' + stylesheet + '.png';
      document.getElementById('responsive').href =
        'assets/switcher/styles/responsive_' + stylesheet + '.css';
    }
  }
  // Switch Colors
  $('.style-switcher .styleChange li').on('click', function() {
    location.reload();
    var $this = $(this);
    var stylesheet = $this.data('style');
    $(window).on('load', function() {
      $('.style-switcher .styleChange .selected').removeClass('selected');
      $this.addClass('selected');
      link.attr('href', 'assets/switcher/styles/' + stylesheet + '.css');
      if ($('.header-page-dark').length > 0) {
        document.getElementById('logo').src =
          'assets/switcher/logos/logo_' + stylesheet + '.png';
      } else {
        document.getElementById('logo').src =
          'assets/switcher/logos/logo_' + stylesheet + '.png';
        document.getElementById('favicon').href =
          'assets/switcher/logos/favicon_' + stylesheet + '.png';
        document.getElementById('responsive').href =
          'assets/switcher/styles/responsive_' + stylesheet + '.css';
      }
    });
    $.cookie('stylesheet', stylesheet, 365);
  });
  // Reset All
  $('.style-switcher .resetAll li').on('click', function() {
    // Stylesheet
    $.cookie('stylesheet', 'red', 365);
    var stylesheet = $.cookie('stylesheet');
    $('.style-switcher .styleChange li.selected').removeClass('selected');
    $(
      '.style-switcher .styleChange li[data-style="' + stylesheet + '"]'
    ).addClass('selected');
    link.attr('href', 'assets/switcher/styles/' + stylesheet + '.css');
    document.getElementById('logo').src =
      'assets/switcher/logos/logo_' + stylesheet + '.png';
    document.getElementById('favicon').href =
      'assets/switcher/logos/favicon_' + stylesheet + '.png';
    document.getElementById('responsive').href =
      'assets/switcher/styles/responsive_' + stylesheet + '.css';
  });
});
