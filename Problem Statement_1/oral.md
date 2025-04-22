Product Catalog Webpage Assignment
Objective

Develop a responsive product catalog webpage using HTML, CSS, and JavaScript.
Display products in a table format with images and implement pagination if the product count exceeds 10.

Requirements

Use a table to display columns: Product Image, Product Name, Price (INR ₹), and Description.
Ensure the webpage is responsive across different screen sizes.
Implement pagination with "Previous" and "Next" buttons, showing the current page (e.g., "Page 1 of 2").
Handle a sample dataset with at least the provided products (Wireless Headphones, Smartwatch, Gaming Mouse, Laptop Stand).

Implementation Details
HTML Structure

A <table> with <thead> for headers and <tbody> for dynamic product data.
A <div> for pagination controls with buttons and page info.

CSS Styling

Use width: 100% and border-collapse: collapse for the table.
Add responsiveness with @media query for screens ≤ 600px, enabling horizontal scroll.
Style images with max-width: 100px and buttons with a clean, disabled state.

JavaScript Logic

Define a products array with objects containing id, name, price, description, and image (using placeholder URLs).
Set itemsPerPage to 10 and track currentPage.
Use slice() to paginate data and createElement() to dynamically build table rows.
Update pagination controls based on total pages and current page.

Sample Data

Wireless Headphones: ₹7,999, "Noise-cancelling over-ear headphones," image placeholder.
Smartwatch: ₹12,999, "Fitness tracking smartwatch," image placeholder.
Gaming Mouse: ₹2,499, "Ergonomic gaming mouse," image placeholder.
Laptop Stand: ₹1,999, "Adjustable aluminum stand," image placeholder.

Pagination Logic

Calculate totalPages using Math.ceil(products.length / itemsPerPage).
Disable "Previous" on page 1 and "Next" on the last page.
Update page info dynamically (e.g., "Page 1 of 2").

Responsiveness

Tables scroll horizontally on small screens.
Consistent styling ensures readability across devices.

Viva Preparation Questions & Answers

What is the purpose of this assignment?
To create a responsive webpage that displays a product catalog in a table with pagination for scalability, using modern web technologies.


How did you ensure responsiveness?
Used CSS @media query to enable horizontal scrolling on screens ≤ 600px and set flexible widths for table cells.


Explain the pagination implementation.
Pagination limits data to 10 items per page, uses slice() to extract the current page’s data, and updates buttons based on currentPage and totalPages.


What happens if there are more than 10 products?
The code automatically paginates, showing 10 products per page with functional "Previous" and "Next" buttons.


How are images handled in the table?
Images are stored as URLs in the product data, rendered with <img> tags, and constrained to max-width: 100px for consistency.


What challenges did you face?
Ensuring dynamic data rendering and handling edge cases like an empty product list (though not implemented here, it’s a potential improvement).


How can this be improved?
Add search/filter functionality, use real images instead of placeholders, and implement a loading state for better user experience.


What technologies were used?
HTML for structure, CSS for styling and responsiveness, and JavaScript for dynamic content and pagination.



Testing Considerations

Test with 12+ products to verify pagination.
Check responsiveness on mobile and desktop browsers.
Ensure price and description data display correctly.

Potential Viva Follow-ups

Be ready to explain any specific CSS property or JavaScript method (e.g., slice(), event listeners).
Discuss how you’d extend this to a backend (e.g., fetching data via API).

