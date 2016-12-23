var addHeader = () => {
  const body = document.getElementById('body');
  const header = document.createElement('div');
  header.classList.add('horizontalContainer');
  body.appendChild(header);
};


var addSideBar = () => {
  const body = document.getElementById('body');
  const sidebar = document.createElement('div');
  sidebar.classList.add('verticalContainer');
  body.appendChild(sidebar);
};

var addMainBody = () => {
  const body = document.getElementById('body');
  const main = document.createElement('div');
  main.classList.add('verticalContainer');
  body.appendChild(main);
};
