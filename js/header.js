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
        _.loadmotion.init()
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

  ui.loadmotion = (function() {
    return {
      init: function() {
        var f = this;
        _.$motion.each(function(idx, obj) {
          obj.t = $(obj).offset().top;
          obj.h = $(obj).outerHeight /2;
          obj.p = obj.t + obj.h;
          obj.e = 'load.lmotion'+idx+' scroll.lmotion'+idx;
          f.scroll(obj);
          $(window).on(obj.e, function() {
            f.scroll(obj);
          });
        });
        scroll : function(obj) {
          if(_.winscrlT + _.winsizeH > obj.p){
            if($(obj).find('> .value').length){
              if(!$(obj).hasClass('n-active')){
                $(obj).find('> .value').YJnumber({
                  delay : 600,
                  speed : 1200,
                  startNum : '0'
                });
              }
            }
            $(obj).addClass('n-active');
            $(window).off(obj.e);
          }
        }
      }
    })(ui);

    ui.tabAction = function(navi, cont){
      var _ = ui;
  
      function action(tab, idx){
        tab.def.$navi.eq(idx).addClass('on').siblings().removeClass('on');
        tab.def.$cont.eq(idx).addClass('on').siblings().removeClass('on');
        tab.def.offsetTop = tab.def.$navi.offset().top;
  
        tab.def.idx = idx;
      }
  
      var tabAction = (function(){
        return {
          def : {
            idx : 0,
            $navi : $(navi).children(),
            $cont : $(cont).children()
          },
          init : function(){
            var _this = this;
  
            _this.def.$navi.on('click', function(){
              action(_this, $(this).index());
            });
  
            return _this;
          },
          setIndex : function(idx){
            action(this, idx);
            $('html, body').animate({scrollTop : this.def.offsetTop-_.$header.outerHeight()}, 300);
          }
        };
      })();
  
      return tabAction.init();
    }

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

  // ui.gnbOpacity = function() {
  //   if ($('.main').length) {
  //     $(window).scrollTop() > 150 ? $('#header').addClass('on') : $('#header').removeClass('on');
  //   } else {
  //     $(window).scrollTop() > 150 ? $('#header').addClass('sticky') : $('#header').removeClass('sticky');
  //   }
  // };

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