// Cart state
const cart = [];
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeCartButton = document.getElementById('close-cart');

// Open Cart
function openCart() {
    cartOverlay.classList.add('open');
}

// Close Cart
closeCartButton.addEventListener('click', () => {
    cartOverlay.classList.remove('open');
});

// Add to Cart Function
function addToCart(productName, price) {
    // Remove currency symbols and whitespace
    price = price.replace(/[^\d.]/g, ''); 
    cart.push({ productName, price: parseFloat(price) });
    updateCart();
    openCart();
}

// Remove from Cart Function
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Update Cart Function
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        // Create Cart Item Element
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.productName} - ₹${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Fix currency format
    document.querySelector('#cart-total').parentNode.innerHTML = `Total: ₹<span id="cart-total">${total.toFixed(2)}</span>`;
}

// Attach 'Add to Cart' to Buttons
document.querySelectorAll('.product-card button').forEach((button, index) => {
    button.addEventListener('click', () => {
        const productName = document.querySelectorAll('.product-card h3')[index].innerText;
        const price = document.querySelectorAll('.product-card p')[index].innerText;
        addToCart(productName, price);
    });
});
// Login state
const loginOverlay = document.getElementById('login-overlay');
const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const closeLoginButton = document.getElementById('close-login');

// Open Login Form
function openLogin() {
    loginOverlay.classList.add('open');
}

// Close Login Form
closeLoginButton.addEventListener('click', () => {
    loginOverlay.classList.remove('open');
});

// Show Login Form
function showLogin() {
    loginForm.style.display = 'flex';
    signupForm.style.display = 'none';
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
}

// Show Signup Form
function showSignup() {
    loginForm.style.display = 'none';
    signupForm.style.display = 'flex';
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
}

// Add to Login Button in Header
document.querySelector('nav ul li:nth-child(6) a').addEventListener('click', (e) => {
    e.preventDefault();
    openLogin();
});
// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        // Simulate form submission success (replace with backend call if needed)
        formStatus.textContent = 'Thank you! Your message has been sent.';
        formStatus.style.color = '#4caf50';

        // Clear form after submission
        contactForm.reset();

        setTimeout(() => {
            formStatus.textContent = '';
        }, 3000);
    } else {
        formStatus.textContent = 'Please fill in all fields.';
        formStatus.style.color = '#ff4f4f';
    }
});
function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    alert(`Order placed successfully! Total: $${total.toFixed(2)}`);
    
    // Clear cart after order
    cart = [];
    total = 0;
    updateCart();
}
const cartLink = document.getElementById('cart-link');

cartLink.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    openCart(); // Open the cart when clicked
});
const shopNowButton = document.getElementById('shop-now-btn');

shopNowButton.addEventListener('click', () => {
    // Scroll smoothly to the product section
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
});
//carousek countainer
document.querySelectorAll('.carousel-container').forEach(container => {
    const track = container.querySelector('.carousel-track');
    const leftBtn = container.querySelector('.left-btn');
    const rightBtn = container.querySelector('.right-btn');

    // Calculate product width (including gap)
    const productWidth = track.querySelector('.product-card').offsetWidth + 20;
    let currentPosition = 0;

    leftBtn.addEventListener('click', () => {
        currentPosition += productWidth;
        if (currentPosition > 0) {
            currentPosition = -(track.scrollWidth - container.offsetWidth);
        }
        track.style.transform = `translateX(${currentPosition}px)`;
    });

    rightBtn.addEventListener('click', () => {
        currentPosition -= productWidth;
        const maxScroll = -(track.scrollWidth - container.offsetWidth);
        if (currentPosition < maxScroll) {
            currentPosition = 0;
        }
        track.style.transform = `translateX(${currentPosition}px)`;
    });
});
//search button
const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.toLowerCase();

    // Select all product cards
    const products = document.querySelectorAll('.product-card');

    let found = false;

    products.forEach(product => {
        const productName = product.querySelector('h3').innerText.toLowerCase();

        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
            found = true;
        } else {
            product.style.display = 'none';
        }
    });

    if (!found) {
        // If no products are found, you can show a "No results found" message
        if (!document.getElementById('no-results')) {
            const noResults = document.createElement('p');
            noResults.id = 'no-results';
            noResults.innerText = 'No products found.';
            noResults.style.color = '#ff4f4f';
            noResults.style.textAlign = 'center';
            noResults.style.fontSize = '18px';
            document.getElementById('products').appendChild(noResults);
        }
    } else {
        // Remove "No results" message if product is found
        const noResults = document.getElementById('no-results');
        if (noResults) {
            noResults.remove();
        }
    }
});
