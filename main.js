// Ambil produk dari localStorage atau fallback ke default
function getProducts() {
  const saved = JSON.parse(localStorage.getItem("products") || "[]");

  // kalau kosong (belum pernah diisi admin), pakai default
  if (saved.length === 0) {
    return [
      { name: "Semen Gresik", image: "Assets/Img/semen.png", stock: 45 },
      { name: "Cat Dulux", image: "Assets/Img/cat.png", stock: 30 },
      { name: "Paku Baja 5cm", image: "Assets/Img/paku.png", stock: 100 },
      { name: "Pasir Bangunan", image: "Assets/Img/pasir.png", stock: 70 },
      { name: "Batu Bata Merah", image: "Assets/Img/batubata.png", stock: 200 },
    ];
  }

  return saved;
}

// Simpan produk kalau perlu update
function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

// Ambil elemen dari HTML
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

// Render produk ke halaman
function renderProducts(filter = "") {
  const products = getProducts(); // ambil dari localStorage
  productList.innerHTML = "";

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    productList.innerHTML = `<p class="text-center text-gray-500 col-span-3">Produk tidak ditemukan.</p>`;
    return;
  }

  filtered.forEach(p => {
    const isOutOfStock = p.stock <= 0;

    const card = document.createElement("div");
    card.className =
      "bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200";

    card.innerHTML = `
      <Img src="${p.image}" alt="${p.name}" class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">${p.name}</h3>
        <p class="text-gray-600 mb-3">Stok:
          <span class="font-medium">${p.stock}</span>
        </p>
        <button
          class="w-full py-2 rounded-md font-medium ${
            isOutOfStock
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-700 hover:bg-blue-800 text-white"
          }"
          ${isOutOfStock ? "disabled" : ""}
        >
          ${isOutOfStock ? "Stok Habis" : "Masukkan Keranjang"}
        </button>
      </div>
    `;

    if (!isOutOfStock) {
      const button = card.querySelector("button");
      button.addEventListener("click", () => addToCart(p));
    }

    productList.appendChild(card);
  });
}

// Fungsi keranjang
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.name === product.name);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  saveCart(cart);
  updateCartCount();
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  if (!cartCount) return;
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = total;
}

// Event pencarian
searchInput.addEventListener("input", e => renderProducts(e.target.value));

// Jalankan pertama kali
renderProducts();
updateCartCount();
