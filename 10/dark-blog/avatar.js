// Create a new JavaScript file, e.g., insertAvatar.js

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get the div element with the id "avatar"
    var avatarDiv = document.getElementById("avatar");
    
    // Create a new anchor element
    var anchorElement = document.createElement("a");
    // Set the href attribute
    anchorElement.href = "https://bweew.github.io/site1/";
    
    // Create a new image element
    var imgElement = document.createElement("img");
    // Set the id, src, and alt attributes
    imgElement.id = "selfie";
    imgElement.src = "swag.png";
    imgElement.alt = "avatar";
    
    // Append the image element to the anchor element
    anchorElement.appendChild(imgElement);
    
    // Append the anchor element to the avatarDiv
    avatarDiv.appendChild(anchorElement);
});
