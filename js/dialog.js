'use strict';

(function () {
  var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup');
  var setupTop = setup.style.top;
  var setupLeft = setup.style.left;
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var upload = setup.querySelector('.upload');
  var setupInput = setup.querySelector('.setup-user-name');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var coatColorInput = document.getElementById('coat-color');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var eyesColorInput = document.getElementById('eyes-color');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var fireballColorInput = wizardFireball.querySelector('input');
  var form = document.querySelector('.setup-wizard-form');

  var colorize = function (element, colors, input) {
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

  var onSuccess = function () {
    closePopup();
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    setup.style.top = setupTop;
    setup.style.left = setupLeft;
    document.removeEventListener('keydown', onPopupEscPress);
    setupClose.removeEventListener('keydown', onCloseEnterPress);
    setupClose.removeEventListener('click', closePopup);
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

  var openPopup = function () {
    setup.classList.remove('hidden');
    colorize(wizardCoat, window.WIZARD_COAT_COLOR, coatColorInput);
    colorize(wizardEyes, window.WIZARD_EYES_COLOR, eyesColorInput);
    colorize(wizardFireball, WIZARD_FIREBALL_COLOR, fireballColorInput);

    document.addEventListener('keydown', onPopupEscPress);
    setupClose.addEventListener('click', closePopup);
    setupClose.addEventListener('keydown', onCloseEnterPress);
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.save(new FormData(form), onSuccess, onError);
    });
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
      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
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
