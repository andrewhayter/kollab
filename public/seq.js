var Dilla = require('dilla');
var Context = window.AudioContext || window.webkitAudioContext;
var audioContext = new Context();

var bpmTempo = 240;

var dilla = new Dilla(audioContext, {
  'tempo': bpmTempo,
  'beatsPerBar': 4,
  'loopLength': 2
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
  if(soundName) {
    loadSound(soundName, loadNextSound);
  }
}

loadNextSound();

// Sequence rows


dilla.set('snare', [
  ['1.1.91'],
  ['1.3.91'],
  ['2.1.91'],
  ['2.4.03']
  ]);

// dilla.set('hihat', [
//   ['*.1.01', { 'gain': 0.4 }],
//   ['*.2.01', { 'gain': 0.5 }],
//   ['*.3.01', { 'gain': 0.6 }],
//   ['*.4.01', { 'gain': 0.5 }],
//   ['*.4.53', { 'gain': 0.6 }]
//   ]);


dilla.on('step', function onStep(step) {
  source = audioContext.createBufferSource(); // create buffer source
  source.buffer = sounds[step.id]; // set buffer to sound object called from set
  var gainNode = source.gainNode = audioContext.createGain(); // create gainNode
  var gainVolume = step.args.gain || 1; // if gainVolume not set, use 1
  source.connect(gainNode); // output source to gainNode
  gainNode.connect(audioContext.destination); // output gainNode to speakers
  gainNode.gain.value = gainVolume; // set gainNode value to gainVolume
  source.start(step.time); // start step seq
});


// Nexus UI Stuff

nx.onload = function(){
  nx.sendsTo("js")
  nx.colorize("#60B3C8");

  pattern.col = 16;
  pattern.row = 1;
  pattern.resize($("#content").width(), 250);
  pattern.draw();
  pattern.init();

      // seqplay.col = 16;
      // seqplay.row = 1;
      // seqplay.resize($("#content").width(), 250);
      // seqplay.draw();
      // seqplay.init();

      synthkeys.keypattern = ['w','b','w','b','w','w','b','w','b','w','b','w'];
      synthkeys.resize($("#synth").width(), 250);
      synthkeys.draw();
      synthkeys.init();

      pattern.on('*', function(data) {
        // var kickSeq = [];
        // kickSeq.push([data.col]);
        // // console.log(data.value)
        // dilla.set('kick', kickSeq);
        console.log(data)
      });

      toggle1.on('*', function(data) {
        if (data.value == 1) {
          dilla.start();
          pattern.sequence;
        } else {
          pattern.stop();
          dilla.stop();
        }
      });

      dial1.on('value', function(data) {
        console.log('d1', data);
      });
    }
