const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const keySounds = {
  '1': 'samples/0.wav',
  '2': 'samples/1.wav',
  '3': 'samples/2.wav',
  '4': 'samples/3.wav',
  'q': 'samples/4.wav',
  'w': 'samples/5.wav',
  'e': 'samples/6.wav',
  'r': 'samples/7.wav',
  'a': 'samples/8.wav',
  's': 'samples/9.wav',
  'd': 'samples/10.wav',
  'f': 'samples/11.wav',
  'z': 'samples/12.wav',
  'x': 'samples/13.wav',
  'c': 'samples/14.wav',
  'v': 'samples/15.wav'
};

// Object to store the currently playing source
let currentSource = null;

// Function to load audio file
function loadAudio(url) {
  return fetch(url)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer));
}

// Load all drum sounds
const soundBuffers = {};
Promise.all(Object.values(keySounds).map(loadAudio))
  .then(audioBuffers => {
    Object.keys(keySounds).forEach((key, index) => {
      soundBuffers[key] = audioBuffers[index];
    });
  });

// Function to play audio and darken pad
function playAudio(key) {
  const buffer = soundBuffers[key];
  if (!buffer) return;

  const pad = document.querySelector(`.pad[data-key="${key}"]`);
  if (!pad) return;

  // Stop the currently playing source if there is one
  if (currentSource) {
    currentSource.stop();
  }

  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();

  // Store the currently playing source
  currentSource = source;

  pad.classList.add('playing');

  // Darken pad while sound is playing
  pad.classList.add('active');

  // Remove playing and active classes after the duration of the audio
  setTimeout(() => {
    pad.classList.remove('playing');
    pad.classList.remove('active');
  }, buffer.duration * 1000);
}

// Event listener for keydown event
document.addEventListener('keydown', function(event) {
  const key = event.key.toLowerCase();
  playAudio(key);
});

// Event listener for click event on pads
const pads = document.querySelectorAll('.pad');
pads.forEach(pad => pad.addEventListener('click', function(event) {
  const key = this.dataset.key;
  playAudio(key);
}));
