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

function loadSound(name, done)
{
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

var soundNames = [
'kick', 'snare', 'hihat'
];

// Nexus UI Stuff

function soundsLoaded()
{
  nx.colorize("accent", "#00DDCC");
  nx.colorize("border", "#000000");

  pattern.col = 16;
  pattern.row = Object.keys(sounds).length;
  pattern.resize($("#content").width(), 200);
  pattern.bpm = bpmTempo;
  pattern.init();
  pattern.jumpToCol(-1);

  amp.val.value = 0.8;
  amp.init();
  amp.on('value', function(gain)
  {
    masterVolume.gain.value = gain;
  });

  kickPitch.val.value = 0.5;
  kickPitch.init();
  snarePitch.val.value = 0.5;
  snarePitch.init();
  hihatPitch.val.value = 0.5;
  hihatPitch.init();

  kickVol.val.value = 0.8;
  kickVol.init();
  kickVol.on('value', function(gain)
  {
    kickGain.gain.value = gain;
  });

  snareVol.val.value = 0.8;
  snareVol.init();
  snareVol.on('value', function(gain)
  {
    snareGain.gain.value = gain;
  });

  hihatVol.val.value = 0.8;
  hihatVol.init();
  hihatVol.on('value', function(gain)
  {
    hihatGain.gain.value = gain;
  });

  volumeMeter.setup(audioContext, masterVolume);
  bpm.min = 50;
  bpm.max = 500;
  bpm.decimalPlaces = 0;
  bpm.rate = 2;

  bpm.set({
    value: parseInt(bpmTempo)
  });
  bpm.on('value', function(tempo) {
    bpmTempo = tempo;
    pattern.sequence(bpmTempo);
  });
  bpm.init();
  bpm.draw();

  function play(buffer, kind)
  {
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = 0.5 + window[kind + "Pitch"].val.value;
    source.connect(window[kind + "Gain"]);
    source.start();
  }

  pattern.on('*', function(data)
  {
    var soundNames = Object.keys(sounds);
    if(data.list)
    {
    //Sequencer event
    data.list.map(function(state, idx)
    {
      if(!state) { return; }
      var sound = sounds[soundNames[idx]];
      play(sound, soundNames[idx]);
    });
  }
  else
  {
    //Click event
  }
});

  onOff.on('*', function(data)
  {
    if (data.value == 1) {
      pattern.sequence(bpmTempo);
    } else {
      pattern.stop();
    }
  });
}

function loadNextSound()
{
  var soundName = soundNames.shift();
  if(soundName) {
    loadSound(soundName, loadNextSound);
  }
  else
  {
    soundsLoaded();
  }
}

nx.onload = function()
{
  loadNextSound();
};
