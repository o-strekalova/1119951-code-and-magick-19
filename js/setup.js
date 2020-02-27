'use strict';

var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var numberOfWizards = 4;

var setup = document.querySelector('.setup');
var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

var renderWizard = function () {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = window.random(WIZARD_FIRST_NAMES) + ' ' + window.random(WIZARD_LAST_NAMES);
  wizardElement.querySelector('.wizard-coat').style.fill = window.random(window.WIZARD_COAT_COLOR);
  wizardElement.querySelector('.wizard-eyes').style.fill = window.random(window.WIZARD_EYES_COLOR);

  return wizardElement;
};

for (var i = 0; i < numberOfWizards; i++) {
  fragment.appendChild(renderWizard());
}
similarListElement.appendChild(fragment);
setup.querySelector('.setup-similar').classList.remove('hidden');
