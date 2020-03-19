'use strict';

(function () {
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupTop = window.setup.style.top;
  var setupLeft = window.setup.style.left;
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.setup.querySelector('.setup-close');
  var upload = window.setup.querySelector('.upload');
  var setupInput = window.setup.querySelector('.setup-user-name');
  var coatColorInput = document.getElementById('coat-color');
  var eyesColorInput = document.getElementById('eyes-color');
  var wizardFireball = window.setup.querySelector('.setup-fireball-wrap');
  var fireballColorInput = wizardFireball.querySelector('input');
  var form = document.querySelector('.setup-wizard-form');

  window.wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  var colorize = function (element, colors, input) {
    var color = window.getRandomColor(colors);
    if (element.tagName.toLowerCase() === 'div') {
      element.style.backgroundColor = color;
    } else {
      element.style.fill = color;
    }
    input.value = color;
  };

  var onCoatClick = function () {
    colorize(window.wizardCoat, window.WIZARD_COAT_COLORS, coatColorInput);
    var color = coatColorInput.value;
    window.wizard.onCoatChange(color);
  };

  var onEyesClick = function () {
    colorize(window.wizardEyes, window.WIZARD_EYES_COLORS, eyesColorInput);
    var color = eyesColorInput.value;
    window.wizard.onEyesChange(color);
  };

  var onFireballClick = function () {
    colorize(wizardFireball, WIZARD_FIREBALL_COLORS, fireballColorInput);
  };

  var closePopup = function () {
    window.setup.classList.add('hidden');
    window.setup.style.top = setupTop;
    window.setup.style.left = setupLeft;
    document.removeEventListener('keydown', onPopupEscPress);
    setupClose.removeEventListener('keydown', onCloseEnterPress);
    setupClose.removeEventListener('click', closePopup);
    window.wizardCoat.removeEventListener('click', onCoatClick);
    window.wizardEyes.removeEventListener('click', onEyesClick);
    wizardFireball.removeEventListener('click', onFireballClick);
  };

  var onPopupEscPress = function (evt) {
    if (setupInput !== document.activeElement && evt.keyCode === 27) {
      closePopup();
    }
  };

  var onCloseEnterPress = function (evt) {
    if (evt.keyCode === 13) {
      closePopup();
    }
  };

  var onOpenEnterPress = function (evt) {
    if (evt.keyCode === 13) {
      openPopup();
    }
  };

  var onSubmit = function (evt) {
    evt.preventDefault();
    window.save(new FormData(form), closePopup, window.onError);
    form.removeEventListener('submit', onSubmit);
  };

  var openPopup = function () {
    window.setup.classList.remove('hidden');
    window.wizardCoat.addEventListener('click', onCoatClick);
    window.wizardEyes.addEventListener('click', onEyesClick);
    wizardFireball.addEventListener('click', onFireballClick);

    document.addEventListener('keydown', onPopupEscPress);
    setupClose.addEventListener('click', closePopup);
    setupClose.addEventListener('keydown', onCloseEnterPress);
    form.addEventListener('submit', onSubmit);
  };

  setupOpen.addEventListener('click', openPopup);
  setupOpen.addEventListener('keydown', onOpenEnterPress);

  upload.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      window.setup.style.top = (window.setup.offsetTop - shift.y) + 'px';
      window.setup.style.left = (window.setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          upload.removeEventListener('click', onClickPreventDefault);
        };
        upload.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
