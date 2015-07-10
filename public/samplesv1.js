    /*
    
  

    Promise.all(Object.keys(samples).map(function(key)
    {
      var sample = samples[key];

      return new Promise(function(resolve, reject)
      {
        
      });
    }))
    .then(function(samples)
    {
      //This merges all objects into one
      return samples.reduce(function(acc, item)
      {
        return $.extend(acc, item);
      });
    })
    .then(function(samples)
    {
      var obj = {};
      $.map(samples, function(buffer, name)
      {
        ctx.decodeAudioData(buffer, function(sample)
        {
          
          obj[name] = play;
        });
      });
      return obj; 
    })
    .then(function allSamplesLoaded(kit)
    {
      console.log(kit);
      window.kit = kit;
    })
    .catch(function(ex)
    {
      console.error(ex);
    })
    ;
 
    */

//

    // var context = new AudioContext(); // Create and Initialize the Audio Context
    // var kick; // Create the Sound 
    // var getSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
    // getSound.open("GET", "samples/kicks/apunch_kik.wav", true); // Path to Audio File
    // getSound.responseType = "arraybuffer"; // Read as Binary Data
    // getSound.onload = function() {
    //   context.decodeAudioData(getSound.response, function(buffer){
    //     kick = buffer; // Decode the Audio Data and Store it in a Variable
    //   });
    // }

    // getSound.send(); //send request and load file

    // // window.addEventListener("keydown",playkick); // Create Event Listener for KeyDown

    // var context2 = new AudioContext(); // Create and Initialize the Audio Context
    // var hat; // Create the Sound 
    // var getSound2 = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
    // getSound2.open("GET", "samples/hats/at_hats.wav", true); // Path to Audio File
    // getSound2.responseType = "arraybuffer"; // Read as Binary Data
    // getSound2.onload = function() {
    //   context2.decodeAudioData(getSound2.response, function(buffer){
    //     hat = buffer; // Decode the Audio Data and Store it in a Variable
    //   });
    // }

    // getSound2.send();


    // function playkick(e){
    //   switch (e) {
    //     case 1:
    //       var playSound = context.createBufferSource(); // Declare a New Sound
    //       playSound.buffer = kick; // Attatch our Audio Data as it's Buffer
    //       playSound.connect(context.destination);  // Link the Sound to the Output
    //       playSound.start(0); // Play the Sound Immediately
    //     break;
    //     case 2:
    //       var playSound = context2.createBufferSource(); // Declare a New Sound
    //       playSound.buffer = hat; // Attatch our Audio Data as it's Buffer
    //       playSound.connect(context2.destination);  // Link the Sound to the Output
    //       playSound.start(0); // Play the Sound Immediately
    //   }
    // };
