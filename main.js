const navElectronics = document.getElementById('nav-electronics');
const navJewelery = document.getElementById('nav-jewelery');
const navMensClothing = document.getElementById('nav-mens-clothing');
const navWomensClothing = document.getElementById('nav-womens-clothing');
const display = document.getElementById('display');
const url = 'https://fakestoreapi.com/products';

let fakeStore = async (endpoint) => {
  let response = await fetch(endpoint);
  let storeData = await response.json();

  console.log(storeData);
};

navElectronics.addEventListener('click', e => {
  e.preventDefault();
  fakeStore(url + `/category/electronics?sort=desc`);
});

navJewelery.addEventListener('click', e => {
  e.preventDefault();
  fakeStore(url + `/category/jewelery?sort=desc`);
});

navMensClothing.addEventListener('click', e => {
  e.preventDefault();
  fakeStore(url + `/category/men's%20clothing?sort=desc`);
});

navWomensClothing.addEventListener('click', e => {
  e.preventDefault();
  fakeStore(url + `/category/women's%20clothing?sort=desc`);
});

window.onload = (event) => {
  fakeStore(url + `?sort=desc`);
};