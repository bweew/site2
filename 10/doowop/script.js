const keySounds = {
  '1': '0',
  '2': '1',
  '3': '2',
  '4': '3',
  'q': '4',
  'w': '5',
  'e': '6',
  'r': '7',
  'a': '8',
  's': '9',
  'd': '10',
  'f': '11',
  'z': '12',
  'x': '13',
  'c': '14',
  'v': '15'
};

// Function to play audio and darken pad
function playAudio(key) {
  const audio = document.querySelector(`audio[data-key="${keySounds[key]}"]`);
  const pad = document.querySelector(`.pad[data-key="${key}"]`);
  if (!audio) return;

  pad.classList.add('playing');
  audio.currentTime = 0;
  audio.play();

  // Darken pad while sound is playing
  pad.classList.add('active');
  audio.addEventListener('ended', function() {
    pad.classList.remove('active');
    pad.classList.remove('playing');
  });
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
