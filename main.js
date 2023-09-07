// ************************
// * declarations
// navber links
const navHome = document.getElementById('nav-home');
const navElectronics = document.getElementById('nav-electronics');
const navJewelery = document.getElementById('nav-jewelery');
const navMensClothing = document.getElementById('nav-mens-clothing');
const navWomensClothing = document.getElementById('nav-womens-clothing');

// navbar cart button
const navCart = document.getElementById('nav-cart');

// body of the cart modal's item table
const modalItemTable = document.getElementById('item-table-body');

// the cart modal's price table - for inserting the "thank you for purchasing" alert above it
const modalPriceTable = document.getElementById('modal-price-table');

// elements in the cart modal's price table - for changing these values
const tableSubtotal = document.getElementById('table-subtotal');
const tableTax = document.getElementById('table-tax');
const tableShipping = document.getElementById('table-shipping');
const tableTotal = document.getElementById('table-total');

// clear cart button in the cart modal
const modalClearBtn = document.getElementById('modal-clear-button');

// purchase button in the cart modal
const modalPurchaseBtn = document.getElementById('modal-purchase-button');

// the display div that holds all the item cards
const display = document.getElementById('display');

// endpoint url
const url = 'https://fakestoreapi.com/products';

// cart array
const cart = [];



// ************************
// * returns a string with the fist letter capitalized
function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};



// ************************
// * returns a number in a $0.00 format
function priceFormat(cost) {
  return `$${cost.toFixed(2)}`;
};



// ************************
// * adds an object to the cart array
function submitToCart(item) {

  // searches the cart to see if the item already exists, returns -1 if no match found
  let matchingIndex = cart.findIndex(cartItem => cartItem.id === item.id);

  // if the item isn't in the cart, add it, else, increase the quantity
  matchingIndex === -1
  ?
  cart.push(item)
  :
  cart[matchingIndex].quantity += 1;
};



// ************************
// * updates cart information on the modal - called when the cart button is clicked
function displayCart() {

  // clears the item table (stays clear if the cart is empty)
  modalItemTable.innerHTML = '';

  // if the alert is still showing from the last purchase, this clears it
  let prevAlert = document.getElementById('modal-purchase-alert');
  if (prevAlert != null) {
    prevAlert.remove();
  };

  // declares price values, starting at zero in case cart is empty
  let subtotal = 0;
  let tax = 0;
  let shipping = 0;
  let total = 0;
  
  // if the cart array has something in it
  if (cart.length !== 0) {
    
    // for each cart item
    cart.forEach(item => {

      // increase the subtotal by item cost * amount of items
      subtotal += item.cost * item.quantity;

      // create and append new row to cart
      let cartRow = document.createElement('tr');
      modalItemTable.appendChild(cartRow);

      // create and append td with item quantity
      let cartItemQuantity = document.createElement('td');
      cartItemQuantity.innerText = item.quantity;
      modalItemTable.appendChild(cartItemQuantity);

      // create and append td with item title and price
      let cartItemListing = document.createElement('td');
      cartItemListing.innerText = `${item.title} at ${priceFormat(item.cost)} ea`;
      modalItemTable.appendChild(cartItemListing);

      // create and append td with item price * quantity
      let cartItemPrice = document.createElement('td');
      cartItemPrice.innerText = priceFormat(item.cost * item.quantity);
      modalItemTable.appendChild(cartItemPrice);
    });
    
    // calculate other cost values based on subtotal
    tax = subtotal * 0.07;
    shipping = subtotal * 0.1;
    total = subtotal + tax + shipping;

    // enables buttons and adds price to purchase button if cart has items
    modalClearBtn.removeAttribute('disabled');
    modalPurchaseBtn.removeAttribute('disabled');
    modalPurchaseBtn.innerText = `Purchase for ${priceFormat(total)}`;
    
  };

  // adds prices to price table, outside of if
  tableSubtotal.innerText = priceFormat(subtotal);
  tableTax.innerText = priceFormat(tax);
  tableShipping.innerText = priceFormat(shipping);
  tableTotal.innerText = priceFormat(total);
};



// ************************
// * clears cart array - runs after purchase or when clear cart button is clicked
function clearCart() {

  //clears cart array
  cart.length = 0;

  // disables cart modal buttons
  modalClearBtn.setAttribute('disabled','');
  modalPurchaseBtn.setAttribute('disabled','');

  // removes price from purchase button
  modalPurchaseBtn.innerText = 'Purchase';
};



