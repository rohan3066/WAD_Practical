E-commerce Product Listing Webpage Assignment
Objective

Develop an e-commerce product listing page using Bootstrap, featuring a grid layout with Bootstrap cards for product display and category filters using Bootstrap's dropdown.
Ensure the page is fully responsive for different screen sizes.

Requirements

Include a header with a title ("Mug Store") and a brief description.
Implement category filters using Bootstrap dropdowns (e.g., Target Market, Print Area, Over Print, Product Exterior).
Display products in a grid layout using Bootstrap cards, including product name, brand, price, and size/color details.
Use placeholder images for products.
Ensure responsiveness across various screen sizes.

Implementation Details
HTML Structure

Use a <header> with a dark background and centered text for the title and description.
Implement a <nav> with a navbar containing dropdown menus for filters, utilizing Bootstrap's navbar and dropdown components.
Create a <div> with a row and col structure to display products as Bootstrap card components within a grid layout.
Include a select element for sorting by popularity.
Link Bootstrap CSS and JS from CDN for styling and functionality.

CSS Styling

Leverage Bootstrap's default grid system (row-cols-1 row-cols-md-2 row-cols-lg-3) for a responsive layout that adjusts from 1 column on small screens to 3 on large screens.
Use Bootstrap classes like bg-dark, text-white, py-3, my-4, and g-4 for spacing and styling.
Ensure cards maintain a consistent height (h-100) and include images (card-img-top), titles, and text details.

JavaScript

Bootstrap's JavaScript (bootstrap.bundle.min.js) handles dropdown functionality and navbar toggling for mobile responsiveness.

Viva Preparation Questions & Answers

What is the purpose of this webpage?
To create an e-commerce product listing page for mugs, allowing users to browse products and apply filters, with a responsive design.


How did you implement the grid layout?
Used Bootstrap's row and col classes with row-cols-1 row-cols-md-2 row-cols-lg-3 to create a responsive grid that adapts to screen size.


What are the category filters, and how are they implemented?
Filters (e.g., Target Market) are implemented using Bootstrap's dropdown component within a navbar, with dropdown-item links for selection.


Why is responsiveness important?
Ensures the page is usable on desktops, tablets, and mobiles, with the grid adjusting columns and the navbar collapsing on smaller screens.


How are product details displayed?
Each product is shown in a Bootstrap card with an image, title, brand, price, and additional details like size/color.


What challenges did you face?
Ensuring consistent card heights and aligning filter dropdowns with the layout, addressed using Bootstrap's grid and spacing utilities.


How can this be improved?
Add a search bar, implement dynamic filtering with JavaScript, or include an "Add to Cart" button.


What technologies were used?
HTML for structure, Bootstrap for CSS and responsive design, and Bootstrap JS for interactive elements.



Testing Considerations

Verify that the grid layout adjusts correctly across screen sizes (e.g., mobile, tablet, desktop).
Test dropdown menus and navbar toggling on mobile devices.
Ensure all product cards display images and text properly.

Potential Viva Follow-ups

Explain Bootstrap grid system classes (e.g., row-cols-md-2).
Discuss how you’d add JavaScript for dynamic filtering, building on past discussions.

