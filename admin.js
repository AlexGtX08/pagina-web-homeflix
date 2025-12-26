async function protectAdmin() {
  const role = await getUserRole();
  if (role !== "admin") {
    alert("Acceso no autorizado");
    location.href = "index.html";
  }
}

let products = [];

async function loadProducts() {
  const { data } = await supabaseClient.from("productos").select("*");
  products = data || [];
  renderAdmin();
}

function renderAdmin() {
  adminTable.innerHTML = "";
  products.forEach(p => {
    adminTable.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.activate ? "✅" : "❌"}</td>
        <td>
          <button onclick="toggleProduct('${p.id}', ${!p.activate})">
            ${p.activate ? "Desactivar" : "Activar"}
          </button>
          <button onclick="deleteProduct('${p.id}')">🗑</button>
        </td>
      </tr>
    `;
  });
}

async function toggleProduct(id, status) {
  await supabaseClient.from("productos").update({ activate: status }).eq("id", id);
  loadProducts();
}

async function deleteProduct(id) {
  if (!confirm("¿Eliminar producto?")) return;
  await supabaseClient.from("productos").delete().eq("id", id);
  loadProducts();
}

async function addProduct() {
  await supabaseClient.from("productos").insert([{
    name: pName.value,
    description: pDesc.value,
    price: parseInt(pPrice.value),
    logo: pLogo.value,
    activate: true
  }]);
  pName.value = pDesc.value = pPrice.value = pLogo.value = "";
  loadProducts();
}

protectAdmin();
loadProducts();
