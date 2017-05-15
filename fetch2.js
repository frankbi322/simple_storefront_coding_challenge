const body = document.querySelector('#body');
const list = document.querySelector('#list');

fetch("http://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js")
.then(response => response.json())
.then(function(data) {
  // console.log(data.products);
  const products = data.products;

  products.forEach( product => {
    const productItem = document.createElement('li');
    productItem.innerHTML = createProduct(product);
    list.appendChild(productItem);
    // console.log(productItem);
  })
})

const stringCents = (cents) => //helper method to convert given 'msrpInCents' to proper format
{
    return cents > 9 ? "" + cents: "0" + cents;
};

function createProduct (product) {
  const dollars = Math.floor(product.msrpInCents / 100);
  const cents = product.msrpInCents % 100;
  const price = "$" + dollars + "." + stringCents(cents);

  return `
  <li>
    <div class="horizontalContainer">
      <img src="http:${product.mainImage.ref}"></img>
      <div class="verticalContainer">
        <h2>${product.name}</h2>
        <h3>Price: ${price}</h3>
      </div>
    </div>
  </li>
  `
}

const sort = (products) => {
  const sortOption = document.getElementById('sortOptions').value;
  switch (sortOption) {
    case "Alphabetically":
      return products.sort((a,b) => a.name < b.name ? -1 : 1);
    case "Price: High to Low":
      return products.sort((a,b) => a.msrpInCents < b.msrpInCents ? 1 : -1);
    case "Price: Low to High":
            return products.sort((a,b) => a.msrpInCents < b.msrpInCents ? -1 : 1);
    case "Oldest to Newest":
            return products.sort((a,b) => a.createdAt < b.msrpInCents ? 1 : -1);
    case "Newest to Oldest":
            return products.sort((a,b) => a.createdAt < b.msrpInCents ? -1 : 1);
    default:
      break;
  }

};
