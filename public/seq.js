var Dilla = require('dilla');
var Context = window.AudioContext || window.webkitAudioContext;
var audioContext = new Context();

var dilla = new Dilla(audioContext, {
  'tempo': 88
});

// store sounds for decoded sound buffers

var sounds = {};

// load found file and decode data

function loadSound(name, done) {
  var request = new XMLHttpRequest();

  request.open('GET', 'dilla/' + name + '.wav', true);
  request.responseType = 'arraybuffer';
  request.onload = function soundWasLoaded() {
    audioContext.decodeAudioData(request.response, function(buffer) {
      sounds[name] = buffer;
      done();
    });
  };
  request.send();
}

// sounds to load into loadNextSound function

var soundNames = [
'kick', 'snare', 'hihat'
];

// get names of sounds to load from soundName Array

function loadNextSound() {
  var soundName = soundNames.shift();

  if(!soundName) return dilla.start();
  loadSound(soundName, loadNextSound);
}

// Sequence rows

dilla.set('kick', [
  ['1.1.01'],
  ['1.1.51', { 'gain': 1.8 }],
  ['1.2.88'],
  ['1.3.75'],
  ['1.4.72', { 'gain': 0.8 }],
  ['2.1.51', { 'gain': 0.7 }],
  ['2.3.51', { 'gain': 1.8 }],
  ['2.3.88']
  ]);

dilla.set('snare', [
  ['1.1.91'],
  ['1.3.91'],
  ['2.1.91'],
  ['2.4.03']
  ]);

dilla.set('hihat', [
  ['*.1.01', { 'gain': 0.4 }],
  ['*.2.01', { 'gain': 0.5 }],
  ['*.3.01', { 'gain': 0.6 }],
  ['*.4.01', { 'gain': 0.5 }],
  ['*.4.53', { 'gain': 0.6 }]
  ]);


dilla.on('step', function onStep(step) {
  source = audioContext.createBufferSource();
  source.buffer = sounds[step.id];
  var gainNode = source.gainNode = audioContext.createGain();
  var gainVolume = step.args.gain || 1;
  source.connect(gainNode);
  gainNode.connect(audioContext.destination);
  gainNode.gain.value = gainVolume;
  source.start(step.time);
});

// dilla.on('step', function onStep(step) {
//   if (step.event === 'start') onStart(step);
//   if (step.event === 'stop') onStop(step);
// });

// function onStart(step) {
//   // Create source and assign the sound buffer
//   var source = audioContext.createBufferSource();
//   source.buffer = sounds[step.id];
//   source.value = step.args.rate || 1;
//   // Setup gain and save a reference to it
//   var gainNode = source.gainNode = audioContext.createGain();
//   var gainVolume = step.args.gain || 1;
//   // Hook up the nodes and start playback
//   source.connect(gainNode);
//   gainNode.connect(source.destination);
//   source.start(step.time);
//   // Save a reference for use in stop step event
//   step.args.source = source;
// }

// function onStop(step) {
//   var source = step.args.source;
//   var gainVolume = step.args.gain || 1;
//   // Small fade out release
//   source.gainNode.gain.setValueAtTime(gainVolume, step.time);
//   source.gainNode.gain.linearRampToValueAtTime(0, step.time + 0.01);
// }

// load sounds until array is empty

//


// Nexus UI Stuff

nx.onload = function(){
  nx.colorize("#60B3C8");

  pattern.col = 16;
  pattern.row = 3;
  pattern.resize($("#content").width(), 250);
  pattern.draw();
  pattern.init();

  seqplay.col = 16;
  seqplay.row = 1;
  seqplay.resize($("#content").width(), 250);
  seqplay.draw();
  seqplay.init();

  synthkeys.keypattern = ['w','b','w','b','w','w','b','w','b','w','b','w'];
  synthkeys.resize($("#synth").width(), 250);
  synthkeys.draw();
  synthkeys.init();

  toggle1.on('*', function(data) {
    if (data.value) {
      loadNextSound();
    } else {
    }
  });

  synthkeys.on('*', function(data) {
    console.log(data);
  });

  dial1.on('value', function(data) {
    console.log('d1', data);
  });
}
