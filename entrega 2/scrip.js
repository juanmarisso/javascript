const hamburguesas = [
  { nombre: "Krusty Burger", precio: 150.00, combo: 1 },
  { nombre: "Krusty Burger Doble", precio: 225.00, combo: 2 },
  { nombre: "Krusty Pollo", precio: 150.00, combo: 3 },
  { nombre: "Krusty Mega balde de Pollo", precio: 140.00, combo: 4 },
  { nombre: "Super Krusty", precio: 150.00, combo: 5 },
  { nombre: "Super Krusty Doble", precio: 180.00, combo: 6 },
  { nombre: "Super Krusty Triple", precio: 205.00, combo: 7 },
  { nombre: "Krusty Vegan", precio: 125.00, combo: 8 }
];

// DOM
const comboSelect = document.getElementById('combo');
const carritoDiv = document.getElementById('carrito');
const form = document.getElementById('pedidoForm');

// Estado del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Cargar combos al select
hamburguesas.forEach(hamb => {
  const option = document.createElement('option');
  option.value = hamb.combo;
  option.textContent = `${hamb.nombre} - $${hamb.precio.toFixed(2)}`;
  comboSelect.appendChild(option);
});

// Renderizar carrito
function renderCarrito() {
  if (carrito.length === 0) {
    carritoDiv.innerHTML = '<p>El carrito está vacío.</p>';
    return;
  }

  let total = 0;
  let html = '';

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    html += `
      <div class="carrito-item">
        <span>${item.nombre} x${item.cantidad}</span>
        <span>$${subtotal.toFixed(2)}</span>
        <button class="eliminar-btn" data-index="${index}">Eliminar</button>
      </div>
    `;
  });

  html += `
    <div class="carrito-total">
      Total: $${total.toFixed(2)}
    </div>
  `;

  carritoDiv.innerHTML = html;
}

// Guardar en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar productos
form.addEventListener('submit', e => {
  e.preventDefault();

  const comboId = parseInt(comboSelect.value);
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const producto = hamburguesas.find(h => h.combo === comboId);
  if (!producto) return alert('Combo inválido.');

  const item = carrito.find(p => p.nombre === producto.nombre);
  if (item) {
    item.cantidad += cantidad;
  } else {
    carrito.push({ nombre: producto.nombre, precio: producto.precio, cantidad });
  }

  guardarCarrito();
  renderCarrito();
  form.reset();
});

// Eliminar productos
carritoDiv.addEventListener('click', e => {
  if (e.target.classList.contains('eliminar-btn')) {
    const index = parseInt(e.target.dataset.index);
    carrito.splice(index, 1);
    guardarCarrito();
    renderCarrito();
  }
});

// Inicial
renderCarrito();