'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GAP = 10;
var GRAPH_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var TEXT_HEIGHT = 16;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  return Math.max.apply(null, arr);
};

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var getColorForBar = function (name) {
  var h = 240;
  var s = getRandomInt(101);
  var l = getRandomInt(101);

  var hsl = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';

  return (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : hsl;
};

window.renderStatistics = function (ctx, players, times) {
  var maxTime = getMaxElement(times);

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3 + TEXT_HEIGHT);

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP * 4 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT - GAP * 3 - (GRAPH_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = getColorForBar(players[i]);
    ctx.fillRect(CLOUD_X + GAP * 4 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT - GAP * 2 - (GRAPH_HEIGHT * times[i]) / maxTime, BAR_WIDTH, (GRAPH_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = 'black';
    ctx.fillText(players[i], CLOUD_X + GAP * 4 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT);
  }
};