// ************************
// * creates accordion items - called during card creation, this was just a lot of code to run twice in that process. I'd love feedback on whether that's okay or not'
// * takes in the current store item, the container to append these items to, and the subject (price or description)
function accordionItem(storeItem, container, subject) {

  // creates accordion item container
  let cardAccord = document.createElement('div');
  cardAccord.className = 'accordion-item text-bg-light';
  container.appendChild(cardAccord);

  // creates accordion item header
  let cardAccordHead = document.createElement('h2');
  cardAccordHead.className = 'accordion-header';
  cardAccord.appendChild(cardAccordHead);
  
  // creates accordion item button, including unique target attributes so each item acts independantly
  let cardAccordBtn = document.createElement('button');
  cardAccordBtn.className = 'accordion-button collapsed bg-light fs-5 shadow-none';
  cardAccordBtn.type = 'button';
  cardAccordBtn.setAttribute('data-bs-toggle', 'collapse');
  cardAccordBtn.setAttribute('data-bs-target', `#${storeItem.id}-collapse-${subject}`);
  cardAccordBtn.innerText = `${capitalize(subject)}`;
  cardAccordHead.appendChild(cardAccordBtn);
  
  // creates accordion item body
  let cardAccordBody = document.createElement('div');
  cardAccordBody.className = 'accordion-collapse collapse';
  cardAccordBody.id = `${storeItem.id}-collapse-${subject}`;
  cardAccordBody.setAttribute('data-bs-parent', `#Accordion-${storeItem.id}`);
  cardAccord.appendChild(cardAccordBody);

  // creates accordion item body text
  let cardAccordText = document.createElement('div');
  cardAccordText.className = `accordion-body`;
  
  // formats differently for price vs. description accordion items
  if (subject === 'description') {
    cardAccordText.innerText = storeItem[subject];
  } else if (subject === 'price') {
    cardAccordText.innerText = priceFormat(storeItem[subject]);
  };

  // appends the accordion item to the passed element
  cardAccordBody.appendChild(cardAccordText);
};



