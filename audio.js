navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source;
var stream;
var resSetting = 128;
var drawVisual;

var analyser = audioCtx.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;

var distortion = audioCtx.createWaveShaper();
var biquadFilter = audioCtx.createBiquadFilter();
var convolver = audioCtx.createConvolver();
var gainNode = audioCtx.createGain();

//main block for doing the audio recording
if (navigator.getUserMedia) {
    //console.log('getUserMedia supported.');
    navigator.getUserMedia(
       // constraints - only audio needed for this app
       {
           audio: true
       },

       // Success callback
       function (stream) {
           source = audioCtx.createMediaStreamSource(stream);
           source.connect(analyser);
           analyser.connect(distortion);
           distortion.connect(biquadFilter);
           biquadFilter.connect(convolver);
           convolver.connect(gainNode);
           gainNode.connect(audioCtx.destination);

           //visualize();
       },

       // Error callback
       function (err) {
           console.log('The following gUM error occured: ' + err);
       }
    );
} else {
    console.log('getUserMedia not supported on your browser!');
}

let freqHeights = [];
let avrgVolume = 0;

function visualize() {

    avrgVolume = 0;

    analyser.fftSize = resSetting;
    var bufferLength = analyser.fftSize;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);
    
    for (var i = 0; i < bufferLength; i++) {

        freqHeights[i] = pow(dataArray[i], 2) * 0.01;//Approx. Range: 163-300
        avrgVolume += freqHeights[i];

    }

    avrgVolume / freqHeights.length;
}

//setInterval( visualize, 17);