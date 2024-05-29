document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const total = document.getElementById('total');
    const cartCount = document.getElementById('cart-count');
    let cart = [];
    let totalPrice = 0;

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.parentElement;
            const id = product.getAttribute('data-id');
            const price = parseFloat(product.getAttribute('data-price'));
            const name = product.querySelector('h3').innerText;

            addToCart(id, name, price);
        });
    });

    function addToCart(id, name, price) {
        const existingProduct = cart.find(item => item.id === id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        updateCart();
    }

    function updateCart() {
        cartItems.innerHTML = '';
        totalPrice = 0;
        let itemCount = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} - $${item.price} x ${item.quantity} <button data-id="${item.id}">Eliminar</button>`;
            cartItems.appendChild(li);
            totalPrice += item.price * item.quantity;
            itemCount += item.quantity;

            li.querySelector('button').addEventListener('click', () => {
                removeFromCart(item.id);
            });
        });

        total.innerText = totalPrice.toFixed(2);
        cartCount.innerText = itemCount;
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        updateCart();
    }

    document.getElementById('play-button').addEventListener('click', function() {
        var audio = document.getElementById('background-music');
        audio.volume = 0.2;
        audio.play();
    });
    
});
