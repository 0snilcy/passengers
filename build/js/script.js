$(document).ready(function() {
  console.log('document loaded');

  // Sliders

  var owl = $('.calc__month ul');

  owl.owlCarousel({
    items: 1,
    dots: false,
    nav: true,
    onInitialize: owlShow
  });

  function owlShow() {
    $('.calc__month ul').fadeIn('fast');
  }

  $('.slider').owlCarousel({
    items: 1,
    dots: false,
    nav: true,
    loop: true,
    responsive : {
        0 : {
            center: false,
            autoWidth: false,
            autoHeight: true
        },
        1100 : {
            center: true,
            autoWidth: true
        }
    }
  });


  // Menu

  $('[data-link=calc]').on('click', function(event) {
    event.preventDefault();
    $("html, body").animate({scrollTop: 0}, "slow");
  });

  $('[data-link=about]').on('click', function(event) {
    event.preventDefault();
    $("html, body").animate({scrollTop: ($('.about__title').offset().top - 100)}, "slow");
  });

  $(window).scroll(function(event) {
    if ($(window).scrollTop() > 200) {
      $('.main-header').addClass('main-header--fixed');
    } else {
      $('.main-header').removeClass('main-header--fixed');
    }
  });


  // Calc

  var stars = [
    null,
    'Земли, то есть, остались бы на своей планете',
    'планеты Проксима Центавра',
    'системы двойной звезды Альфа Центавра',
    'звезды Барнарда',
    'двойной системы коричневых карликов Луман 16',
    'планеты-сироты, газового гиганта WISE 0855-0714',
    'звезды Вольф 359',
    'двойной системы Сириуса',
    'тусклого красного карлика Росс 248',
    'оранжевого карлика Эпсилон Эридана',
    'звездной системы Грумбридж 34 А и Б',
    'солнцеподобной звезды Тау Кита',
    'звезды Вольф 1061',
    'красного карлика Глизе 674',
    'красного карлика Глизе 876',
    'красного карлика Глизе 832',
    'звезды Альтаир',
    'оранжевого карлика Сигма Дракона',
    'звездной системы Глизе 570',
    'коричневого карлика LP 944-020',
    'двойной звездной системы Кси Волопаса',
    'оранжевого карлика HIP 85605',
    'звезды Шольца',
    'тройной звездной системы Глизе 667',
    'тройной звездной системы Глизе 105',
    'звезды Фомальгаут',
    'звезды Табит',
    'двойной звездной системы Алула Южная',
    'солнцеподобной звезды Зета Тукана',
    'оранжевого карлика Глизе 785',
    'оранжевого карлика Грумбридж 1830',
    'звезды Гамма Павлина',
    'Звезды 12 Змееносца'
  ];

  var mainText = $('.prime__wrap'),
      resultText = $('.prime__result'),
      pastText = $('.prime__past'),
      moreText = $('.prime__more');

  function showItem(item) {
    mainText.hide();
    resultText.hide();
    moreText.hide();
    pastText.hide();

    item.fadeIn('fast');
  }

  showItem(mainText);


  $('.calc__btn').on('click', function(event) {
    event.preventDefault();

    var year = $('.calc__input[name=year]').val(),
        month = $('.calc__month .active li').attr('data-value') - 1,
        day = $('.calc__input[name=day]').val(),
        now = {},
        user = {};

    var now = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    };

    var user = {
      year: new Date(year, month, day).getFullYear(),
      month: new Date(year, month, day).getMonth() + 1
    };

    var past = new Date() < new Date(year, month, day);

    // if ((now.month - user.month) > 0) {
    //   console.log('Лет: ' + (now.year - user.year));
    //   console.log('Месяцев: ' + (now.month - user.month));
    // } else {
    //   console.log('Лет: ' + (now.year - user.year - 1));
    //   console.log('Месяцев: ' + (12 - user.month + now.month));
    // }


    var years = now.year - user.year,
        count = 0,
        message = {};

    var months = function() {
      if ((now.month - user.month) > 0) {
        return (now.month - user.month);
      } else {
        years--;
        return (12 - user.month + now.month);
      }
    }

    function get(year, month) {
      if (year > 99) {

        $('.calc').hide();
        showItem(moreText);

        $('a.prime__more-btn').on('click', function(event) {
          event.preventDefault();
          showItem(mainText);
          $('.calc').fadeIn('fast');
        });

        if ($(window).width() < 1100) {
          $("html, body").animate({ scrollTop: 200 }, "slow");
        }

      } else if (past) {

        $('.calc').hide();
        showItem(pastText);

        $('a.prime__past-btn').on('click', function(event) {
          event.preventDefault();
          showItem(mainText);
          $('.calc').fadeIn('fast');
        });

        if ($(window).width() < 1100) {
          $("html, body").animate({ scrollTop: 200 }, "slow");
        }

      } else {
         if ((year) % 3) {

          count++;
          get(year - 1, month);

        } else {

          message.year = (year) / 3;

          if (!count) {
            message.month = Math.floor(month / 3);
          } else {
            message.month = Math.floor((count * 12 + month) / 3);
          }

          count = 0;

          function getYearUser() {
            if ((message.year == 1) || (message.year == 21)) {
              return ' год'
            } else if (
                (message.year > 1) && (message.year < 5) ||
                (message.year > 21) && (message.year < 25)
              ){
              return ' года'
            } else if ((message.year > 4) && (message.year < 20)) {
              return ' лет'
            }
          }

          function getMonthUser() {
            if ((message.month == 1)) {
              return ' месяц'
            } else if ((message.month > 1) && (message.month < 5)){
              return ' месяца'
            } else  {
              return ' месяцев'
            }
          }

          $('span.prime__year').html(
            function() {
              if (message.year) {
                return message.year + getYearUser();
              } else {
                $(this).hide();
                $('span.prime__and').hide();
              }
            }
          );

          $('span.prime__month').html(
            function() {
              if (message.month) {
                return message.month + getMonthUser();
              } else {
                $(this).hide();
                $('span.prime__and').hide();
              }
            }
          );

          $('span.prime__place').html(stars[message.year]);
          $('span.prime__add').html(120 - message.year);

          $('.calc').hide();
          showItem(resultText);

          $('.prime').addClass('prime--shipe-' + message.year);

          if ($(window).width() < 1100) {
            $("html, body").animate({ scrollTop: 200 }, "slow");
          }

          return false;
        }
      }


    }

    months();
    get(years, months());



  });

});


// Youtube

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data === 0) {
    $.fancybox.next();
  }
}

function onYouTubePlayerAPIReady() {
  $(document).ready(function() {
    $('.fancybox')
      .attr('rel', 'gallery')
      .fancybox({
        openEffect  : 'none',
        closeEffect : 'none',
        nextEffect  : 'none',
        prevEffect  : 'none',
        padding     : 0,
        margin      : 50,
        beforeShow  : function() {
          var id = $.fancybox.inner.find('iframe').attr('id');
          var player = new YT.Player(id, {
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          });
        }
      });
  });

}
