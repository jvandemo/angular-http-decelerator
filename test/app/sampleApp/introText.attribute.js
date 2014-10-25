angular.module('sampleApp').directive('introText', function(){
  return {
    restrict: 'A',
    link: function (scope, el, attrs) {

      var margin = 10;

      setTimeout(showTip, 2000);

      function showTip() {
        var tip = angular.element("<p style='position: fixed; transition: all .3s; box-shadow: 0 0 0 3px white; display:inline-block; padding: 5px; border-radius: 3px; font-size:14px; background: black; color: white;'>" + attrs.introText + "</p>");
//      tip.css( 'top', el.offset().top + el.height() );
//      tip.css( 'right', el.offset().top + el.height() );
        tip.css( 'top', '-100px');


        angular.element(document.body).append(tip);
        angular.element(window).on('click', function(){
          tip.remove();
        });

        setTimeout(function(){
          if (el[0].style.top) {
            var newTop = parseFloat(el[0].style.top) + el[0].offsetHeight + margin;
            tip.css( 'top', newTop + 'px' );
          } else {
            var newBot = parseFloat(el[0].style.bottom) + el[0].offsetHeight;
            tip.css( 'bottom', newBot + 'px' );
          }

          if (el[0].style.right) {
            var newRight = parseFloat(el[0].style.right);
            tip.css( 'right', newRight + 'px' );
          } else {
            var newLeft = parseFloat(el[0].style.left);
            tip.css( 'left', newLeft + 'px');
          }
        }, 1)

        tip.on('click', function(){
          this.remove();
        });
      }


    }
  };
});