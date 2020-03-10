'use strict';
(function () {
  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  var wizardElement = document.querySelector('.setup-wizard');
  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');

  wizardCoatElement.addEventListener('click', function () {
    var newColor = window.random(window.WIZARD_COAT_COLORS);
    this.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });

  wizardEyesElement.addEventListener('click', function () {
    var newColor = window.random(window.WIZARD_EYES_COLORS);
    this.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });

  window.wizard = wizard;
})();
