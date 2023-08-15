
		// Select all anchor elements on the page
const links = document.querySelectorAll('a');

// Create a CSV string with headers
let csv = 'URL,Title\n';

// Loop through the links and add them to the CSV string
links.forEach(link => {
  const href = link.getAttribute('href').replace(/"/g, '""'); // Handle double quotes
  const title = link.textContent.replace(/"/g, '""'); // Handle double quotes
  csv += `"${href}","${title}"\n`;
});

// Create a Blob containing the CSV data
const blob = new Blob([csv], { type: 'text/csv' });

// Create a URL for the Blob
const blobUrl = URL.createObjectURL(blob);

// Create a link element to prompt user to download the CSV file
const link = document.createElement('a');
link.href = blobUrl;
link.download = 'links_data.csv';
link.textContent = 'Download CSV';

// Append the link to the body
document.body.appendChild(link);
