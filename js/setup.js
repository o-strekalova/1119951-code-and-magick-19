'use strict';

(function () {
  var MAX_SIMILAR_WIZARD_COUNT = 4;

  var setup = document.querySelector('.setup');
  var similarListElement = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var onSuccess = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
      var wizard = window.random(wizards);
      fragment.appendChild(renderWizard(wizard));
    }
    similarListElement.appendChild(fragment);
    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.load(onSuccess, window.onError);
})();
