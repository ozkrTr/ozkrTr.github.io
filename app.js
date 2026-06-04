// ==========================================================
// NUEVO SELECTOR: Al inicio de tu archivo
// ==========================================================
// 1. Ve a tu index.html, busca la sección de contacto y agrega un <div> vacío 
//    abajo del formulario con el id="contenedorMensajes".
// 2. Aquí en app.js, crea la constante para seleccionar ese nuevo contenedor por su ID.




// ==========================================================
// COMPORTAMIENTO AUTOMÁTICO (Efecto de Persistencia)
// ==========================================================
// 1. AL CARGAR LA PÁGINA: Ejecuta la función 'mostrarMensajes()' al final de tu archivo 
//    (fuera de todo) para que pinte los datos que recuperó el LocalStorage al abrir el sitio.
//
// 2. AL ENVIAR EL FORMULARIO: Dentro de tu evento submit (en el bloque de ÉXITO),
//    justo después de guardar en LocalStorage, llama también a 'mostrarMensajes()' 
//    para que la pantalla se actualice en tiempo real sin tener que recargar.
const formularioContacto = document.getElementById("formularioContacto");
const inputNombre = document.getElementById("txtName");
const inputEmail = document.getElementById("txtEmail");
const contenedorMensajes = document.getElementById('contenedorMensajes');

let listaMensajes = localStorage.getItem("mensajes")
  ? JSON.parse(localStorage.getItem("mensajes"))
  : [];

function validarCampos(nombre, email) {
  if (nombre == "" || email == "") {
    alert("Por favor, llena todos los campos");
    return false;
  } else if (nombre.length < 3) {
    alert("El nombre debe tener almenos 3 letras");
    return false;
  } else {
    return true;
  }
}

// ==========================================================
// NUEVA FUNCIÓN: Al final de tu archivo (Responsabilidad Única)
// ==========================================================
// Crea una función llamada 'mostrarMensajes' (no necesita recibir parámetros):
// REGLAS DENTRO DE LA FUNCIÓN:
// -> A. Limpia el contenedor HTML para que no se dupliquen los datos antiguos:
//       (Asigna contenedorMensajes.innerHTML = "";)
// -> B. Usa el método .forEach() para recorrer 'listaMensajes'.
// -> C. Por cada 'mensaje' dentro del bucle:
//       - Suma contenido a contenedorMensajes.innerHTML usando el operador '+='.
//       - Inserta una estructura maquetada con Template Literals (comillas invertidas ``).
//         Ejemplo: `<p><strong>${mensaje.nombre}</strong> (${mensaje.email})</p>`

function mostrarMensajes() {
    contenedorMensajes.innerHTML = "";

    listaMensajes.forEach(mensaje => {
        contenedorMensajes.innerHTML += `<p class="form__message"><strong>Nombre: ${mensaje.nombre}</strong>, Email: ${mensaje.email}</p>`;   
    });
}

mostrarMensajes();

formularioContacto.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = inputNombre.value.trim();
  const email = inputEmail.value.trim();

  if (validarCampos(nombre, email)) {
    
    const nuevoMensaje = {
      nombre: nombre,
      email: email,
    };

    listaMensajes.push(nuevoMensaje);
    localStorage.setItem('mensajes', JSON.stringify(listaMensajes));

    console.log("Historial de mensajes: ", listaMensajes);
    mostrarMensajes();

    alert("¡Formulario validado correctamente!");
    formularioContacto.reset();
  }
});
