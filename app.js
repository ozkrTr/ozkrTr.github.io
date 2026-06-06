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

function mostrarMensajes() {
    contenedorMensajes.innerHTML = "";

    listaMensajes.forEach(mensaje => {
        contenedorMensajes.innerHTML += `<p class="form__message"><strong>Nombre: </strong> ${mensaje.nombre} | <strong>Email: </strong>${mensaje.email}</p>`;   
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
