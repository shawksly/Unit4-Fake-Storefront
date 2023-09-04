const navHome = document.getElementById('nav-home');
const navElectronics = document.getElementById('nav-electronics');
const navJewelery = document.getElementById('nav-jewelery');
const navMensClothing = document.getElementById('nav-mens-clothing');
const navWomensClothing = document.getElementById('nav-womens-clothing');
const display = document.getElementById('display');
const url = 'https://fakestoreapi.com/products';
const cart = [];

function submitToCart() {
  
};

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

function accordionItem(storeItem, container, subject) {
  let cardAccord = document.createElement('div');
    let cardAccordHead = document.createElement('h2');
      let cardAccordBtn = document.createElement('button');
    let cardAccordBody = document.createElement('div');
      let cardAccordText = document.createElement('div');

  cardAccord.className = 'accordion-item text-bg-light';
    cardAccordHead.className = 'accordion-header';
      cardAccordBtn.className = 'accordion-button collapsed bg-light fs-5 shadow-none';
      cardAccordBtn.type = 'button';
      cardAccordBtn.setAttribute('data-bs-toggle', 'collapse');
      cardAccordBtn.setAttribute('data-bs-target', `#${storeItem.id}-collapse-${subject}`);
      cardAccordBtn.innerText = `${capitalize(subject)}`;
    cardAccordBody.className = 'accordion-collapse collapse';
    cardAccordBody.id = `${storeItem.id}-collapse-${subject}`;
    cardAccordBody.setAttribute('data-bs-parent', `#Accordion-${storeItem.id}`);


    // TODO format description and price
      if (subject === 'description') {
        cardAccordText.className = `accordion-body`;
        cardAccordText.innerText = storeItem[subject];
      } else if (subject === 'price') {
        cardAccordText.className = `accordion-body`;
        cardAccordText.innerText = `$${storeItem[subject]}`;
      };

  container.appendChild(cardAccord);
    cardAccord.appendChild(cardAccordHead);
      cardAccordHead.appendChild(cardAccordBtn);
    cardAccord.appendChild(cardAccordBody);
      cardAccordBody.appendChild(cardAccordText);

};

function displayCards(data) {
  
  display.innerHTML = '';
  // 1. create new element
  // 2. edit the element
  // 3. add the element to the webpage

  let row = document.createElement('div');
  row.className = 'row g-5';
  display.appendChild(row);

  data.forEach(item => {
    let cardColumn = document.createElement('div');
      let cardContainer = document.createElement('div');
        let cardImage = document.createElement('img');
        let cardBody = document.createElement('div');
          let cardTitle = document.createElement('h4');
        let cardAccordContainer = document.createElement('div');
        let cardFooter = document.createElement('div');
          let cardFooterLink = document.createElement('a');


    cardColumn.className = 'col-3';
      cardContainer.className = 'card text-center text-bg-light border border-0 border-top border-info-subtle rounded-3 shadow-sm';
        cardImage.className = 'card-img-top rounded-3 px-4 pt-3';
        cardImage.alt = `Image of ${item.title}`;
        cardImage.src = item.image;
        cardBody.className = 'card-body';
          cardTitle.className = 'card-title';
          cardTitle.innerText = item.title;
        cardAccordContainer.className = 'accordion accordion-flush';
        cardAccordContainer.id = `Accordion-${item.id}`;
        cardFooter.className = 'card-footer border-top border-info-subtle rounded-top-3 text-bg-dark';
          cardFooterLink.href = '#';
          cardFooterLink.className = 'card-link link-light link-underline link-underline-opacity-0 link-underline-opacity-75-hover fs-5';
          cardFooterLink.innerText = 'Add to Cart'


    row.appendChild(cardColumn);
      cardColumn.appendChild(cardContainer);
        cardContainer.appendChild(cardImage);
        cardContainer.appendChild(cardBody);
          cardBody.appendChild(cardTitle);
        cardContainer.appendChild(cardAccordContainer);
          accordionItem(item, cardAccordContainer, 'description');
          accordionItem(item, cardAccordContainer, 'price');
        cardContainer.appendChild(cardFooter);
          cardFooter.appendChild(cardFooterLink);


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
};

// TODO change active link

navHome.addEventListener('click', e => {
  e.preventDefault();
  fakeStore(url + `?sort=asc`);
});

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

//how do i level cards
//can i not use css