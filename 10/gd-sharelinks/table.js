// This script will dynamically generate a table of links from a CSV file
$(document).ready(function() {
  // Load CSV file
  $.get('sharelinks.csv', function(csvData) {
    // Parse CSV data
    var rows = csvData.split('\n');
    var tableHTML = '<table>';
    for (var i = 0; i < rows.length; i++) {
      var columns = rows[i].split(',');
      if (columns.length === 2) {
        var url = columns[0].trim();
        var title = columns[1].trim();
        tableHTML += '<tr><td><a href="' + url + '">' + title + '</a></td></tr>';
      }
    }
    tableHTML += '</table>';

    // Append table to container
    $('#tableContainer').html(tableHTML);
  });
});
