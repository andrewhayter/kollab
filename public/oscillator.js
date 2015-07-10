
var context = new AudioContext(); // Create audio container
oscillator = context.createOscillator(); // Create bass guitar
gainNode = context.createGain(); // Create boost pedal

oscillator.connect(gainNode); // Connect bass guitar to boost pedal
gainNode.connect(context.destination); // Connect boost pedal to amplifier
gainNode.gain.value = 0.3; // Set boost pedal to 30 percent volume
// oscillator.start(); // Play bass guitar instantly
