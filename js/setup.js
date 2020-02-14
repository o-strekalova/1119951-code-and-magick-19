'use strict';

var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIERBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var numberOfWizards = 4;

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var setupInput = setup.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (setupInput !== document.activeElement && evt.keyCode === 27) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    openPopup();
  }
});

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closePopup();
  }
});

var similarListElement = setup.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var getRandomItem = function (array) {
  var x = Math.floor(Math.random() * Math.floor(array.length));
  return array[x];
};

var renderWizard = function () {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = getRandomItem(WIZARD_FIRST_NAMES) + ' ' + getRandomItem(WIZARD_LAST_NAMES);
  wizardElement.querySelector('.wizard-coat').style.fill = getRandomItem(WIZARD_COAT_COLOR);
  wizardElement.querySelector('.wizard-eyes').style.fill = getRandomItem(WIZARD_EYES_COLOR);

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < numberOfWizards; i++) {
  fragment.appendChild(renderWizard());
}
similarListElement.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');


