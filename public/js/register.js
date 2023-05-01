window.addEventListener("load", function () {
  //Capturar el formulario
  let formulario = document.querySelector(".formulario");
  let userFirstName = document.querySelector("[name=firstname]");
  let userLastname = document.querySelector("[name=lastname]");
  let userEmail = document.querySelector("[name=email]");
  let userPassword = document.querySelector("[name=password]");
  let userFile = document.querySelector("[name=avatar]");

  console.log(userFirstName, userLastname, userEmail, userPassword, userFile);

  const validateField = (e) => {
    const field = e.target;
    const fieldValue = e.target.value;
    if (fieldValue.trim().length === 0) {
      field.classList.add("invalid");
      field.nextElementSibling.classList.add("error");
      field.nextElementSibling.innerText = `Debes completar el campo ${field.placeholder}`;
    } else {
      field.classList.remove("invalid");
      field.nextElementSibling.classList.remove("error");
      field.nextElementSibling.innerText = "";
    }
  };

  const validateEmail = (e) => {
    const field = e.target;
    const fieldValue = e.target.value;
    const regexEmail = new RegExp(
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    );
    if (fieldValue.trim().length > 5 && !regexEmail.test(fieldValue)) {
      field.classList.add("invalid");
      field.nextElementSibling.classList.add("error");
      field.nextElementSibling.innerText = "Debes completar un email valido";
    } else {
      field.classList.remove("invalid");
      field.nextElementSibling.classList.remove("error");
      field.nextElementSibling.innerText = "";
    }
  };

  userFirstName.addEventListener("blur", validateField);
  userLastname.addEventListener("blur", validateField);
  userEmail.addEventListener("blur", validateField);
  userPassword.addEventListener("blur", validateField);

  userEmail.addEventListener("input", validateEmail);

  userFile.addEventListener("change", (e) => {
    const field = e.target;
    const fileExt = e.target.files[0].name.split(".").pop().toLowerCase();
    const allowedExt = ["jpg", "jpeg", "png", "gif"];
    if (!allowedExt.includes(fileExt)) {
      field.classList.add("invalid");
      field.nextElementSibling.classList.add("error");
      field.nextElementSibling.innerText = `Los unicos formatos permitidos son ${allowedExt.join(
        ","
      )}`;
    } else {
      field.classList.remove("invalid");
      field.nextElementSibling.classList.remove("error");
      field.nextElementSibling.innerText = "";
    }
  });
});
