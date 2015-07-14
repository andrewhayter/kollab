/* jshint quotmark: false, browser: true, jquery: true, devel: true */
/* globals nx, pattern, synthkeys, toggle1, dial1 */
"use strict";
var Context = window.AudioContext || window.webkitAudioContext;
var audioContext = new Context();

var bpmTempo = 120;

// store sounds for decoded sound buffers

var sounds = {};

// load found file and decode data

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
  pattern.draw();
  pattern.init();

  synthkeys.keypattern = ['w','b','w','b','w','w','b','w','b','w','b','w'];
  synthkeys.resize($("#synth").width(), 250);
  synthkeys.draw();
  synthkeys.init();

  function play(buffer)
  {
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
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

  dial1.on('value', function(data)
  {
    console.log('d1', data);
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

