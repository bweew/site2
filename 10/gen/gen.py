import csv
import requests
from bs4 import BeautifulSoup

# Read links from CSV
links = []
with open('input.csv', 'r') as csvfile:
    csvreader = csv.reader(csvfile)
    for row in csvreader:
        links.append(row[0])

# Fetch titles using Beautiful Soup and Requests
titles = []
for link in links:
    response = requests.get(link)
    soup = BeautifulSoup(response.content, 'html.parser')
    title_tag = soup.find('title')
    title = title_tag.string if title_tag else 'Title Not Found'
    titles.append(title)

# Generate the output HTML
output_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Link Selection</title>
<link rel="stylesheet" type="text/css" href="style.css"> <!-- Link to your style.css file -->
<style>
  /* Additional link styles for selected link */
  .selected-link {{
    text-transform: uppercase;
    background-color: #2a2e33; /* Darker background for selected link */
    color: #d0d5dc;
  }}
</style>
</head>
<body>
'''

for link, title in zip(links, titles):
    output_html += f"  <div><a href='{link}'>{title} - YouTube</a></div>\n"

output_html += '''<script>
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
</script>
</body>
</html>
'''

# Write the output HTML to the file
with open('output.html', 'w') as htmlfile:
    htmlfile.write(output_html)

print("output.html generated successfully!")
