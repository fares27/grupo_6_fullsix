window.addEventListener("load", function () {
// Selecciona todos los artículos
const productos = document.querySelectorAll('.producto-item');

// Itera sobre cada tercer artículo y le aplica un color de fondo diferente
for (let i = 0; i < productos.length; i += 3) {
  productos[i].classList.add('color-1');
  if (productos[i + 1]) {
    productos[i + 1].classList.add('color-2');
  }
  if (productos[i + 2]) {
    productos[i + 2].classList.add('color-3');
  }
}});
