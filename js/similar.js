'use strict';

(function () {
  var coatColor = window.wizardCoat.style.fill;
  var eyesColor = window.wizardEyes.style.backgroundColor;
  window.wizards = [];

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var updateWizards = function () {
    var array = window.wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = window.wizards.indexOf(left) - window.wizards.indexOf(right);
      }
      return rankDiff;
    });
    window.render(array);
  };

  window.wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    coatColor = window.wizardCoat.style.fill;
    updateWizards();
  });

  window.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    eyesColor = window.wizardEyes.style.backgroundColor;
    updateWizards();
  });

  var onSuccess = function (data) {
    window.wizards = data;
    updateWizards();
  };

  window.load(window.URL_FOR_LOAD, onSuccess, window.onError);
})();
