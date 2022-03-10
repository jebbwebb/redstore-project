import items from './items.json';
import { formatter } from './format';
import { addGlobalEventListener } from './addGlobalEventListener';
import { addToCart } from './shoppingCart';

const storeContainer = document.querySelector('[data-store-container]');
const storeTemplate = document.querySelector('#store-template');

export function renderStore() {
  if (storeContainer == null) return;
  addGlobalEventListener('click', '[data-add-to-cart-button]', (e) => {
    const id = e.target.closest('[data-store-product]').dataset.itemId;
    addToCart(parseInt(id));
  });
  items.forEach(setupStore);
}

function setupStore(item) {
  const storeItem = storeTemplate.content.cloneNode(true);
  const container = storeItem.querySelector('[data-store-product]');
  container.dataset.itemId = item.id;
  const name = storeItem.querySelector('[data-store-name]');
  name.innerText = item.name;

  const image = storeItem.querySelector('[data-store-image]');
  image.src = item.imageSource;

  const price = storeItem.querySelector('[data-store-price]');
  price.innerText = formatter.format(item.price / 100);

  storeContainer.appendChild(storeItem);
}
