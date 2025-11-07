// ==============================
// Daftar produk tetap (25 item contoh)
// ==============================
const defaultProducts = [
  { id: 1, nama: "Semen Tiga Roda", harga: 55000, stok: 100 },
  { id: 2, nama: "Bata Merah", harga: 700, stok: 500 },
  { id: 3, nama: "Pasir Halus", harga: 120000, stok: 50 },
  { id: 4, nama: "Paku 10cm", harga: 15000, stok: 200 },
  { id: 5, nama: "Cat Dulux 5L", harga: 180000, stok: 25 },
  { id: 6, nama: "Kuas Cat", harga: 10000, stok: 100 },
  { id: 7, nama: "Triplek 3mm", harga: 95000, stok: 40 },
  { id: 8, nama: "Pipa PVC 1 inch", harga: 25000, stok: 120 },
  { id: 9, nama: "Kran Air", harga: 30000, stok: 80 },
  { id: 10, nama: "Seng Galvalum", harga: 95000, stok: 60 },
  { id: 11, nama: "Cat Avian 1L", harga: 45000, stok: 45 },
  { id: 12, nama: "Siku Besi", harga: 55000, stok: 70 },
  { id: 13, nama: "Lem Fox", harga: 12000, stok: 150 },
  { id: 14, nama: "Semen Putih", harga: 65000, stok: 90 },
  { id: 15, nama: "Kabel Listrik 10m", harga: 25000, stok: 75 },
  { id: 16, nama: "Tang Kombinasi", harga: 40000, stok: 30 },
  { id: 17, nama: "Obeng Set", harga: 35000, stok: 40 },
  { id: 18, nama: "Palu Besi", harga: 50000, stok: 25 },
  { id: 19, nama: "Sapu Ijuk", harga: 15000, stok: 100 },
  { id: 20, nama: "Ember Plastik", harga: 25000, stok: 60 },
  { id: 21, nama: "Kawat Bendrat", harga: 30000, stok: 50 },
  { id: 22, nama: "Kunci Inggris", harga: 55000, stok: 25 },
  { id: 23, nama: "Cangkul", harga: 70000, stok: 40 },
  { id: 24, nama: "Gerinda Tangan", harga: 350000, stok: 15 },
  { id: 25, nama: "Paku Beton", harga: 25000, stok: 90 },
];

// ==============================
// Ambil stok terbaru dari localStorage (kalau ada)
// ==============================
let storedStocks = JSON.parse(localStorage.getItem("productStocks")) || {};
let products = defaultProducts.map(p => ({
  ...p,
  stok: storedStocks[p.id] ?? p.stok
}));

// ==============================
// Elemen HTML
// ==============================
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

// ==============================
// Render produk ke halaman
// ==============================
function renderProducts(list = products) {
  productList.innerHTML = "";

  if (!list || list.length === 0) {
    productList.innerHTML = `<p class="text-gray-500 col-span-full text-center">Produk tidak ditemukan.</p>`;
    return;
  }

  list.forEach(prod => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow p-4 text-center";
    card.innerHTML = `
      <h3 class="font-semibold mb-2">${prod.nama}</h3>
      <p class="text-gray-600 mb-1">Rp ${prod.harga.toLocaleString()}</p>
      ${
        prod.stok > 0
          ? `<p class="text-green-600 font-bold mb-2">Stok: ${prod.stok}</p>
             <button class="bg-blue-700 text-white px-3 py-1 rounded">+ Keranjang</button>`
          : `<p class="text-red-500 font-semibold">Stok Habis</p>`
      }
    `;
    productList.appendChild(card);
  });
}

// ==============================
// Fungsi cari produk (lebih akurat)
// ==============================
function cariProduk(keyword) {
  const query = (keyword || searchInput.value || "").toLowerCase().trim();

  if (!query) {
    renderProducts(products);
    return;
  }

  // Filter lebih akurat: cocokkan kata penuh di awal atau yang paling relevan
  const hasil = products.filter(p =>
    p.nama.toLowerCase().includes(query)
  );

  // Kalau hasil kosong, tampilkan pesan
  if (hasil.length === 0) {
    productList.innerHTML = `<p class="text-center text-gray-500">Produk tidak ditemukan</p>`;
  } else {
    renderProducts(hasil);
  }
}

// ==============================
// Event: input realtime di produk.html
// ==============================
searchInput?.addEventListener("input", () => cariProduk());

// ==============================
// Ambil kata kunci pencarian dari beranda
// ==============================
window.addEventListener("DOMContentLoaded", () => {
  const savedQuery = localStorage.getItem("searchQuery");

  if (savedQuery) {
    searchInput.value = savedQuery;
    cariProduk(savedQuery); // langsung cari yang cocok
    localStorage.removeItem("searchQuery");
  } else {
    renderProducts(products); // tampil semua kalau tidak ada query
  }
});
