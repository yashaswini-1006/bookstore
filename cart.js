const storageKey = 'bookstore-cart';
const themeStorageKey = 'bookstore-theme';

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

function getCartItemQuantity(id) {
  const cart = getCart();
  return cart[id]?.quantity || 0;
}

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.textContent = getCartItemCount();
  }
}

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(themeStorageKey);
  if (savedTheme) {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme = getPreferredTheme()) {
  document.body.classList.toggle('dark', theme === 'dark');
  document.documentElement.setAttribute('data-theme', theme);

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
  }
}

function toggleTheme() {
  const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
  localStorage.setItem(themeStorageKey, nextTheme);
  applyTheme(nextTheme);
}

function initializeTheme() {
  applyTheme(getPreferredTheme());

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', toggleTheme);
  }
}

initializeTheme();
