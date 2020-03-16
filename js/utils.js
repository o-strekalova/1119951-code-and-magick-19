'use strict';

(function () {
  window.WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  window.WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  window.URL_FOR_LOAD = 'https://js.dump.academy/code-and-magick/data';

  window.setup = document.querySelector('.setup');
  window.wizardCoat = window.setup.querySelector('.setup-wizard .wizard-coat');
  window.wizardEyes = window.setup.querySelector('.setup-wizard .wizard-eyes');

  window.getRandomColor = function (array) {
    var x = Math.floor(Math.random() * Math.floor(array.length));
    return array[x];
  };

  window.onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
})();
