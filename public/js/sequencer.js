/* jshint quotmark: false, browser: true, jquery: true, devel: true */
/* globals nx, pattern, toggle1, amp */
"use strict";
var Context = window.AudioContext || window.webkitAudioContext;
var audioContext = new Context();

var masterVolume = audioContext.createGain();
var compressor = audioContext.createDynamicsCompressor();

var kickGain = audioContext.createGain();
var snareGain = audioContext.createGain();
var hihatGain = audioContext.createGain();

compressor.threshold.value = -50;
compressor.knee.value = 40;
compressor.ratio.value = 12;
compressor.reduction.value = -20;
compressor.attack.value = 0;
compressor.release.value = 0.25;

kickGain.connect(masterVolume);
snareGain.connect(masterVolume);
hihatGain.connect(masterVolume);

masterVolume.connect(compressor);
compressor.connect(audioContext.destination);

var bpmTempo = 240;
var sounds = {};

function loadSound(name, done) {
  var request = new XMLHttpRequest();
  request.open('GET', 'samples/dilla/' + name + '.wav', true);
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

var soundNames = [ 'kick', 'snare', 'hihat' ];

// Nexus UI Stuff

function soundsLoaded() {
  nx.colorize("accent", "#00DDCC");
  nx.colorize("border", "#000000");

  pattern.col = 16;
  pattern.row = Object.keys(sounds).length;
  pattern.resize($("#content").width(), 200);
  pattern.bpm = bpmTempo;
  pattern.init();
  pattern.jumpToCol(-1);

  //master volume socket
  amp.val.value = 0.8;

  amp.on('value', function(gain) {
    socket.emit('master gain', gain);
  });

  socket.on('master gain', function(gain){
    masterVolume.gain.value = gain;
    console.log(gain);
    amp.val.value = gain;
    amp.init();
  });

  amp.init();


  //kick socket
  kickPitch.val.value = 0.5;

  kickPitch.on('value', function(pitch) {
    socket.emit('kick pitch', pitch);
  });

  socket.on('kick pitch', function(pitch){
    kickPitch.val.value = pitch;
    console.log(pitch);
    kickPitch.init();
  });

  kickPitch.init();

  //snare socket
  snarePitch.val.value = 0.5;

  snarePitch.on('value', function(pitch) {
    socket.emit('snare pitch', pitch);
  });

  socket.on('snare pitch', function(pitch){
    snarePitch.val.value = pitch;
    console.log(pitch);
    snarePitch.init();
  });

  snarePitch.init();

  //
  hihatPitch.val.value = 0.5;

  hihatPitch.on('value', function(pitch) {
    socket.emit('hihat pitch', pitch);
  });

  socket.on('hihat pitch', function(pitch){
    hihatPitch.val.value = pitch;
    console.log(pitch);
    hihatPitch.init();
  });

  hihatPitch.init();

  //kick socket
  kickVol.val.value = 0.8;

  kickVol.on('value', function(gain) {
    socket.emit('kick gain', gain);
  });

  socket.on('kick gain', function(gain){
    kickVol.val.value = gain;
    kickVol.init();
    kickGain.gain.value = gain;
  });

  kickVol.init();

  //snare socket

  snareVol.val.value = 0.8;

  snareVol.on('value', function(gain) {
    socket.emit('snare gain', gain);
  });

  socket.on('snare gain', function(gain){
    snareVol.val.value = gain;
    snareVol.init();
    snareGain.gain.value = gain;
  });

  snareVol.init();


  //hihat socket
  hihatVol.val.value = 0.8;

  hihatVol.on('value', function(gain) {
    socket.emit('hihat gain', gain);
  });

  socket.on('hihat gain', function(gain){
    hihatVol.val.value = gain;
    hihatVol.init();
    hihatGain.gain.value = gain;
  });

  hihatVol.init();
  

  volumeMeter.setup(audioContext, masterVolume);
  bpm.min = 50;
  bpm.max = 500;
  bpm.decimalPlaces = 0;
  bpm.rate = 2;


  bpm.set({
    value: parseInt(bpmTempo)
  });

  //bpm socket
  bpm.on('value', function(tempo) {
    console.log("initial tempo" + tempo);
    socket.emit('bpm value', tempo);
  });


  socket.on('bpm value', function(tempo) {
    bpmTempo = tempo;
 
    pattern.sequence(bpmTempo);
    bpm.init();
    bpm.draw();

    bpm.set({
      value: parseInt(bpmTempo)
    });
  });


  function play(buffer, kind) {
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = 0.5 + window[kind + "Pitch"].val.value;
    source.connect(window[kind + "Gain"]);
    source.start();
  }


  pattern.on('*', function(data){
    socket.emit('seq play', data);
    console.log("array" + data);
  });


  //data coming through but squares are not being activated on matrix
  socket.on('seq play', function(data){

    console.log(data.list);
    
    pattern.draw();
    var soundNames = Object.keys(sounds);
    if(data.list) {

    //Sequencer event
    data.list.map(function(state, idx) {
      if(!state) { return; }
      // console.log('state' + state);
      var sound = sounds[soundNames[idx]];
      play(sound, soundNames[idx]);
    });
    } else {
      //Click event
    }
  });



  onOff.on('*', function(data) {
    socket.emit('seq run', data);
  });

  socket.on('seq run', function(data){
    if (data.value == 1) {
      pattern.sequence(bpmTempo);      
    } else {
      pattern.stop();    
    }
  })

}


function loadNextSound() {
  var soundName = soundNames.shift();
  if(soundName) {
    loadSound(soundName, loadNextSound);
  } else {
    soundsLoaded();
  }
}

nx.onload = function() {
  loadNextSound();
};
