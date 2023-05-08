window.addEventListener("load", function () {
  let productName = document.querySelector("[name=name]");
  let productDescription = document.querySelector("[name=description]");
  let productDuration = document.querySelector("[name=duration]");
  let productFile = document.querySelector("[name=image]");
  let productPrice = document.querySelector("[name=price]")
  

  const validatePrice = (e) => {
    const field = e.target;
    const fieldValue = e.target.value;
    const regexPrice = new RegExp(
      /^[0-9]+([.][0-9]+)?$/i
    );
    if (fieldValue.trim().length === 0 || !regexPrice.test(fieldValue)) {
      field.classList.add("invalid");
      field.nextElementSibling.classList.add("error");
      field.nextElementSibling.innerText = "El campo precio debe ser numérico, mayor a 0 y no estar vacío.";
    } else {
      field.classList.remove("invalid");
      field.nextElementSibling.classList.remove("error");
      field.nextElementSibling.innerText = "";
    }
  };

  const validateField = (e) => {
    const field = e.target;
    const fieldValue = e.target.value;
    if (fieldValue.trim().length < 5) {
      field.classList.add("invalid");
      field.nextElementSibling.classList.add("error");
      field.nextElementSibling.innerText = `El campo ${field.placeholder} es obligatorio y debe tener al menos 5 caracteres`;
    } else {
      field.classList.remove("invalid");
      field.nextElementSibling.classList.remove("error");
      field.nextElementSibling.innerText = "";
    }
  };
  const validateFieldDescription = (e) => {
    const field = e.target;
    const fieldValue = e.target.value;
    if (fieldValue.trim().length < 5) {
      field.classList.add("invalid");
      field.nextElementSibling.classList.add("error");
      field.nextElementSibling.innerText = `El campo ${field.placeholder} es obligatorio y debe tener al menos 20 caracteres`;
    } else {
      field.classList.remove("invalid");
      field.nextElementSibling.classList.remove("error");
      field.nextElementSibling.innerText = "";
    }
  };
  productFile.addEventListener("change", (e) => {
    const field = e.target;
    const fileExt = e.target.files[0].name.split(".").pop().toLowerCase();
    const allowedExt = ["jpg", "jpeg", "png", "gif"];
    if (!allowedExt.includes(fileExt)) {
      field.classList.add("invalid");
      field.nextElementSibling.classList.add("error");
      field.nextElementSibling.innerText = `Los unicos formatos permitidos son ${allowedExt.join(
        ", "
      )}`;
    } else {
      field.classList.remove("invalid");
      field.nextElementSibling.classList.remove("error");
      field.nextElementSibling.innerText = "";
    }
  });

  productName.addEventListener("blur", validateField);
  productDescription.addEventListener("blur", validateFieldDescription);
  productDuration.addEventListener("blur", validateField);
  productPrice.addEventListener("blur", validatePrice);
});
