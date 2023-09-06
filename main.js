const navHome = document.getElementById('nav-home');
const navElectronics = document.getElementById('nav-electronics');
const navJewelery = document.getElementById('nav-jewelery');
const navMensClothing = document.getElementById('nav-mens-clothing');
const navWomensClothing = document.getElementById('nav-womens-clothing');
const navCart = document.getElementById('nav-cart');
const modalItemTable = document.getElementById('item-table-body');
const tableSubtotal = document.getElementById('table-subtotal');
const tableTax = document.getElementById('table-tax');
const tableShipping = document.getElementById('table-shipping');
const tableTotal = document.getElementById('table-total');
const display = document.getElementById('display');
const url = 'https://fakestoreapi.com/products';
const cart = [];

function submitToCart(item) {
  let matchingIndex = cart.findIndex(cartItem => cartItem.id === item.id);

  matchingIndex === -1
  ?
  cart.push(item)
  :
  cart[matchingIndex].quantity += 1;
};

function displayCart() {
  modalItemTable.innerHTML = '';
  // TODO swap price with individual values
  let subtotal = 0;
  let tax = 0;
  let shipping = 0;
  let total = 0;
  
  if (cart.length !== 0) {
    
    cart.forEach(item => {
      subtotal += item.cost * item.quantity;

      let cartRow = document.createElement('tr');
      modalItemTable.appendChild(cartRow);

      let cartItemQuantity = document.createElement('td');
      cartItemQuantity.innerText = item.quantity;
      modalItemTable.appendChild(cartItemQuantity);

      let cartItemListing = document.createElement('td');
      cartItemListing.innerText = `${item.title} at ${priceFormat(item.cost)} ea`;
      modalItemTable.appendChild(cartItemListing);

      let cartItemPrice = document.createElement('td');
      cartItemPrice.innerText = priceFormat(item.cost * item.quantity);
      modalItemTable.appendChild(cartItemPrice);
    });
    
    tax = subtotal * 0.07;
    shipping = subtotal * 0.1;
    total = subtotal + tax + shipping;
    
  };

  tableSubtotal.innerText = priceFormat(subtotal);
  tableTax.innerText = priceFormat(tax);
  tableShipping.innerText = priceFormat(shipping);
  tableTotal.innerText = priceFormat(total);
  
  console.log(subtotal);
};

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

function priceFormat(cost) {
  return `$${cost.toFixed(2)}`;
};

function accordionItem(storeItem, container, subject) {

  // accordion item container
  let cardAccord = document.createElement('div');
  cardAccord.className = 'accordion-item text-bg-light';
  container.appendChild(cardAccord);

  // accordion item header
  let cardAccordHead = document.createElement('h2');
  cardAccordHead.className = 'accordion-header';
  cardAccord.appendChild(cardAccordHead);
  
  // accordion item button
  let cardAccordBtn = document.createElement('button');
  cardAccordBtn.className = 'accordion-button collapsed bg-light fs-5 shadow-none';
  cardAccordBtn.type = 'button';
  cardAccordBtn.setAttribute('data-bs-toggle', 'collapse');
  cardAccordBtn.setAttribute('data-bs-target', `#${storeItem.id}-collapse-${subject}`);
  cardAccordBtn.innerText = `${capitalize(subject)}`;
  cardAccordHead.appendChild(cardAccordBtn);
  
  // accordion item body
  let cardAccordBody = document.createElement('div');
  cardAccordBody.className = 'accordion-collapse collapse';
  cardAccordBody.id = `${storeItem.id}-collapse-${subject}`;
  cardAccordBody.setAttribute('data-bs-parent', `#Accordion-${storeItem.id}`);
  cardAccord.appendChild(cardAccordBody);

  // accordion item body text
  let cardAccordText = document.createElement('div');
  // TODO format description and price
  if (subject === 'description') {
    cardAccordText.className = `accordion-body`;
    cardAccordText.innerText = storeItem[subject];
  } else if (subject === 'price') {
    cardAccordText.className = `accordion-body`;
    cardAccordText.innerText = priceFormat(storeItem[subject]);
  };
  cardAccordBody.appendChild(cardAccordText);

};

