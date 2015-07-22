/* jshint quotmark: false, browser: true, jquery: true, devel: true */
/* globals nx, pattern, toggle1, amp */
"use strict";

var kickGain = context.createGain();
var snareGain = context.createGain();
var hihatGain = context.createGain();

// var lfo = context.createOscillator();
// lfo.frequency.value = 1;
// lfo.connect(masterVolume.gain);
// lfo.start();


kickGain.connect(masterVolume);
snareGain.connect(masterVolume);
hihatGain.connect(masterVolume);



var bpmTempo = 240;
var sounds = {};

function loadSound(name, done) {
  var request = new XMLHttpRequest();
  request.open('GET', 'samples/dilla/' + name + '.wav', true);
  request.responseType = 'arraybuffer';
  request.onload = function soundWasLoaded() {
    context.decodeAudioData(request.response, function(buffer) {
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
  

  volumeMeter.setup(context, masterVolume);
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
    pattern.bpm = tempo;
    bpm.val.value = tempo;
    bpm.draw();
  });


  function play(buffer, kind)
  {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = 0.5 + window[kind + "Pitch"].val.value;
    source.connect(window[kind + "Gain"]);
    source.start();
  }


  pattern.on('*', function(data)
  {
    if(!data.list)
    {
      socket.emit('pattern', data);
    }
    else
    {
      //Play
      data.list.map(function(state, idx)
      {
        if(!state) { return; }
        var soundNames = Object.keys(sounds);
        var sound = sounds[soundNames[idx]];
        play(sound, soundNames[idx]);
      });
    }
  });

  socket.on('pattern', function(p)
  {
    // pattern.setCell(p.col, p.row, !!p.level); // This calls transmit, causing an infinite loop
    pattern.matrix[p.col][p.row] = p.level;
    pattern.draw();
  });


  //data coming through but squares are not being activated on matrix
  //vasilli suggest making a function that packs everything together then sends the state to avoid latency issues
  //he also suggests sending the state of the matrix first then sending the grouped function to play

  onOff.on('*', function(data) {
    socket.emit('seq run', data);
  });

  socket.on('seq run', function(data)
  {
    onOff.val.value = data.value;
    onOff.draw();
    if (data.value == 1)
    {
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
