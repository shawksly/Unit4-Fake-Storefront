const navElectronics = document.getElementById('nav-electronics');
const navJewelery = document.getElementById('nav-jewelery');
const navMensClothing = document.getElementById('nav-mens-clothing');
const navWomensClothing = document.getElementById('nav-womens-clothing');
const display = document.getElementById('display');
const url = 'https://fakestoreapi.com/products';

function displayCards(data) {
  
  display.innerHTML = '';
  // 1. create new element
  // 2. edit the element
  // 3. add the element to the webpage

  let row = document.createElement('div');
  row.className = 'row';
  display.appendChild(row);

  // data.forEach(item => {

  // });

};

let fakeStore = async (endpoint) => {

  let loadingContainer = document.createElement('div');
  loadingContainer.className = 'd-flex justify-content-center'
  display.appendChild(loadingContainer)
  let loading = document.createElement('div');
  loading.className = 'spinner-border m-5 text-info';
  loading.role = 'status';
  loadingContainer.appendChild(loading);

  let response = await fetch(endpoint);
  let storeData = await response.json();

  console.log(storeData);
  displayCards(storeData);
};

navElectronics.addEventListener('click', e => {
  e.preventDefault();
  fakeStore(url + `/category/electronics?sort=asc`);
});

navJewelery.addEventListener('click', e => {
  e.preventDefault();
  fakeStore(url + `/category/jewelery?sort=asc`);
});

navMensClothing.addEventListener('click', e => {
  e.preventDefault();
  fakeStore(url + `/category/men's%20clothing?sort=asc`);
});

navWomensClothing.addEventListener('click', e => {
  e.preventDefault();
  fakeStore(url + `/category/women's%20clothing?sort=asc`);
});

window.onload = (event) => {
  fakeStore(url + `?sort=asc`);
};