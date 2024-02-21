$(document).ready(function() {
  // Generate header navigation links
  var headerNavHTML = `
    <nav id="headerNav">
      <ul>
        <li><a href="#" id="home-link">Home</a></li>
        <li><a href="#" id="projects-link">Projects</a></li>
        <li><a href="#" id="contact-link">Contact</a></li>
        <li><a href="#" id="blog-link">Blog</a></li>
      </ul>
    </nav>
  `;
  $('body').prepend(headerNavHTML);

  // Add click event handlers to header links
  $("#home-link").click(function() {
    // Redirect to the home page
    window.location.href = "https://bweew.github.io/site2/";
  });

  $("#projects-link").click(function() {
    // Redirect to the projects page
    window.location.href = "https://bweew.github.io/sfz-genweb/";
  });

  $("#contact-link").click(function() {
    // Redirect to the contact page
    window.location.href = "https://bweew.github.io/site2/contact.html";
  });

  $("#blog-link").click(function() {
    // Redirect to the about page
    window.location.href = "https://ecksesontress.blogspot.com";
  });
});
