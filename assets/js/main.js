
!(function($) {
  "use strict";

  // Nav Menu
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if (hash == '#header') {
            $('#header').removeClass('header-top');
            $('#header').removeClass('open-sub');

          $("section").removeClass('section-show');
          return;
        }

        if (!$('#header').hasClass('header-top')) {
            $('#header').addClass('header-top');
            $('#header').addClass('open-sub');
          setTimeout(function() {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');

          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
        }

        $('html, body').animate({
          scrollTop: 0
        }, 350);

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;

      }
    }
  });

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
        $('#header').addClass('header-top');
        $('#header').addClass('open-sub');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      setTimeout(function() {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
      }, 350);
    }
  }

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

    // Skills section
  $(".single_portfolio").click(function (e) {

      var url = $(this).data("href");
      window.open(url, '_self');
  });
  

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Testimonials carousel (uses the Owl Carousel library)
  //$(".testimonials-carousel").owlCarousel({
  //  autoplay: true,
  //  dots: true,
  //  loop: true,
  //  responsive: {
  //    0: {
  //      items: 1
  //    },
  //    768: {
  //      items: 2
  //    },
  //    900: {
  //      items: 3
  //    }
  //  }
  //});

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox({
      'share': false
    }); 
  }); 


})(jQuery);
$(window).on('load', function () {
    $('.portfolio-filter ul li').on('click', function () {
        $('.portfolio-filter ul li').removeClass('active');
        $(this).addClass('active');

        var data = $(this).attr('data-filter');
        $workGrid.isotope({
            filter: data
        });
    });

    if (document.getElementById('portfolio')) {
        var $workGrid = $('.portfolio-grid').isotope({
            itemSelector: '.all',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
    }
});

//$(document).ready(function () {

//    function Particle(x, y, radius) {
//        this.init(x, y, radius);
//    }

//    Particle.prototype = {

//        init: function (x, y, radius) {

//            this.alive = true;

//            this.radius = radius || 10;
//            this.wander = 0.15;
//            this.theta = random(TWO_PI);
//            this.drag = 0.92;
//            this.color = '#fff';

//            this.x = x || 0.0;
//            this.y = y || 0.0;

//            this.vx = 0.0;
//            this.vy = 0.0;
//        },

//        move: function () {

//            this.x += this.vx;
//            this.y += this.vy;

//            this.vx *= this.drag;
//            this.vy *= this.drag;

//            this.theta += random(-0.5, 0.5) * this.wander;
//            this.vx += sin(this.theta) * 0.1;
//            this.vy += cos(this.theta) * 0.1;

//            this.radius *= 0.96;
//            this.alive = this.radius > 0.5;
//        },

//        draw: function (ctx) {

//            ctx.beginPath();
//            ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
//            ctx.fillStyle = this.color;
//            ctx.fill();
//        }
//    };

//    // ----------------------------------------
//    // Example
//    // ----------------------------------------

//    if (!$("#header").hasClass("open-sub")) {
//        var MAX_PARTICLES = 280;
//        var COLOURS = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'];

//        var particles = [];
//        var pool = [];

//        var effect_mouse = Sketch.create({
//            container: document.getElementById('bg_effect')
//        });

//        effect_mouse.setup = function () {

//            // Set off some initial particles.
//            var i, x, y;

//            for (i = 0; i < 20; i++) {
//                x = (effect_mouse.width * 0.5) + random(-100, 100);
//                y = (effect_mouse.height * 0.5) + random(-100, 100);
//                effect_mouse.spawn(x, y);
//            }
//        };

//        effect_mouse.spawn = function (x, y) {

//            if (particles.length >= MAX_PARTICLES)
//                pool.push(particles.shift());

//            particle = pool.length ? pool.pop() : new Particle();
//            particle.init(x, y, random(5, 40));

//            particle.wander = random(0.5, 2.0);
//            particle.color = random(COLOURS);
//            particle.drag = random(0.9, 0.99);

//            theta = random(TWO_PI);
//            force = random(2, 8);

//            particle.vx = sin(theta) * force;
//            particle.vy = cos(theta) * force;

//            particles.push(particle);
//        }

//        effect_mouse.update = function () {

//            var i, particle;

//            for (i = particles.length - 1; i >= 0; i--) {

//                particle = particles[i];

//                if (particle.alive) particle.move();
//                else pool.push(particles.splice(i, 1)[0]);
//            }
//        };

//        effect_mouse.draw = function () {

//            effect_mouse.globalCompositeOperation = 'lighter';

//            for (var i = particles.length - 1; i >= 0; i--) {
//                particles[i].draw(effect_mouse);
//            }
//        };

//        effect_mouse.mousemove = function () {

//            var particle, theta, force, touch, max, i, j, n;

//            for (i = 0, n = effect_mouse.touches.length; i < n; i++) {

//                touch = effect_mouse.touches[i], max = random(1, 4);
//                for (j = 0; j < max; j++) effect_mouse.spawn(touch.x, touch.y);
//            }
//        };
//    }
//});