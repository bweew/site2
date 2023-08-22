import pandas as pd
from jinja2 import Template

# Load CSV data using pandas
csv_file = "youtube_links.csv"
df = pd.read_csv(
    csv_file, header=None
)  # Specify header=None to indicate there are no headers

# Convert DataFrame to list of dictionaries
videos = []
for index, row in df.iterrows():
    videos.append({"title": row[0], "link": row[1]})

# Load the HTML template with proper encoding
template_file_path = "template.html"
template_encoding = "utf-8"  # Specify the correct encoding of your template file
with open(template_file_path, "r", encoding=template_encoding) as template_file:
    template_content = template_file.read()
    template = Template(template_content)

# Render the HTML using the template and data
html_output = template.render(videos=videos)

# Write the HTML output to a file
output_file_path = "output.html"
with open(output_file_path, "w", encoding=template_encoding) as output_file:
    output_file.write(html_output)
	