// ************************
// * creates the item card in the main display div - runs on load and when nav buttons are clicked
// * takes in fake store items from whichever link is clicked
let displayCards = function(data) {
  
  // clears loading spinner to display cards
  display.innerHTML = '';

  // obligatory process comment from the instructions
  // I originally had creations, edits and appends grouped together in the data.forEach(). Is there a downside to how I ended up doing it?
  // 1. create new element
  // 2. edit the element
  // 3. add the element to the webpage

  // creates the row that the colums need to work correctly
  let row = document.createElement('div');
  row.className = 'row g-5';

  // alternate to above, using grid colums instead (per instructions suggestion). I couldn't figure out which way was better
  // row.className = 'row row-cols-4 g-5';
  display.appendChild(row);

  // for each item from the fetch data
  data.forEach(item => {

    // creates card column
    let cardColumn = document.createElement('div');
    cardColumn.className = 'col-3';
    row.appendChild(cardColumn);

    // creates card container - lots of formatting for the border, and a shadow you can hardly make out
    let cardContainer = document.createElement('div');
    cardContainer.className = 'card text-center text-bg-light border border-3 border-start-0 border-end-0 border-bottom-0 border-info-subtle rounded-3 shadow h-100';
    cardColumn.appendChild(cardContainer);

    // creates card image - figured out how to center the image and push the text down with m-auto (flex-grow streches the images)
    let cardImage = document.createElement('img');
    cardImage.className = 'card-img-top rounded-3 px-4 pt-3 m-auto';
    cardImage.alt = `Image of ${item.title}`;
    cardImage.src = item.image;
    cardContainer.appendChild(cardImage);

    // creates card body - had to remove flex-grow, which was pushing the image up
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body flex-grow-0';
    cardContainer.appendChild(cardBody);
    
    // creates card title
    let cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.innerText = item.title;
    cardBody.appendChild(cardTitle);

    // creates card accordion container - with unique id, which links to accordion items created with accordionItem()
    let cardAccordContainer = document.createElement('div');
    cardAccordContainer.className = 'accordion accordion-flush';
    cardAccordContainer.id = `Accordion-${item.id}`;
    cardContainer.appendChild(cardAccordContainer);

    // creates card accordion items - passes current item, parent container and the subject/reference for the item
    accordionItem(item, cardAccordContainer, 'description');
    accordionItem(item, cardAccordContainer, 'price');

    // creates card footer - had to display grid to get the button to fill the space
    let cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer border border-3 border-start-0 border-end-0 border-bottom-0 border-info-subtle rounded-top-3 text-bg-dark d-grid p-0';
    cardContainer.appendChild(cardFooter);

    // creates card footer button
    let cardFooterBtn = document.createElement('button');
    cardFooterBtn.className = 'btn btn-dark btn';
    cardFooterBtn.type = 'button';

    // creates a cart object from the current item when clicked, and passed it to the submitToCart() function
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



// ************************
// * async function that fetches data from fake store api and calls displayCards() to display it
let fakeStore = async (endpoint) => {

  //clears cards to display loading spinner
  display.innerHTML = '';

  // creates loading spinner to display while waiting for data - spinner cleared in displayCards() - flex container allows centering
  let loadingContainer = document.createElement('div');
  loadingContainer.className = 'd-flex justify-content-center'
  display.appendChild(loadingContainer)
  let loading = document.createElement('div');
  loading.className = 'spinner-border m-5 text-info';
  loading.role = 'status';
  loadingContainer.appendChild(loading);

  // pulls data from api based on endpoint url
  let response = await fetch(endpoint);
  let storeData = await response.json();

  // obligatory instructions console.log of data
  console.log(storeData);

  // calls displayCards() with data from api to display the cards
  displayCards(storeData);

  // scrolls up to show cards
  window.scrollTo(0, 0);
};



// ************************
// * removes 'active' attribute from nav links, then adds to clicked link - runs when nav link is clicked
function setActiveLink(event) {
  navHome.classList.remove('active');
  navElectronics.classList.remove('active');
  navJewelery.classList.remove('active');
  navMensClothing.classList.remove('active');
  navWomensClothing.classList.remove('active');
  event.currentTarget.classList.add('active');
};



// ************************
// * event listeners for cart and modal buttons

// nav cart button - cart displays via bootstrap code, displayCart() updats the information on the modal
navCart.addEventListener('click', e => {
  e.preventDefault();
  displayCart();
});

// modal clear cart button - clears the cart with clearCart() and resets data
modalClearBtn.addEventListener('click', e => {
  e.preventDefault
  clearCart();
  displayCart();
});

// modal purchase button - resets modal and displays alert
modalPurchaseBtn.addEventListener('click', e => {
  e.preventDefault

  // clears the cart and displays newly empty information
  clearCart();
  displayCart();

  // creates and appends an alert before the modal price table
  let alert = document.createElement('div');
  alert.className = 'alert alert-info alert-dismissible fade show text-center border border-3 border-start-0 border-end-0 border-bottom-0 border-info-subtle rounded-top-3';
  alert.id = 'modal-purchase-alert';
  alert.innerHTML = '<strong>Thank you for your purchase!</strong>';
  modalPriceTable.insertAdjacentElement('beforebegin', alert);

  // creates and appends the alert's close button
  let alertDismissBtn = document.createElement('button');
  alertDismissBtn.type = 'button';
  alertDismissBtn.className = 'btn-close';
  alertDismissBtn.setAttribute('data-bs-dismiss', 'alert');
  alert.appendChild(alertDismissBtn);
});



// ************************
// * event listeners for nav links - comments below are the same for following items
navHome.addEventListener('click', e => {

  // I'm not sure if I need this here, or when exactly I do or don't need this
  e.preventDefault();

  // passes the event, and uses it to set the current link active
  setActiveLink(e);

  // calls fakeStore with the clicked category
  fakeStore(url + `?sort=asc`);

  // scrolls up to show loading spinner
  window.scrollTo(0, 0);
});

navElectronics.addEventListener('click', e => {
  e.preventDefault();
  setActiveLink(e);
  fakeStore(url + `/category/electronics?sort=asc`);
  window.scrollTo(0, 0);
});

navJewelery.addEventListener('click', e => {
  e.preventDefault();
  setActiveLink(e);
  fakeStore(url + `/category/jewelery?sort=asc`);
  window.scrollTo(0, 0);
});

navMensClothing.addEventListener('click', e => {
  e.preventDefault();
  setActiveLink(e);
  fakeStore(url + `/category/men's%20clothing?sort=asc`);
  window.scrollTo(0, 0);
});

navWomensClothing.addEventListener('click', e => {
  e.preventDefault();
  setActiveLink(e);
  fakeStore(url + `/category/women's%20clothing?sort=asc`);
  window.scrollTo(0, 0);
});



// ************************
// * onload event - runs fakeStore() on site load, with all items, and scrolls up to show the spinner
window.onload = (event) => {
  fakeStore(url + `?sort=asc`);
  window.scrollTo(0, 0);
};