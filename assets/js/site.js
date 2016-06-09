
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var gridRows = 32;
var gridColumns = 32;
var gridWidth = Math.floor(canvasWidth / gridRows);
var gridHeight = Math.floor(canvasWidth / gridColumns);

var strokeColor = 'rgb(219, 219, 219)';
var timeEnd = 30;

// draw tiles
function drawTiles() {
    for (var i = 0; i < gridRows; i++) {
        for (var j = 0; j < gridColumns; j++) {
            var x = j * gridWidth;
            var y = i * gridHeight;
            ctx.strokeStyle = strokeColor;
            ctx.strokeRect(x, y, gridWidth, gridHeight);
        }
    }
}

function drawBackground() {
    ctx.rect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'black';
    ctx.fill();
}

// drawBackground();
// drawTiles();


// Initialize the player
window.addEventListener('load', initPlayer, false);

var audio, audioCtx, analyser, audioSource, frequencyBin, audioElement;

var audio = new Audio();
audio.src = 'assets/sounds/Super Mario Bros Official Theme Song.mp3';
audio.controls = true;
audio.loop = true;
audio.autoplay = true;

function initPlayer() {
    audioElement = document.getElementById('audioElement');
    audioElement.appendChild(audio);
    audioCtx =  new (window.AudioContext || window.webkitAudioContext)();
    audioSource = audioCtx.createMediaElementSource(audio);
    analyser = audioCtx.createAnalyser();

    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);

    visualize();
}

function visualize() {
    if (audio.currentTime > timeEnd) {
        audio.pause();
        return;
    }

    window.webkitRequestAnimationFrame(visualize);
    frequencyBin = new Uint8Array(analyser.frequencyBinCount);
    var max = frequencyBin.length - 1;
    analyser.getByteFrequencyData(frequencyBin);

    // set color
    var randI = Math.floor(getRandomIntInclusive(0, max) / gridRows);
    var randJ = Math.floor(getRandomIntInclusive(0, max) / gridColumns);
    var a, b, c;
    try {
        a = frequencyBin[getRandomIntInclusive(0, max)].toString(16);
        b = frequencyBin[getRandomIntInclusive(0, max)].toString(16);
        c = frequencyBin[getRandomIntInclusive(0, max)].toString(16);
    } catch (e) {
        return false;
    }
    var hexString = '#'+a+''+b+''+c;
    ctx.fillStyle = hexString;

    // draw on coordinate
    for (var i = 0; i < gridRows; i++) {
        for (var j = 0; j < gridColumns; j++) {
            var x = randI * gridWidth;
            var y = randJ * gridHeight;
            ctx.fillRect(x, y, gridWidth, gridHeight);
        }
    }

}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
