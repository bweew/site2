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

// modal

// Get the modal
const modal = document.getElementById('uploadModal');

// Get the <span> element that closes the modal
const closeBtn = modal.querySelector('.close');

// Get the form and add submit event listener
const uploadForm = document.getElementById('uploadForm');
uploadForm.addEventListener('submit', function(event) {
  event.preventDefault();
  submitForm();
});

// Function to show the modal
document.getElementById('title').addEventListener('click', function() {
  modal.style.display = 'block';
});

// Function to close the modal when close button is clicked
closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

// Function to handle form submission
function submitForm() {
  // Get the file inputs
  const fileInputs = Array.from(document.querySelectorAll('input[type="file"]'));

  // Iterate over file inputs
  fileInputs.forEach((input, index) => {
    const file = input.files[0];
    if (file) {
      // Handle file upload, replace corresponding sample
      handleFileUpload(file, index + 1); // Index + 1 to match sample numbers (1 to 16)
    }
  });

  // Close the modal
  modal.style.display = 'none';
}

// Function to handle file upload
function handleFileUpload(file, sampleNumber) {
  // Load the uploaded audio file
  const reader = new FileReader();
  reader.onload = function(event) {
    // Use the loaded audio data
    const data = event.target.result;
    // Replace the corresponding sample
    const key = Object.keys(keySounds).find(key => keySounds[key] === `samples/${sampleNumber - 1}.wav`);
    if (key) {
      audioContext.decodeAudioData(data, function(buffer) {
        soundBuffers[key] = buffer; // Replace with the new buffer
        updatePadText(key, file.name); // Update pad text with filename
      });
    }
  };
  reader.readAsArrayBuffer(file);
}

// Function to update pad text
function updatePadText(key, fileName) {
  const pad = document.querySelector(`.pad[data-key="${key}"]`);
  if (pad) {
    // Extract filename without extension
    const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
    pad.textContent = fileNameWithoutExtension;
  }
}
