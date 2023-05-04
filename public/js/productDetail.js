window.addEventListener("load", function () {
    // Selecciona todos los artículos
    const productos = document.querySelectorAll('.producto-item');
    const contratar = document.querySelectorAll('.boton-producto-item');

    // Itera sobre cada tercer artículo y le aplica un color de fondo diferente
    for (let i = 0; i < productos.length; i += 3) {
        productos[i].classList.add('color-1');
        if (productos[i + 1]) {
            productos[i + 1].classList.add('color-2');
        }
        if (productos[i + 2]) {
            productos[i + 2].classList.add('color-3');
        }
    }
    for (let i = 0; i < contratar.length; i += 3) {
        contratar[i].classList.add('color-1');
        if (contratar[i + 1]) {
            contratar[i + 1].classList.add('color-2');
        }
        if (contratar[i + 2]) {
            contratar[i + 2].classList.add('color-3');
        }
    }

});
