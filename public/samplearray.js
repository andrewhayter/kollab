function Instrument(ctx, name, url)
    {
      this.ctx = ctx;
      this.name = name;
      this.url = url;
      this.sample = null;
      this.buffer = null;

      var self = this;
      this._promise = new Promise(function xhrResolver(resolve, reject)
      {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", self.url, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = function()
        {
          resolve(this.response);
        };

        // TODO: Figure out why this does not fire
        xhr.addEventListener("error", function()
        {
          console.error(arguments, xhr);
        });

        xhr.send();
      })
      .then(function(buffer)
      {
        self.buffer = buffer;
        return new Promise(function audioResolver(resolve, reject)
        {
          ctx.decodeAudioData(buffer, resolve, reject);
        })
      })
      .then(function(audioBuffer)
      {
        self.sample = audioBuffer;
        return self;
      })
      ;
    };

    Instrument.prototype.play = function play()
    {
      this._promise.then(function()
      {
        var source = this.ctx.createBufferSource();
        source.buffer = this.sample;
        source.connect(ctx.destination);
        console.log("Playing %s", this.name)
        return source.start();
      }.bind(this));
    };

    var ctx = new AudioContext();



    var instruments = [
      new Instrument(ctx, "kick", "samples/kick.wav"),
      new Instrument(ctx, "hihat", "samples/hihat.wav"),
      new Instrument(ctx, "snare", "samples/snare.wav"),
      new Instrument(ctx, "shaker", "samples/shaker.wav"),
      new Instrument(ctx, "conga", "samples/conga.wav")
    ]

    Promise.all(instruments.map(function(i) { return i._promise; }))
    .then(function(kit)
    {
      window.kit = kit;
    })

function playRhythm() {
  var startTime = context.currentTime + 0.100;
  var tempo = 80; // BPM
  var eightNoteTime = (60 / tempo) / 2;

  // 2 Bars
  var time = startTime + bar * 8 * eighthNoteTime;
    for (var bar = 0; bar < 2; bar++) {
    // Play the bass (kick) drum on beats 1, 5
    playSound(kick, time);
    playSound(kick, time + 4 * eighthNoteTime);

    // Play the snare drum on beats 3, 7
    playSound(snare, time + 2 * eighthNoteTime);
    playSound(snare, time + 6 * eighthNoteTime);

    // Play the hi-hat every eighthh note.
    for (var i = 0; i < 8; ++i) {
      playSound(hihat, time + i * eighthNoteTime);
    }
  }

}

