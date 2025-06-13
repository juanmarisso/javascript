const hamburguesas = [
  { nombre: "Krusty Burger", precio: 150.00, ingredientes: ['Carne', 'Queso'], combo: 1 },
  { nombre: "Krusty Burger Doble", precio: 225.00, ingredientes: ['Carne', 'Queso', 'Panceta'], combo: 2 },
  { nombre: "Krusty Pollo", precio: 150.00, ingredientes: ['Pollo', 'Queso'], combo: 3 },
  { nombre: "Krusty Mega balde de Pollo", precio: 140.00, ingredientes: ['Pollo', 'Queso', 'Aderezo'], combo: 4 },
  { nombre: "Super Krusty", precio: 150.00, ingredientes: ['Carne', 'Queso', 'huevo'], combo: 5 },
  { nombre: "Super Krusty Doble", precio: 180.00, ingredientes: ['Carne', 'Queso', 'huevo'], combo: 6 },
  { nombre: "Super Krusty Triple", precio: 205.00, ingredientes: ['Carne', 'Queso', 'huevo'], combo: 7 },
  { nombre: "Krusty Vegan", precio: 125.00, ingredientes: ['Espinaca', 'Soja'], combo: 8 }
];

const comboSelect = document.getElementById('combo');
hamburguesas.forEach(hamb => {
  const option = document.createElement('option');
  option.value = hamb.combo;
  option.textContent = `${hamb.nombre} - $${hamb.precio.toFixed(2)}`;
  comboSelect.appendChild(option);
});

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function renderCarrito() {
  const carritoDiv = document.getElementById('carrito');
  carritoDiv.innerHTML = '';

  if (carrito.length === 0) {
    carritoDiv.textContent = 'El carrito está vacío.';
    return;
  }

  carrito.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('carrito-item');
    div.textContent = `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`;
    carritoDiv.appendChild(div);
  });
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

document.getElementById('pedidoForm').addEventListener('submit', e => {
  e.preventDefault();

  const comboId = parseInt(comboSelect.value);
  const cantidad = parseInt(document.getElementById('cantidad').value);

  const hamburguesaSeleccionada = hamburguesas.find(h => h.combo === comboId);

  if (!hamburguesaSeleccionada) return alert('Combo inválido.');

  carrito.push({
    nombre: hamburguesaSeleccionada.nombre,
    precio: hamburguesaSeleccionada.precio,
    cantidad: cantidad
  });

  guardarCarrito();
  renderCarrito();

  e.target.reset();
});

renderCarrito();