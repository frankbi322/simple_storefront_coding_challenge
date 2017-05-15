//todos
//add a header with store name - DONE
//add sidebar for filter/sort options - DONE
//add dummy header nav links
//filtering by min/max price - DONE
//sorting by name, price, date - DONE
//have three rows of products instead of one column?
//put the addheader,sidebar, etc into a domcontentloaded callback - DONE
//change to grid format for water
//change header to solid color, replace background with gradient

var addHeader = () => {
  const body = document.getElementById('body');
  const header = document.createElement('div');
  header.classList.add('verticalContainer');
  header.id = 'header';
  body.appendChild(header);
  const title = document.createElement('h3');
  title.classList.add('title');
  title.innerText = "THE FIJI STORE";
  header.appendChild(title);
  const tagline = document.createElement('h3');
  tagline.classList.add('tagline');
  tagline.innerText = "Because Your Fiji Water is THAT Important";
  header.appendChild(tagline);
};

var setMainBody = () => {
  const body = document.getElementById('body');
  const main = document.createElement('div');
  main.classList.add('horizontalContainer');
  main.id = 'main';
  body.appendChild(main);
};

var addSideBar = () => {
  const main = document.getElementById('main');
  const sidebar = document.createElement('div');
  sidebar.classList.add('verticalContainer');
  sidebar.classList.add('sidebar');
  sidebar.id = "sidebar";
  const sidebartitle = document.createElement('h2');
  sidebartitle.innerText="Refine Search";
  sidebar.appendChild(sidebartitle);

  const priceSpan = document.createElement('span');
  priceSpan.innerText = "Filter By Price";
  sidebar.appendChild(priceSpan);
  const priceFilters = document.createElement('div');
  priceFilters.classList.add('horizontalContainer');

  const minPriceFilter = document.createElement('input');
  minPriceFilter.placeholder = "Min Price";
  minPriceFilter.id = "minPriceFilter";
  priceFilters.appendChild(minPriceFilter);
  sidebar.appendChild(priceFilters);

  const maxPriceFilter = document.createElement('input');
  maxPriceFilter.placeholder = "Max Price";
  maxPriceFilter.id = "maxPriceFilter";
  priceFilters.appendChild(maxPriceFilter);


  const sortSpan = document.createElement('span');
  sortSpan.innerText = "Sort Products";
  sidebar.appendChild(sortSpan);

  const sortOptions = document.createElement('select');
  sortOptions.id = "sortOptions";

  // const defaultOption = document.createElement('option');
  // defaultOption.text = "Sort By";
  // defaultOption.opacity = 1;
  // defaultOption.selected = "selected";
  // sortOptions.add(defaultOption);

  const alpha = document.createElement('option');
  alpha.text = "Alphabetically";
  alpha.selected = "selected";
  sortOptions.add(alpha);

  const priceHiLow = document.createElement('option');
  priceHiLow.text = "Price: High to Low";
  sortOptions.add(priceHiLow);

  const priceLowHi = document.createElement('option');
  priceLowHi.text = "Price: Low to High";
  sortOptions.add(priceLowHi);

  const oldestToNewest = document.createElement('option');
  oldestToNewest.text = "Oldest to Newest";
  sortOptions.add(oldestToNewest);

  const newestToOldest = document.createElement('option');
  newestToOldest.text = "Newest to Oldest";
  sortOptions.add(newestToOldest);

  sidebar.appendChild(sortOptions);

  const submit = document.createElement('button');
  submit.id = "refineSearch";
  submit.innerText = "Refine Search";
  sidebar.appendChild(submit);

  main.appendChild(sidebar);
};

var addMainBody = () => {
  const main = document.getElementById('main');
  const mainBody = document.createElement('ul');
  mainBody.classList.add('verticalContainer');
  mainBody.id = "mainBody";
  main.appendChild(mainBody);
};

var clear = () => {
  const list = document.getElementById('mainBody');
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
};

document.addEventListener("DOMContentLoaded", function(event) {
  addHeader();
  setMainBody();
  addSideBar();
  addMainBody();
  fetch();
  const searchInput = document.getElementById('refineSearch');
  searchInput.addEventListener('click', fetch);
});


const fetch = ()=>{
  clear();
 $.ajax({
  method: 'GET',
  async: false,
  url: 'http://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js',
  contentType: 'application/json; charset=utf-8',
  cache: false,
  crossOrigin: true, //need this to prevent cross origin errors
  dataType: 'json', //return a json object that can be parsed

  success: function(data){

    let meta = $(data);
    let products = meta[0].products;
    console.log(products);
    sort(products);
    products.forEach(product => {
      createListItem(product);
    });
    //products.sort by parameter
  },

  error: function(XMLHttpRequest, textStatus, errorThrown) {
  if (XMLHttpRequest.status == 0) {
    alert(' Check Your Network.');
  } else if (XMLHttpRequest.status == 404) {
    console.log('404 Error');
  } else if (XMLHttpRequest.status == 500) {
    alert('Internel Server Error.');
  }  else {
     alert('Unknow Error.\n' + XMLHttpRequest.responseText);
  }
  }
});
};

const createListItem = (product) => //pulls information from data and creates separate item div for each product
{
  const maxPrice = document.getElementById('maxPriceFilter').value;
  const minPrice = document.getElementById('minPriceFilter').value;
  const body = document.getElementById('mainBody');
  const productItem = document.createElement('li');
  productItem.classList.add('item');
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('imageContainer');
  const detailContainer = document.createElement('div');
  detailContainer.classList.add('itemDetailContainer');
  productItem.appendChild(imageContainer);
  productItem.appendChild(detailContainer);
  const image = document.createElement('img');
  const imageUrl = "http:" + product.mainImage.ref;
  image.src = imageUrl;
  imageContainer.appendChild(image);
  const name = document.createElement('h3');
  name.textContent = product.name;
  detailContainer.appendChild(name);
  const priceDisplay = document.createElement('h4');
  const dollars = Math.floor(product.msrpInCents/100);
  const cents = stringCents((product.msrpInCents%100));
  const price = dollars + '.' + cents;
  priceDisplay.textContent = "Price: $" + price;
  detailContainer.appendChild(priceDisplay);
  const addToCart = document.createElement('button');
  addToCart.innerText="Add to Cart";
  detailContainer.appendChild(addToCart);
  const createdDate = product.createdAt;
  if ((product.msrpInCents > maxPrice * 100 && maxPrice !== "") || (product.msrpInCents < minPrice * 100 && minPrice !== "")) {
    productItem.classList.add('hide');
  }
  body.appendChild(productItem);
};

const stringCents = (cents) => //helper method to convert given 'msrpInCents' to proper format
{
    return cents > 9 ? "" + cents: "0" + cents;
};

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
