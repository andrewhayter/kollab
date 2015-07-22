(function() {
    // var gainNode = context.createGain();
    var biquadFilter = context.createBiquadFilter();

    var now = context.currentTime;

    // gainNode.connect(biquadFilter);
    biquadFilter.connect(masterVolume);

    function wireUpOnChange(id, node, prop, noValue) {
        $(id).on('change', function() {
            if(noValue) {
                node[prop] = this.value;
            } else {
                node[prop].value = this.value;

            };
            this.blur();
        })
        
    };

    // wireUpOnChange('#gain-slider', gainNode, 'gain');
    wireUpOnChange('#bqType', biquadFilter, 'type', true);
    wireUpOnChange('#bq-frequency-slider', biquadFilter, 'frequency');
    wireUpOnChange('#bq-gain-slider', biquadFilter, 'gain');
    wireUpOnChange('#bq-detune-slider', biquadFilter, 'detune');

    var keyboardNotes = {
        65: { noteName: 'a', frequency: 261.6 },
        83: { noteName: 's', frequency: 293.7 },
        68: { noteName: 'd', frequency: 329.6 },
        70: { noteName: 'f', frequency: 349.2 },
        71: { noteName: 'g', frequency: 392 },
        72: { noteName: 'h', frequency: 440 },
        74: { noteName: 'j', frequency: 493.9 },
        75: { noteName: 'k', frequency: 523.3 },
        76: { noteName: 'l', frequency: 587.3 },
        186: { noteName: ';', frequency: 659.3 },
        222: { noteName: '\'', frequency: 698.5 }
    };

    function Key(noteName, frequency) {
        var keyHTML = document.createElement('div');
        var keySound = new Sound(frequency, 'sine');

        keyHTML.className = 'key col-md-1';
        keyHTML.innerHTML = noteName + '<br>';

        return {
            html: keyHTML,
            sound: keySound
        };
    };
    

    function Sound(frequency, type) {
        this.osc = context.createOscillator();
        this.gain = context.createGain();
        this.gain.gain.value = 0;
        this.osc.connect(this.gain);
        this.gain.connect(biquadFilter);
        this.pressed = false;

        if(typeof frequency !== 'undefined') {
            this.osc.frequency.value = frequency;
        }

        this.osc.type = type || 'sine';

        this.osc.start(0);
    };


    Sound.prototype.play = function() {
        console.log(this);
        if(!this.pressed) {
            this.pressed = true;
            // console.log("attack value " + $('#attack').val());
            this.gain.gain.linearRampToValueAtTime(1, now + Number($('#attack').val()));

        }
    };

    Sound.prototype.stop = function() {
        this.pressed = false;
        // console.log("attack value " + $('#attack').val());
        this.gain.gain.linearRampToValueAtTime(0, now + Number($('#attack').val()));

    };

    function keyboard(notes, containerId) {
        var sortedKeys = [];
        var waveFormSelector = document.getElementById('soundType');

        for(var keyCode in notes) {
            var note = notes[keyCode];
            note.key = new Key(note.noteName, note.frequency);
            sortedKeys.push(notes[keyCode]);
        }

        sortedKeys = sortedKeys.sort(function(note1, note2) {
            if (note1.frequency < note2.frequency) return -1;
            if (note1.frequency > note2.frequency) return 1;

            return 0;
        });

        for(var i = 0; i < sortedKeys.length; i++) {
            document.getElementById(containerId).appendChild(sortedKeys[i].key.html);
        }

        var playNote = function(keyHit) {
            var keyCode = keyHit;

            if(typeof keyboardNotes[keyCode] !== 'undefined') {
                keyboardNotes[keyCode].key.sound.play();
                keyboardNotes[keyCode].key.html.className = 'key playing col-md-1';
            }
        };

        var endNote = function(keyHit) {
            var keyCode = keyHit;

            if(typeof keyboardNotes[keyCode] !== 'undefined') {
                keyboardNotes[keyCode].key.sound.stop();

                keyboardNotes[keyCode].key.html.className = 'key col-md-1';
            }
        };

        var setWaveform = function(event) {
            for(var keyCode in notes) {
                notes[keyCode].key.sound.osc.type = this.value;
            }
            this.blur();
        };

        waveFormSelector.addEventListener('change', setWaveform);

        window.addEventListener('keydown' , function(event){
            if (!$('#m').is(':focus')) {
                socket.emit('play note', event.keyCode);
            };
        });

        socket.on('play note', function(event){
            console.log("should play note");
            console.log("play note " + event);
            console.log(event);
            playNote(event);
        });

        window.addEventListener('keyup', function(event){
            socket.emit('end note', event.keyCode);
            console.log(event.keyCode);
            console.log("keydown " + event.keyCode);
        });

        socket.on('end note', function(event){
            // console.log("should end note");
            // console.log("end note " + event);
            // console.log(endNote(event));
            // console.log(event);
            endNote(event);
        });
    };

    window.addEventListener('load', function() {
        keyboard(keyboardNotes, 'keyboard');
    });
})();
