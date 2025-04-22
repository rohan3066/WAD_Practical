College Website Assignment
Objective

Create a responsive webpage for a college website using Bootstrap, featuring a top navbar and displaying year-wise toppers' data statistics in cards.

Requirements

Include a title ("Pune Institute of Computer Technology").
Implement a Bootstrap navbar with links: Home, About, Courses, Contact.
Add sections for welcome message, achievements, and year-wise toppers' statistics.
Use Bootstrap cards (col-md-4) to display toppers' details (Name, Department, Percentage, Photo) with a responsive grid layout (col-md-4, col-sm-6, col-12).
Ensure the navbar collapses into a toggle menu on mobile devices.
Include a footer with college address, contact details, and social media links.

Implementation Details
HTML Structure

Use a <nav> with navbar class for the top navigation bar, including a collapsible menu with Bootstrap's navbar-toggler.
Create a <header> for the title with a colored background.
Implement <section> elements for "Welcome to Pune ICT", "Our Achievements", and "Year-Wise Toppers".
Use a row with col classes to create a responsive card layout for toppers' data, each with an image and details.
Add a <footer> with address, contact info, and social media icons.

CSS Styling

Leverage Bootstrap classes like bg-dark, navbar-dark, bg-primary, text-white, py-5, and my-5 for styling and spacing.
Use row-cols-1 row-cols-sm-6 row-cols-md-4 g-4 for a responsive grid that adjusts from 1 column on small screens to 4 on medium/large screens.
Ensure cards maintain equal height (h-100) and center-aligned text with text-center.

JavaScript

Bootstrap's JavaScript (bootstrap.bundle.min.js) handles navbar toggling and responsiveness on mobile devices.

Viva Preparation Questions & Answers

What is the purpose of this webpage?
To showcase the Pune Institute of Computer Technology's details, achievements, and toppers' statistics in a user-friendly, responsive format.


How did you implement the navbar?
Used Bootstrap's navbar with navbar-expand-lg and a navbar-toggler for collapse on mobile, including navigation links.


What is the card layout structure?
Employed Bootstrap card components within a row and col grid (col-md-4, col-sm-6, col-12) for responsive toppers' data display.


Why is responsiveness important?
Ensures the webpage is accessible on all devices, with the navbar collapsing and cards adjusting based on screen size.


How are toppers' photos handled?
Placeholder images (https://via.placeholder.com/150?text=Topper+2022) are used in card-img-top, replaceable with actual photos.


What challenges did you face?
Ensuring consistent card heights and aligning text within cards, addressed using Bootstrap's grid and h-100.


How can this be improved?
Add a search filter for toppers, include a photo upload feature, or integrate a dynamic data fetch with JavaScript.


What technologies were used?
HTML for structure, Bootstrap for CSS and responsive design, and Bootstrap JS for interactive elements.



Testing Considerations

Verify navbar toggle functionality on mobile devices.
Test card grid responsiveness across small, medium, and large screens.
Ensure all text and images display correctly in the footer.

Potential Viva Follow-ups

Explain Bootstrap grid system classes (e.g., col-md-4, row-cols-sm-6).
Discuss how you’d add dynamic data (e.g., using JavaScript to fetch toppers' data), building on past discussions.

s