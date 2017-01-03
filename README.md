Storefront Challenge

This project is a coding challenge for a startup.

The prompt was to:

1. The first step was to make an API call to a provided URL below. This was accomplished by making an AJAX call using jQuery.
https://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js
2. Making the call revealed an array of six products, each of which contained a name, image, and price (in cents).
The next step was to create a storefront to display the products with those details.

Bonus features, which I have completed, included:

** Adding a feature to filter products by minimum and maximum prices.
** Adding a sorting selector to sort products by price (high to low and low to high), alphabetically, and by product creation date.
** These features were added in a sidebar. Upon clicking a "Refine Search" button, the browser makes a new AJAX call and re-renders the main body with the updated products list given the filter/sort parameters.
