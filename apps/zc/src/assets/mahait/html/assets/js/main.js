/*============================================
    START TABLE OF CONTENT
==============================================
    1.  Remove # From URL
    2.  On Scroll NavBar Fixed and Back To Top Show
    3.  Back To Top
    4.  Portfolio Section
    5.  Animated Counter
    6.  Progress Bar
    7.  Pie Chart
    8.  Testimonial
    9.  Latest News
    10. Tooltip
    11. Responsive Nav Menu
    12. Wow JS
    13. Page Preloader
==============================================
    END TABLE OF CONTENT
============================================*/
(function($) {
  'use strict';
  $(document).ready(function() {
    /*--------------------------------------------
        1. Remove # From URL
        --------------------------------------------*/
    $('a[href="#"]').on('click', function(e) {
      e.preventDefault();
    });
    /*--------------------------------------------
        2. On Scroll NavBar Fixed and Back To Top Show
        --------------------------------------------*/
    $(window).on('scroll', function() {
      if ($(window).width() > 300) {
        if ($(window).scrollTop() > 300) {
          $('#header').addClass('navbar-fixed-top');
          $('#back-to-top').addClass('reveal');
        } else {
          $('#header').removeClass('navbar-fixed-top');
          $('#back-to-top').removeClass('reveal');
        }
      }
    });
    /*--------------------------------------------
        3. Back To Top
        --------------------------------------------*/
    $('#back-to-top').on('click', function() {
      $('html, body').animate({ scrollTop: 0 }, 1000);
      return false;
    });
    /*--------------------------------------------
        4. Portfolio Section
        --------------------------------------------*/
    $(window).on('load', function() {
      var $container = $('.portfolio-box');
      $container.isotope({
        filter: '*',
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });
      $('.filter a').on('click', function() {
        $('.filter .active').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');
        $('.portfolio-box').isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
          }
        });
        return false;
      });
    });
    /*--------------------------------------------
        5. Animated Counter
        --------------------------------------------*/
    $('.animated-counter').appear(function() {
      $('.animated-number').countTo({
        speed: 4000,
        refreshInterval: 60,
        formatter: function(value, options) {
          return value.toFixed(options.decimals);
        }
      });
    });
    /*--------------------------------------------
        6. Progress Bar
        --------------------------------------------*/
    $('.progress-bar').each(function() {
      var width = $(this).data('percentage');
      $(this).css({ transition: 'width 3s' });
      $(this).appear(function() {
        $(this).css('width', width + '%');
        $(this)
          .find('.count')
          .countTo({
            from: 0,
            to: width,
            speed: 3000,
            refreshInterval: 50
          });
      });
    });
    /*--------------------------------------------
        7. Pie Chart
        --------------------------------------------*/
    $('.progress-chart-feature').appear(function() {
      $('.chart').easyPieChart({
        animate: 2000,
        barColor: '#ed1c24',
        trackColor: '#f6f6f6',
        scaleColor: '',
        lineCap: 'round',
        lineWidth: 10,
        size: 130
      });
    });
    /*--------------------------------------------
        8. Testimonial
        --------------------------------------------*/
    $('.testimonial-carousel').owlCarousel({
      pagination: false,
      navigation: false,
      items: 1,
      itemsDesktop: [1000, 1],
      itemsDesktopSmall: [900, 1],
      itemsTablet: [767, 1],
      slideSpeed: 2500,
      stopOnHover: true,
      autoPlay: true,
      singleItem: false,
      navigationText: [
        '<i class="fa fa-chevron-left"></i>',
        '<i class="fa fa-chevron-right"></i>'
      ]
    });
    /*--------------------------------------------
        9. Latest News
        --------------------------------------------*/
    $('.news-carousel').owlCarousel({
      pagination: true,
      navigation: false,
      items: 3,
      itemsDesktop: [1000, 3],
      itemsDesktopSmall: [900, 3],
      itemsTablet: [767, 2],
      slideSpeed: 2500,
      stopOnHover: true,
      autoPlay: true,
      singleItem: false,
      navigationText: [
        '<i class="fa fa-chevron-left"></i>',
        '<i class="fa fa-chevron-right"></i>'
      ]
    });
    /*--------------------------------------------
        10. Tooltip
        --------------------------------------------*/
    $('[data-toggle="tooltip"]').tooltip();
    /*--------------------------------------------
        11. Responsive Nav Menu
        --------------------------------------------*/
    if ($(window).width() <= 767) {
      $('li.drop').on('click', function(event) {
        $(this)
          .children('.drop-down')
          .toggle('show');
      });
    }
    /*--------------------------------------------
        12. WOW JS
        --------------------------------------------*/
    new WOW().init();
    /*--------------------------------------------
        13. Page Preloader
        --------------------------------------------*/
    $(window).on('load', function() {
      $('#loading').fadeOut(500);
    });
    if (localStorage.ZC_user) {
      var _li = $('<li/>', { class: 'drop user-details', style: 'background-color: #0dabab;', html: "<a href='/#/' style='font-size: 16px;padding-left:8px;padding-right:8px;' class='icon-users'></a>" });
          $('.nav.navbar-nav').append(_li);
          $('.top-phone.mr10:nth-child(2)').hide();
    } else {
      $(this).remove(_li);
      $('.top-phone.mr10:nth-child(2)').show();
    }
  });
})(jQuery);
