    // Get all the headings
        const headings = document.querySelectorAll('.foldable-heading');

        // Add a click event listener to each heading
        headings.forEach(heading => {
            heading.addEventListener('click', () => {
                // Toggle the 'collapsed-paragraph' class for paragraphs within the same section
                const section = heading.parentElement;
                const paragraphs = section.querySelectorAll('.collapsed-paragraph');
                paragraphs.forEach(paragraph => {
                    if (paragraph.style.display === 'none' || paragraph.style.display === '') {
                        paragraph.style.display = 'block';
                    } else {
                        paragraph.style.display = 'none';
                    }
                });
            });
        });