// mood-tracker.js

// Define an array of moods to choose from
const moods = ['happy','excited','nice','tired','wonderful','sleepy'];

// Wrap the code inside a window.onload event handler
window.onload = function() {
  // Get a random mood from the array
  const randomMood = moods[Math.floor(Math.random() * moods.length)];

  // Get the mood div element from the HTML document
  const moodDiv = document.getElementById('mood');

  // Set the text content of the mood div to the random mood
  moodDiv.textContent = randomMood;
};
