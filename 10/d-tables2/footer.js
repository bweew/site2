// footer.js

// Wait for the document to be ready
$(document).ready(function() {
  // Select the footer div
  var footerDiv = $("#footer");

  // Check if the footer div exists
  if (footerDiv.length > 0) {
    // Add content to the footer div
    footerDiv.html(`
      <footer>
        <p>&copy; 2024 Bweew. testing using js for templating, making reusable components.</p>
      </footer>
    `);
  }
});
