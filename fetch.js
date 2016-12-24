//todos
//add a header with store name
//add sidebar for filter/sort options
//add dummy header nav links
//filtering by min/max price
//sorting by name, price, date
//have three rows of products instead of one column?

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
  const filter = document.createElement('input');
  filter.placeholder = "Max Price";
  filter.value = "Max Price";
  sidebar.appendChild(filter);
  main.appendChild(sidebar);
};

var addMainBody = () => {
  const main = document.getElementById('main');
  const mainBody = document.createElement('div');
  mainBody.classList.add('verticalContainer');
  mainBody.id = "mainBody";
  main.appendChild(mainBody);
};


var item = $.ajax({
  method: 'GET',
  url: 'http://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js',
  contentType: 'application/json',
  cache:false,
  crossOrigin: true, //need this to prevent cross origin errors
  dataType: 'json', //return a json object that can be parsed

  success: function(data){
    addHeader();
    setMainBody();
    addSideBar();
    addMainBody();
    let meta = $(data);
    let products = meta[0].products;
    console.log(products);
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

const createListItem = (product) => //pulls information from data and creates separate item div for each product
{
  const body = document.getElementById('mainBody');
  const productItem = document.createElement('div');
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
  const price = document.createElement('h4');
  const dollars = Math.floor(product.msrpInCents/100);
  const cents = stringCents((product.msrpInCents%100));
  price.textContent = "Price: $" + dollars + "." + cents;
  detailContainer.appendChild(price);
  const addToCart = document.createElement('button');
  addToCart.innerText="Add to Cart";
  detailContainer.appendChild(addToCart);
  const createdDate = product.createdAt;
  body.appendChild(productItem);
};

const stringCents = (cents) => //helper method to convert given 'msrpInCents' to proper format
{
    return cents > 9 ? "" + cents: "0" + cents;
};

const sorted = (products, parameter) => {
  return products.sort((a,b) => a.parameter > b.parameter ? 1 : -1);
};

// const filtered = (products, parameter, value) => {
//   return products.filter(product => (product.paramter));
// };