let displayCards = function(data) {
  
  display.innerHTML = '';
  // 1. create new element
  // 2. edit the element
  // 3. add the element to the webpage

  let row = document.createElement('div');
  row.className = 'row g-5';
  // row.className = 'row row-cols-4 g-5';
  display.appendChild(row);

  data.forEach(item => {

    // card column
    let cardColumn = document.createElement('div');
    cardColumn.className = 'col-3';
    row.appendChild(cardColumn);

    // card container
    let cardContainer = document.createElement('div');
    cardContainer.className = 'card text-center text-bg-light border border-3 border-start-0 border-end-0 border-bottom-0 border-info-subtle rounded-3 shadow h-100';
    cardColumn.appendChild(cardContainer);

    // card image
    let cardImage = document.createElement('img');
    cardImage.className = 'card-img-top rounded-3 px-4 pt-3 m-auto';
    cardImage.alt = `Image of ${item.title}`;
    cardImage.src = item.image;
    cardContainer.appendChild(cardImage);

    // card body
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body flex-grow-0';
    cardContainer.appendChild(cardBody);
    
    // card title
    let cardTitle = document.createElement('h4');
    cardTitle.className = 'card-title';
    cardTitle.innerText = item.title;
    cardBody.appendChild(cardTitle);

    // card accordion container
    let cardAccordContainer = document.createElement('div');
    cardAccordContainer.className = 'accordion accordion-flush';
    cardAccordContainer.id = `Accordion-${item.id}`;
    cardContainer.appendChild(cardAccordContainer);

    // card accordion items
    accordionItem(item, cardAccordContainer, 'description');
    accordionItem(item, cardAccordContainer, 'price');

    // card footer
    let cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer border border-3 border-start-0 border-end-0 border-bottom-0 border-info-subtle rounded-top-3 text-bg-dark d-grid p-0';
    cardContainer.appendChild(cardFooter);

    // card footer button
    let cardFooterBtn = document.createElement('button');
    cardFooterBtn.className = 'btn btn-dark btn';
    cardFooterBtn.type = 'button';
    cardFooterBtn.onclick = function() {
      const cartObject = {
        id: item.id,
        title: item.title,
        cost: item.price,
        quantity: 1
      };
      submitToCart(cartObject);
    };
    cardFooterBtn.innerText = 'Add to Cart'
    cardFooter.appendChild(cardFooterBtn);

  });

};

let fakeStore = async (endpoint) => {
  display.innerHTML = '';

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
  window.scrollTo(0, 0);
};

// TODO change active link

navHome.addEventListener('click', e => {
  e.preventDefault();
  fakeStore(url + `?sort=asc`);
  window.scrollTo(0, 0);
});

navElectronics.addEventListener('click', e => {
  e.preventDefault();
  fakeStore(url + `/category/electronics?sort=asc`);
  window.scrollTo(0, 0);
});

navJewelery.addEventListener('click', e => {
  e.preventDefault();
  fakeStore(url + `/category/jewelery?sort=asc`);
  window.scrollTo(0, 0);
});

navMensClothing.addEventListener('click', e => {
  e.preventDefault();
  fakeStore(url + `/category/men's%20clothing?sort=asc`);
  window.scrollTo(0, 0);
});

navWomensClothing.addEventListener('click', e => {
  e.preventDefault();
  fakeStore(url + `/category/women's%20clothing?sort=asc`);
  window.scrollTo(0, 0);
});

navCart.addEventListener('click', e => {
  e.preventDefault();
  displayCart();
});

window.onload = (event) => {
  fakeStore(url + `?sort=asc`);
  window.scrollTo(0, 0);
};

//how do i level cards - is there a better way?
//can i not use css - last line of U4_04
// why is this like this - footer button
// while loops
// layout declarations > functions > code ?