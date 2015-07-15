/* jshint quotmark: false, browser: true, jquery: true, devel: true */
/* globals nx, pattern, toggle1, amp */
"use strict";
var Context = window.AudioContext || window.webkitAudioContext;
var audioContext = new Context();

var ampValue = 0.7;

var bpmTempo = 240;
var sounds = {};

function loadSound(name, done)
{
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

// Nexus UI Stuff

function soundsLoaded()
{
  nx.sendsTo("js");
  nx.colorize("#60B3C8");

  pattern.col = 16;
  pattern.row = Object.keys(sounds).length;
  pattern.resize($("#content").width(), 250);
  pattern.init();
  pattern.draw();
  pattern.jumpToCol(-1);

  amp.val.value = 0.7;
  amp.init();

  function play(buffer)
  {
    var source = audioContext.createBufferSource();
    var masterVolume = audioContext.createGain();
    var compressor = audioContext.createDynamicsCompressor();
    compressor.threshold.value = -50;
    compressor.knee.value = 40;
    compressor.ratio.value = 12;
    compressor.reduction.value = -20;
    compressor.attack.value = 0;
    compressor.release.value = 0.25;
    source.buffer = buffer;
    source.connect(masterVolume);
    masterVolume.gain.value = ampValue;
    masterVolume.connect(audioContext.destination);
    compressor.connect(audioContext.destination);
    source.start(); // start step seq
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
      play(sound);
    });
  }
  else
  {
    //Click event
  }
});

  toggle1.on('*', function(data)
  {
    if (data.value == 1) {
      pattern.sequence(bpmTempo);
    } else {
      pattern.stop();
    }
  });

  amp.on('value', function(data) {
    ampValue = data;
  });5
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
