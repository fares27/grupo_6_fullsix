window.addEventListener("load", function () {
  let userEmail = document.querySelector("[name=email]");
  let userPassword = document.querySelector("[name=password]");

  const validateEmail = (e) => {
    const field = e.target;
    const fieldValue = e.target.value;
    const regexEmail = new RegExp(
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    );
    if (fieldValue.trim().length === 0 || !regexEmail.test(fieldValue)) {
      field.classList.add("invalid");
      field.nextElementSibling.classList.add("error");
      field.nextElementSibling.innerText = "Debes completar un email valido";
    } else {
      field.classList.remove("invalid");
      field.nextElementSibling.classList.remove("error");
      field.nextElementSibling.innerText = "";
    }
  };
  const validatePassword = (e) => {
    const field = e.target;
    const fieldValue = e.target.value;
    const regexPassword = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/
    );
    if (fieldValue.trim().length === 0 || !regexPassword.test(fieldValue)) {
      field.classList.add("invalid");
      field.nextElementSibling.classList.add("error");
      field.nextElementSibling.innerText = `La contraseña deberá tener al menos 8 caracteres, una letra mayusculas, una letra minuscula, un número y un caracter especial`;
    } else {
      field.classList.remove("invalid");
      field.nextElementSibling.classList.remove("error");
      field.nextElementSibling.innerText = "";
    }
  };

  userEmail.addEventListener("blur", validateEmail);

  userPassword.addEventListener("blur", validatePassword);
});
