// explanation.js

// Wait for the document to be ready
$(document).ready(function() {
  // Select the explanation div
  var explanationDiv = $("#explanation");

  // Check if the explanation div exists
  if (explanationDiv.length > 0) {
    // Add content to the explanation div
    explanationDiv.html(`
      <h2>spreadsheet to links</h2>
      <p>inputing the url and title for links inside google forms also using shortcuts app and webhooks with integromat to send the data. then using app script that checks if the csv exists, if it doesnt then creates it. making sure to strip any commas replacing them with tabs. Installed google drive on my mac to sync the csv with my git repo, made a shortcut that checks if the modified date is less than a minute then runs a script to overwrite the csv in my git repo with the changes before pushing them. </p>
	  <p>Tried using folder actions to auto update the csv but I think some mac security thing isn't letting it run properly because it would only work when I manually set it off. I could've just copy pasted the links into working copy but I was really set on figuring out some kind of ci/cd hacky work around</p>
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
