'use strict';

(function () {
  window.WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  window.WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

  window.random = function (array) {
    var x = Math.floor(Math.random() * Math.floor(array.length));
    return array[x];
  };
})();
