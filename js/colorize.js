'use strict';

(function () {
  var getRandomItem = function (array) {
    var x = Math.floor(Math.random() * Math.floor(array.length));
    return array[x];
  };

  window.colorize = function (element, colors, input) {
    element.addEventListener('click', function () {
      var color = getRandomItem(colors);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
      input.value = color;
    });
  };
})();
