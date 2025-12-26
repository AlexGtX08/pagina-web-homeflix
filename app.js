let products = [];
let cart = [];

/* ===== AUTH ===== */
async function checkAuth() {
  const role = await getUserRole();
  const authStatus = document.getElementById("authStatus");

  if (role) {
    authStatus.innerHTML = `
      <span>Sesión activa</span>
      <button class="logout-btn" onclick="logout()">Salir</button>
      ${role === "admin" ? `<button class="btn-primary" onclick="location.href='admin.html'">Admin</button>` : ""}
    `;
  } else {
    authStatus.innerHTML = `
      <button class="btn-primary" onclick="location.href='login.html'">Iniciar sesión</button>
    `;
  }
}

/* ===== PRODUCTS ===== */
async function loadProducts() {
  const { data } = await supabaseClient.from("productos").select("*");
  products = data || [];
  renderProducts();
}

function renderProducts() {
  productsGrid.innerHTML = "";
  products.filter(p => p.activate).forEach(p => {
    productsGrid.innerHTML += `
      <div class="product-card">
        <h3>${p.name}</h3>
        <p>${p.description || ""}</p>
        <div class="price">$${p.price.toLocaleString("es-CO")} COP</div>
        <button class="add-btn" onclick="addToCart('${p.name}', ${p.price})">Agregar</button>
      </div>
    `;
  });
}

/* ===== CART ===== */
// (todo tu código de carrito sin cambios)
// addToCart, renderCart, sendWhatsApp, etc.

/* ===== TMDB ===== */
// loadTMDB, renderTMDB, playTrailer, closeVideo

checkAuth();
loadProducts();
loadTMDB();
