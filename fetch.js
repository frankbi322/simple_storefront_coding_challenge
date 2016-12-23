var item = $.ajax({
  method: 'GET',
  url: 'http://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js',
  contentType: 'application/json',
  cache:false,
  crossOrigin: true, //need this to prevent cross origin errors
  dataType: 'json', //return a json object that can be parsed

  success: function(data){
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
  const body = document.getElementById('body');
  const productItem = document.createElement('div');
  productItem.classList.add('item');
  const imageContainer = document.createElement('div');
  const verticalContainer = document.createElement('div');
  productItem.appendChild(imageContainer);
  productItem.appendChild(verticalContainer);
  const image = document.createElement('img');
  const imageUrl = "http:" + product.mainImage.ref;
  image.src = imageUrl;
  imageContainer.appendChild(image);
  const name = document.createElement('h3');
  name.textContent = product.name;
  verticalContainer.appendChild(name);
  const price = document.createElement('h4');
  const dollars = Math.floor(product.msrpInCents/100);
  const cents = stringCents((product.msrpInCents%100));
  price.textContent = "Price: $" + dollars + "." + cents;

  verticalContainer.appendChild(price);
  body.appendChild(productItem);
};

const stringCents = (cents) => //helper method to convert given 'msrpInCents' to proper format
{
    return cents > 9 ? "" + cents: "0" + cents;
};
