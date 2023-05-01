// window.addEventListener("load", function () {
//   // Capturar el formulario
//   let formulario = document.querySelector(".formulario");

//   formulario.addEventListener("submit", function (evento) {
//     if (!validaciones(evento)) {
//       evento.preventDefault();
//     } else {
//       formulario.submit();
//     }

//     function validaciones(evento) {
//       // Destructuring

//       let { email, password } = formulario.elements;
//       let errores = [];
//       console.log(formulario.elements.email.value);

//       //Validar el email con expresiones regulares
//       let reEmail =
//         /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//       if (!reEmail.test(email.value)) {
//         errores.push("El email es inválido");
//         email.classList.add("error");
//         email.insertAdjacentHTML(
//           "afterend",
//           '<div class="error-message">El campo nombre no puede estar vacío</div>'
//         );
//         //errores['last_name'] = 'El campo nombre no puede estar vacio...';
//       } else {
//         email.classList.add("es-valido");
//         email.classList.remove("error");
//       }

//       let rePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
//       if (!rePassword.test(password.value)) {
//         errores.push(
//           "La contraseña como mínimo debe tener seis caracteres, al menos una letra y un número"
//         );
//         password.classList.add("es-valido");
//         //errores['last_name'] = 'El campo nombre no puede estar vacio...';
//       } else {
//         password.classList.add("es-valido");
//         password.classList.remove("error");
//       }

//       //Aquí enviamos los errores al usuario
//       let ulErrores = document.getElementById("errores");
//       ulErrores.classList.add("alert-danger");
//       if (errores.length > 0) {
//         evento.preventDefault();
//         ulErrores.innerHTML = "";
//         for (let i = 0; i < errores.length; i++) {
//           ulErrores.innerHTML += `<li> ${errores[i]} </li> `;
//         }
//         errores = [];
//       } else {
//         return true;
//       }
//     }
//   });
// });

//segunda prueba
// window.addEventListener("load", function () {
//   // Capturar el formulario
//   let formulario = document.querySelector("#formulario");

//   formulario.addEventListener("submit", function (evento) {
//     // Validar email
//     let emailInput = formulario.elements.email;
//     if (emailInput.value === "" || !emailInput.checkValidity()) {
//       emailInput.classList.add("error");
//       mostrarError("El correo electrónico es inválido");
//       evento.preventDefault();
//       return false;
//     } else {
//       emailInput.classList.remove("error");
//     }

//     // Validar contraseña
//     let passwordInput = formulario.elements.password;
//     if (passwordInput.value === "") {
//       passwordInput.classList.add("error");
//       mostrarError("La contraseña no puede estar vacía");
//       evento.preventDefault();
//       return false;
//     } else {
//       passwordInput.classList.remove("error");
//     }
//   });

//   function mostrarError(mensaje) {
//     let errorMensaje = document.querySelector("#error-message");
//     errorMensaje.innerHTML = mensaje;
//   }
// });

//tercera prueba

const formulario = document.getElementById("formulario");
const emailInput = document.getElementsByName("email")[0];
const passwordInput = document.getElementsByName("password")[0];
const errorMessage = document.getElementById("error-message");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  if (!validarEmail() || !validarPassword()) {
    errorMessage.innerHTML = "Los datos ingresados son inválidos";
  } else {
    errorMessage.innerHTML = "";
    formulario.submit();
  }
});

function validarEmail() {
  const email = emailInput.value.trim();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    emailInput.classList.add("error");
    emailInput.insertAdjacentHTML(
      "afterend",
      '<div class="error-message">El correo electrónico no es válido</div>'
    );
    return false;
  } else {
    emailInput.classList.remove("error");
    let errorMensaje = emailInput.nextElementSibling;
    if (errorMensaje && errorMensaje.classList.contains("error-message")) {
      errorMensaje.remove();
    }
    return true;
  }
}

function validarPassword() {
  const password = passwordInput.value.trim();
  const regexPassword = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{4,}$/;
  if (!regexPassword.test(password)) {
    passwordInput.classList.add("error");
    passwordInput.insertAdjacentHTML(
      "afterend",
      '<div class="error-message">La contraseña debe tener al menos 4 caracteres, sin letras mayusculas y al menos un número</div>'
    );
    return false;
  } else {
    passwordInput.classList.remove("error");
    let errorMensaje = passwordInput.nextElementSibling;
    if (errorMensaje && errorMensaje.classList.contains("error-message")) {
      errorMensaje.remove();
    }
    return true;
  }
}
