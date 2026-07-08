const storageKey = 'bookstore-cart';

function getCart() {
  const saved = localStorage.getItem(storageKey);
  return saved ? JSON.parse(saved) : {};
}

function saveCart(cart) {
  localStorage.setItem(storageKey, JSON.stringify(cart));
}

function getCartItemCount() {
  const cart = getCart();
  return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.textContent = getCartItemCount();
  }
}
