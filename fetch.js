//todos
//add a header with store name
//add sidebar for filter/sort options
//add dummy header nav links
//filtering by min/max price
//sorting by name, price, date
//have three rows of products instead of one column?
//put the addheader,sidebar, etc into a domcontentloaded callback
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
  sidebartitle.innerText="Filter";
  sidebar.appendChild(sidebartitle);
  const maxPriceFilter = document.createElement('input');
  maxPriceFilter.placeholder = "Max Price";
  maxPriceFilter.id = "maxPriceFilter";
  sidebar.appendChild(maxPriceFilter);
  const minPriceFilter = document.createElement('input');
  minPriceFilter.placeholder = "Min Price";
  minPriceFilter.id = "minPriceFilter";
  sidebar.appendChild(minPriceFilter);
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
  url: 'http://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js',
  contentType: 'application/json',
  cache: false,
  crossOrigin: true, //need this to prevent cross origin errors
  dataType: 'json', //return a json object that can be parsed

  success: function(data){

    let meta = $(data);
    let products = meta[0].products;
    // console.log(products);
    products.forEach(product => {
      createListItem(product);
    });
  },

  error: function(XMLHttpRequest, textStatus, errorThrown) {
  if (XMLHttpRequest.status == 0) {
    alert(' Check Your Network.');
  } else if (XMLHttpRequest.status == 404) {
    handleError();
  } else if (XMLHttpRequest.status == 500) {
    alert('Internel Server Error.');
  }  else {
     alert('Unknow Error.\n' + XMLHttpRequest.responseText);
  }
  }
});
}

const createListItem = (product) => //pulls information from data and creates separate item div for each product
{
  const maxPrice = document.getElementById('maxPriceFilter').value;
  const minPrice = document.getElementById('minPriceFilter').value;
  console.log(maxPrice);
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
  if (product.price < maxPrice || maxPrice === "") {
    productItem.style.display = "";
  }
  else if (product.price > minPrice || minPrice === "") {
    productItem.style.display = "";
  }
  else {
    productItem.style.display = "none";
  }
  body.appendChild(productItem);
};

const stringCents = (cents) => //helper method to convert given 'msrpInCents' to proper format
{
    return cents > 9 ? "" + cents: "0" + cents;
};

const sorted = (products, parameter) => {
  return products.sort((a,b) => a.parameter > b.parameter ? 1 : -1);
};




const refine = () => {
  // var maxPrice = document.getElementById('maxPriceFilter').value;
  // var minPrice = document.getElementById('minPriceFilter').value;
  // var ul = document.getElementById('mainBody');
  // var li = ul.getElementsByTagName('li');
  // var i;
  // console.log(ul);
  //
  // for (i = 0; i < li.length; i++) {
  //   console.log(li[i]);
  //   if (maxPrice < li[i].price) {
  //     li[i].style.display = "";
  //   } else {
  //     li[i].style.display = "none";
  //   }
  // }
  // for (i = 0; i < li.length; i++) {
  //   if (minPrice > li[i].price) {
  //     li[i].style.display = "";
  //   } else {
  //     li[i].style.display = "none";
  //   }
  // }
  // console.log(ul);
};
