const addToCart = document.querySelectorAll('[data-btn-action="add-btn-cart"]');
const closeModal = document.querySelector('.jsModalClose');
const vaciarCarritoBtn = document.getElementById("vaciarCarritoBtn");

addToCart.forEach(btn => {
    btn.addEventListener('click', (event) => {
        const nameModal = event.target.getAttribute('data-modal');
        const modal = document.querySelector(nameModal);
        modal.classList.add('active');
    });
});

closeModal.addEventListener('click', (event) => {
    event.target.parentNode.parentNode.classList.remove('active');
});

window.onclick = (event) => {
    const modal = document.querySelector('.modal.active');
    if (event.target == modal) {
        modal.classList.remove('active');
    }
};

document.addEventListener("DOMContentLoaded", function () {
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
    }

    const addToCartButtons = document.querySelectorAll("[data-btn-action='add-btn-cart']");
    if (addToCartButtons) {
        addToCartButtons.forEach((button) => {
            button.addEventListener("click", agregarAlCarrito);
        });
    }
});

function vaciarCarrito() {
    const modalList = document.querySelector(".modal__list");

    
    modalList.innerHTML = "";

    actualizarTotalCarrito(0);

  
    actualizarEventListeners();
}

function agregarAlCarrito(event) {
    event.preventDefault();

    const productContainer = event.target.closest(".product-grid-item");
    const productName = productContainer.querySelector(".product-grid-name").textContent;
    const productPrice = parseFloat(productContainer.querySelector(".product-grid-price").textContent.replace("$", ""));

    const modalList = document.querySelector(".modal__list");
    const newCartItem = document.createElement("div");
    newCartItem.classList.add("modal__item");
    newCartItem.innerHTML = `
        <div class="modal__thumb">
            <img src="${productContainer.querySelector(".product-grid-imagen img").src}" alt="${productName}">
        </div>
        <div class="modal__text-product">
            <p>${productName}</p>
            <p><strong>$${productPrice.toFixed(3)}</strong></p>
        </div>
        <button class="btn-remove-product">Eliminar</button>
    `;

    modalList.appendChild(newCartItem);

    actualizarEventListenersDespuesDeAgregar();

    
    actualizarTotalCarrito(calcularTotalCarrito());
}

function calcularTotalCarrito() {
    const modalItems = document.querySelectorAll(".modal__item");
    let total = 0;

    modalItems.forEach((item) => {
        const priceString = item.querySelector(".modal__text-product strong").textContent;
        const price = parseFloat(priceString.replace("$", ""));
        total += price;
    });

    return total;
}

function actualizarTotalCarrito(total) {
    const totalCartElement = document.querySelector(".modal__total-cart");
    totalCartElement.textContent = `Total: $${total.toFixed(3)}`;
}

function actualizarEventListeners() {
    const deleteButtons = document.querySelectorAll(".btn-remove-product");

    deleteButtons.forEach((deleteButton) => {
        deleteButton.removeEventListener("click", eliminarProducto);
        deleteButton.addEventListener("click", eliminarProducto);
    });
}


function actualizarEventListenersDespuesDeAgregar() {
    actualizarEventListeners();
}

document.addEventListener("DOMContentLoaded", function () {
    const comprarAhoraBtn = document.querySelector(".modal__btns .btn-primary");

    if (comprarAhoraBtn) {
        comprarAhoraBtn.addEventListener("click", comprarAhora);
    }

    actualizarEventListeners();
});

function comprarAhora(event) {
    event.preventDefault();
    alert("¡Gracias por su compra!");

    vaciarCarrito();

    actualizarTotalCarrito(0);
}

function eliminarProducto(event) {
    event.preventDefault();
    const modalItem = event.target.closest(".modal__item");
    modalItem.remove();
    
    actualizarTotalCarrito(calcularTotalCarrito());
}
