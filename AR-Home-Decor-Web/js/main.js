// Main application script
document.addEventListener('DOMContentLoaded', function() {
    // Navigation drawer toggle
    const menuBtn = document.getElementById('menuBtn');
    const drawer = document.getElementById('drawer');
    
    if (menuBtn && drawer) {
        menuBtn.addEventListener('click', function() {
            drawer.classList.toggle('translate-x-0');
            drawer.classList.toggle('-translate-x-full');
        });
    }

    // Close drawer when clicking outside
    document.addEventListener('click', function(e) {
        if (drawer && !drawer.contains(e.target) && e.target !== menuBtn) {
            drawer.classList.remove('translate-x-0');
            drawer.classList.add('-translate-x-full');
        }
    });

    // Sample product data
    const products = [
        {
            id: 1,
            name: "Modern Sofa",
            price: 599.99,
            rating: 4.5,
            reviews: 24,
            icon: "fa-couch"
        },
        {
            id: 2,
            name: "Accent Chair",
            price: 249.99,
            rating: 5,
            reviews: 36,
            icon: "fa-chair"
        },
        {
            id: 3,
            name: "Modern Lamp",
            price: 129.99,
            rating: 5,
            reviews: 42,
            icon: "fa-lightbulb"
        }
    ];

    // Render featured products on homepage
    const featuredContainer = document.querySelector('.grid');
    if (featuredContainer) {
        products.forEach(product => {
            const productCard = `
                <div class="product-card bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
                    <div class="h-48 bg-gray-200 flex items-center justify-center">
                        <i class="fas ${product.icon} text-6xl text-gray-400"></i>
                    </div>
                    <div class="p-4">
                        <h3 class="font-bold text-lg mb-1">${product.name}</h3>
                        <div class="flex items-center mb-2">
                            ${renderRating(product.rating)}
                            <span class="text-gray-500 text-sm ml-1">(${product.reviews})</span>
                        </div>
                        <p class="text-gray-700 mb-3">$${product.price.toFixed(2)}</p>
                        <a href="product-detail.html?id=${product.id}" class="block w-full bg-blue-600 text-white py-2 text-center rounded hover:bg-blue-700">
                            View Details
                        </a>
                    </div>
                </div>
            `;
            featuredContainer.innerHTML += productCard;
        });
    }

    // Helper function to render star ratings
    function renderRating(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star text-yellow-400"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
        }
        
        return stars;
    }

    // Simple cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            const product = products.find(p => p.id === productId);
            
            if (product) {
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`${product.name} added to cart!`);
            }
        });
    });
});