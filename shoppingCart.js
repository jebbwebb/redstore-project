import items from './items.json';
import { formatter } from './format';
import { addGlobalEventListener } from './addGlobalEventListener';

const cartTemplate = document.querySelector('#cart-item-template');
let shoppingCart = [];
const cartItemContainer = document.querySelector('[data-cart-container]');
const cartTotal = document.querySelector('[data-cart-total]');
const SESSION_STORAGE_KEY = 'SHOPPING_CART-cart';

export function setupShoppingCart() {
  addGlobalEventListener('click', '[data-remove-cart-button]', (e) => {
    const id = parseInt(e.target.closest('[data-item]').dataset.itemId);
    removeFromCart(id);
  });
  shoppingCart = loadCart();
  renderShoppingCart();
}

function saveCart() {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shoppingCart));
}

function loadCart() {
  const cart = sessionStorage.getItem(SESSION_STORAGE_KEY);
  return JSON.parse(cart) || [];
}

export function addToCart(id) {
  const existingItem = shoppingCart.find((entry) => entry.id === id);
  console.log(existingItem);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    shoppingCart.push({ id: id, quantity: 1 });
  }
  renderShoppingCart();
  saveCart();
}

function removeFromCart(id) {
  const existingItem = shoppingCart.find((entry) => entry.id === id);
  if (existingItem == null) return;
  shoppingCart = shoppingCart.filter((entry) => entry.id !== id);
  renderShoppingCart();
  saveCart();
}

function renderShoppingCart() {
  cartItemContainer.innerHTML = '';

  const totalCents = shoppingCart.reduce((sum, entry) => {
    const item = items.find((i) => entry.id === i.id);
    return sum + item.price * entry.quantity;
  }, 0);

  cartTotal.innerText = formatter.format(totalCents / 100);

  shoppingCart.forEach((entry) => {
    const item = items.find((i) => entry.id === i.id);

    const cartItem = cartTemplate.content.cloneNode(true);

    const container = cartItem.querySelector('[data-item]');
    container.dataset.itemId = item.id;

    const name = cartItem.querySelector('[data-name]');
    name.innerText = item.name;

    if (entry.quantity > 1) {
      const quantity = cartItem.querySelector('[data-quantity]');
      console.log(quantity);
      quantity.innerText = `${entry.quantity}`;
    }

    const price = cartItem.querySelector('[data-price]');
    console.log(price);
    price.innerText = formatter.format((item.price * entry.quantity) / 100);
    const image = cartItem.querySelector('[data-image]');
    image.src = item.imageSource;

    cartItemContainer.appendChild(cartItem);
  });
}
