const interesAnual = 0.25; 
let seguir = true;
const historialSimulaciones = []; 

function ingresarUsuario() {
  let nombre = "";
  while (nombre.trim() === "" || !isNaN(nombre)) {
    nombre = prompt("Bienvenido/a al simulador.\nPor favor, ingrese su nombre:");
    if (nombre === null) {
      alert("Cancelaste la operación.");
      return null;
    }
  }
  alert(`Hola ${nombre}, ¡comencemos con la simulación!`);
  return nombre;
}

function solicitarPrestamo() {
  let monto = parseFloat(prompt("Ingrese el monto que desea solicitar:"));
  while (isNaN(monto) || monto <= 0) {
    monto = parseFloat(prompt("Monto inválido. Ingrese un número mayor a 0:"));
  }

  let cuotas = parseInt(prompt("Ingrese la cantidad de cuotas (3, 6 o 12):"));
  while (![3, 6, 12].includes(cuotas)) {
    cuotas = parseInt(prompt("Cuotas inválidas. Solo puede elegir entre 3, 6 o 12:"));
  }

  return { monto, cuotas };
}

function calcularCuota(monto, cuotas) {
  const interesMensual = interesAnual / 12;
  const cuota = (monto * (1 + interesMensual * cuotas)) / cuotas;
  const total = cuota * cuotas;

  return { cuota: cuota.toFixed(2), total: total.toFixed(2) };
}

function mostrarResultado(monto, cuotas, cuota, total) {
  alert(
    `Resumen del préstamo:\n\n` +
    `Monto solicitado: $${monto}\n` +
    `Cuotas: ${cuotas}\n` +
    `Valor estimado por cuota: $${cuota}\n` +
    `Total a pagar: $${total}`
  );
}

// PROGRAMA PRINCIPAL
const usuario = ingresarUsuario();

if (usuario !== null) {
  while (seguir) {
    const datos = solicitarPrestamo();
    const resultado = calcularCuota(datos.monto, datos.cuotas);
    mostrarResultado(datos.monto, datos.cuotas, resultado.cuota, resultado.total);

    
    historialSimulaciones.push({
      monto: datos.monto,
      cuotas: datos.cuotas,
      cuotaMensual: resultado.cuota,
      total: resultado.total
    });

    
    const verHistorial = confirm("¿Deseás ver el historial de simulaciones en consola?");
    if (verHistorial) {
      console.log("📋 Historial actualizado:");
      historialSimulaciones.forEach((simulacion, index) => {
        console.log(
          `Simulación ${index + 1}: Monto $${simulacion.monto}, Cuotas ${simulacion.cuotas}, ` +
          `Cuota $${simulacion.cuotaMensual}, Total $${simulacion.total}`
        );
      });
    }

    seguir = confirm(`${usuario}, ¿deseás realizar otra simulación?`);
  }

  
  console.log("✅ Simulación finalizada. Gracias por usar el sistema.");
  console.log("📋 Historial final de simulaciones:");
  historialSimulaciones.forEach((simulacion, index) => {
    console.log(
      `Simulación ${index + 1}: Monto $${simulacion.monto}, Cuotas ${simulacion.cuotas}, ` +
      `Cuota $${simulacion.cuotaMensual}, Total $${simulacion.total}`
    );
  });
}