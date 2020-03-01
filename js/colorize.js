'use strict';

(function () {
  window.colorize = function (element, colors, input) {
    element.addEventListener('click', function () {
      var color = window.random(colors);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
      input.value = color;
    });
  };
})();
