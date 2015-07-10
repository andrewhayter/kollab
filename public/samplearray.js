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
      new Instrument(ctx, "kick", "samples/kicks/apunch_kik.wav"),
      new Instrument(ctx, "hihat", "samples/hats/at_hats.wav"),
      new Instrument(ctx, "bleep", "samples/fx/bleep.wav")
    ]

    Promise.all(instruments.map(function(i) { return i._promise; }))
    .then(function(kit)
    {
      window.kit = kit;
      console.log(kit);
    })
