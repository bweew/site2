const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const samplesPath = 'samples/';
let numPads = 0; // Number of pads, initially set to 0

// Array to store loaded sample buffers
const sampleBuffers = [];

// Function to load audio sample
async function loadSample(index) {
  try {
    const response = await fetch(`${samplesPath}${index}.wav`);
    if (!response.ok) {
      console.error(`Failed to load sample ${index}.`);
      return null;
    }
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  } catch (error) {
    console.error(`Error loading sample ${index}:`, error);
    return null;
  }
}

// Function to create a pad element
function createPad(index, sampleName) {
  const pad = document.createElement('div');
  pad.classList.add('pad');
  pad.dataset.sampleIndex = index;
  pad.dataset.sampleName = sampleName;
  pad.textContent = sampleName; // Show sample name on the pad
  pad.addEventListener('click', () => {
    togglePad(pad);
  });
  return pad;
}

// Function to toggle pad and play/stop sample
function togglePad(pad) {
  const index = pad.dataset.sampleIndex;
  const sampleName = pad.dataset.sampleName;
  if (pad.classList.contains('active')) {
    pad.classList.remove('active');
    pad.source.stop();
  } else {
    // Stop all other pads before starting this one
    const activePads = document.querySelectorAll('.pad.active');
    activePads.forEach(activePad => {
      activePad.classList.remove('active');
      activePad.source.stop();
    });

    pad.classList.add('active');
    pad.source = audioContext.createBufferSource();
    pad.source.buffer = sampleBuffers[index];
    pad.source.connect(audioContext.destination);
    pad.source.loop = true;
    pad.source.start();
  }
}

// Function to initialize pads
async function initializePads() {
  const padContainer = document.getElementById('padContainer');
  while (true) {
    const sampleBuffer = await loadSample(numPads);
    if (!sampleBuffer) break; // Break if no more samples available
    const pad = createPad(numPads, `Sample ${numPads}`); // Set pad name to sample index for now
    padContainer.appendChild(pad);
    sampleBuffers[numPads] = sampleBuffer;
    numPads++; // Increment the number of pads
  }
}

// Event listener for keyboard input (unchanged)
document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  let index;
  switch (key) {
    // Key mappings...
  }
  
  if (index !== undefined && index >= 0 && index < numPads) {
    event.preventDefault(); // Prevent default behavior of key press
    const pad = document.querySelector(`.pad[data-sample-index="${index}"]`);
    togglePad(pad);
  }
});

// Initialize pads
initializePads();


// Display modal when Looper title is clicked
const looperTitle = document.getElementById('looperTitle');
const modal = document.getElementById('myModal');
const closeModal = document.getElementsByClassName('close')[0];

looperTitle.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Close the modal when the close button is clicked
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close the modal when clicking outside of it
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});

// Handle file input change event
const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', async (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const index = numPads; // Use current number of pads as index for new pad
    await loadSampleFromFile(index, file);
    numPads++; // Increment number of pads
  }
  modal.style.display = 'none'; // Close the modal after selecting files
});

// Function to load sample from file
async function loadSampleFromFile(index, file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    sampleBuffers[index] = audioBuffer;
    const padContainer = document.getElementById('padContainer');
    const newPad = createPad(index, file.name);
    padContainer.appendChild(newPad);
  } catch (error) {
    console.error(`Error loading sample from file:`, error);
  }
}

// Handle clear all button click
const clearAllBtn = document.getElementById('clearAllBtn');

clearAllBtn.addEventListener('click', () => {
  clearAllSamples();
});

// Function to clear all samples
function clearAllSamples() {
  const padContainer = document.getElementById('padContainer');
  padContainer.innerHTML = ''; // Remove all pads
  numPads = 0; // Reset number of pads
  sampleBuffers.length = 0; // Clear sample buffers array
}
