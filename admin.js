const defaultProducts = [
  { id: 1, nama: "Semen Tiga Roda", stok: 100 },
  { id: 2, nama: "Bata Merah", stok: 500 },
  { id: 3, nama: "Pasir Halus", stok: 50 },
  { id: 4, nama: "Paku 10cm", stok: 200 },
  { id: 5, nama: "Cat Dulux 5L", stok: 25 },
  { id: 6, nama: "Kuas Cat", stok: 100 },
  { id: 7, nama: "Triplek 3mm", stok: 40 },
  { id: 8, nama: "Pipa PVC 1 inch", stok: 120 },
  { id: 9, nama: "Kran Air", stok: 80 },
  { id: 10, nama: "Seng Galvalum", stok: 60 },
  { id: 11, nama: "Cat Avian 1L", stok: 45 },
  { id: 12, nama: "Siku Besi", stok: 70 },
  { id: 13, nama: "Lem Fox", stok: 150 },
  { id: 14, nama: "Semen Putih", stok: 90 },
  { id: 15, nama: "Kabel Listrik 10m", stok: 75 },
  { id: 16, nama: "Tang Kombinasi", stok: 30 },
  { id: 17, nama: "Obeng Set", stok: 40 },
  { id: 18, nama: "Palu Besi", stok: 25 },
  { id: 19, nama: "Sapu Ijuk", stok: 100 },
  { id: 20, nama: "Ember Plastik", stok: 60 },
  { id: 21, nama: "Kawat Bendrat", stok: 50 },
  { id: 22, nama: "Kunci Inggris", stok: 25 },
  { id: 23, nama: "Cangkul", stok: 40 },
  { id: 24, nama: "Gerinda Tangan", stok: 15 },
  { id: 25, nama: "Paku Beton", stok: 90 },
];

const storedStocks = JSON.parse(localStorage.getItem("productStocks")) || {};
const products = defaultProducts.map(p => ({
  ...p,
  stok: storedStocks[p.id] ?? p.stok
}));

const tbody = document.getElementById("adminProductList");

function renderAdminTable() {
  tbody.innerHTML = "";
  products.forEach(prod => {
    const tr = document.createElement("tr");
    tr.className = "border-b";
    tr.innerHTML = `
      <td class="p-2">${prod.nama}</td>
      <td class="p-2 text-center">${prod.stok}</td>
      <td class="p-2 text-center">
        <input type="number" min="0" value="${prod.stok}" id="stok-${prod.id}" class="border p-1 w-20 text-center">
        <button class="bg-green-600 text-white px-2 py-1 ml-2 rounded" onclick="updateStok(${prod.id})">Simpan</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function updateStok(id) {
  const input = document.getElementById(`stok-${id}`);
  const newStok = parseInt(input.value);
  if (!isNaN(newStok) && newStok >= 0) {
    products.find(p => p.id === id).stok = newStok;
    const stokData = {};
    products.forEach(p => (stokData[p.id] = p.stok));
    localStorage.setItem("productStocks", JSON.stringify(stokData));
    alert("✅ Stok berhasil diperbarui!");
    renderAdminTable();
  }
}

renderAdminTable();
