// explanation.js

// Wait for the document to be ready
$(document).ready(function() {
  // Select the explanation div
  var explanationDiv = $("#explanation");

  // Check if the explanation div exists
  if (explanationDiv.length > 0) {
    // Add content to the explanation div
    explanationDiv.html(`
      <h2>The Separation of Concerns</h2>
      <p>Here in this file, I'm taking things further by making the code more modular. Just a couple of empty divs with some ids, links are from safari reading list.</p>
	  <h3>jquery</h3>
      <ul>
        <li>Dynamically generating tables of links programatically using jQuery</li>
        <li>Header JavaScript is imported instead of written in HTML.</li>
        <li>Basically trying to do React stuff without using React</li>
        <li>Tempted to use Bootstrap for nav but didn't want to import too many libraries for simple stuff</li>
      </ul>
    `);
  }
});
