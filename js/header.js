(function($) {
  if(typeof window.ui === 'undefined') {
    var ui = window.ui = {} //변수 ui 선언
  }

  ui.init = (function(_){ //초기 설정
    var getElements = function() {
      _.$html = $('html');
      _.$body = $('body');
      _.$wrap = $('#wrap');
      _.$header = $('#header');
      _.$gnb = $('#gnb');
      _.$main = $('.main');
      _.$footer = $('#footer');
    }
    var getWindowScrl = function() {
      _.winscrlT = $(window).scrollTop();
      _.winscrlL = $(window).scrollLeft();
    }
    return { 
      onLoad : function() {
        getElements();
        getWindowScrl();
        // _.loadmotion.init();
        _.headerACtion();
        _.gnbOpacity();
        _.btnTopACt();
      },
      onSCroll : function() {
       getWindowScrl();
       _.gnbOpacity();
      }
    }
  })(ui);

  ui.headerACtion = function(_) {
    var _ = this;
    _.$gnb.on ({
      'mouseenter' : function() {
        _.$header.addClass('open'); //.마우스가 들어가면 #header.open 상태
      },
      'mouseleave' : function() {
        _.$header.removeClass('open'); //마우스 떠나면 .open 떼기
      }
    });
    _.$gnb.find('ul'>'li').on({
      'mouseenter' : function() {
        $(this).addClass('on').siblings().removeClass('on'); //.on되면 형제는 .on 떨어짐
      },
      'mouseleave' : function() {
        $(this).removeClass('on');
      }
    });
  }

  ui.gnbOpacity = function () {
		if ($('.main').length) {
			$(window).scrollTop() > 150 ? $('#header').addClass('on') : $('#header').removeClass('on');
		} else {
			$(window).scrollTop() > 150 ? $('#header').addClass('sticky') : $('#header').removeClass('sticky');
		}
	};
  
  ui.btnTopACt = function() {
    $('.btn-top').click(function() {
      $('html body').animate({scrollTop : 0}, 1000);
    });
  };

  ui.addOnAction = function(elm, getSib) {
    if (getSib == false) {
      $(elm).on('click', function() {
        $(this).toggleClass('on');
      });
    } else {
      $(elm).on('click', function() {
        $(this).toggleClass('on').siblings(),removeClass('on');
      });
    }
  }

  $(window).on({
    'load' : function() {
      ui.init.onLoad();
    },
    'scroll' : function() {
      ui.init.onSCroll();
    }
  });

})(jQuery);