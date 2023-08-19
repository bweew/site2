document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a');
  let selectedIndex = 0;

  // Apply initial selection
  links[selectedIndex].classList.add('selected-link');

  // Handle keyboard events
  document.addEventListener('keydown', function(event) {
    links[selectedIndex].classList.remove('selected-link');

    if (event.key === 'ArrowDown') {
      selectedIndex = Math.min(selectedIndex + 1, links.length - 1);
    } else if (event.key === 'ArrowUp') {
      selectedIndex = Math.max(selectedIndex - 1, 0);
    }

    links[selectedIndex].classList.add('selected-link');

    if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault(); // Prevent scrolling when pressing space
      window.open(links[selectedIndex].href, '_blank');
    }
  });
});
