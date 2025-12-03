
const products = [
    { id: 1, title: "Wireless Headphones", owner: "TechGear Pro", price: 89.99, category: "Electronics", icon: "🎧", image: "images/p1.png" },
    { id: 2, title: "Smart Watch", owner: "Digital Dreams", price: 199.99, category: "Electronics", icon: "⌚", image: "images/p2.png" },
    { id: 3, title: "Denim Jacket", owner: "Fashion Hub", price: 59.99, category: "Clothing", icon: "🧥", image: "images/p3.png" },
    { id: 4, title: "Running Shoes", owner: "SportZone", price: 79.99, category: "Sports", icon: "👟", image: "images/p4.png" },
    { id: 5, title: "Coffee Maker", owner: "Home Essentials", price: 129.99, category: "Home", icon: "☕", image: "images/p5.png" },
    { id: 6, title: "The Great Novel", owner: "BookWorld", price: 24.99, category: "Books", icon: "📚", image: "images/p6.png" },
    { id: 7, title: "Laptop Backpack", owner: "TravelGear", price: 49.99, category: "Electronics", icon: "🎒", image: "images/p7.png" },
    { id: 8, title: "Yoga Mat", owner: "FitLife", price: 34.99, category: "Sports", icon: "🧘",image: "images/p8.png"  },
    { id: 9, title: "LED Desk Lamp", owner: "Bright Ideas", price: 39.99, category: "Home", icon: "💡", image: "images/p9.png" },
    { id: 10, title: "Bluetooth Speaker", owner: "SoundWave", price: 69.99, category: "Electronics", icon: "🔊", image: "images/p10.png" },
    { id: 11, title: "Winter Coat", owner: "Warm Wear", price: 149.99, category: "Clothing", icon: "🧥", image: "images/p11.png" },
    { id: 12, title: "Programming Guide", owner: "CodeBooks", price: 44.99, category: "Books", icon: "💻", image: "images/p12.png" },
    { id: 13, title: "Kitchen Knife Set", owner: "Chef's Choice", price: 89.99, category: "Home", icon: "🔪", image: "images/p13.png" },
    { id: 14, title: "Tennis Racket", owner: "ProSports", price: 119.99, category: "Sports", icon: "🎾", image: "images/p14.png" },
    { id: 15, title: "Sunglasses", owner: "Style Co", price: 54.99, category: "Clothing", icon: "🕶️", image: "images/p15.png" }
];


let filteredProducts = [...products];
let currentPage = 1;
const productsPerPage = 6;

function displayProducts() {
    const grid = document.getElementById('productGrid');
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const pageProducts = filteredProducts.slice(startIndex, endIndex);

    if (pageProducts.length === 0) {
        grid.innerHTML = '<div class="no-products">No products found matching your criteria.</div>';
    } else {
        grid.innerHTML = pageProducts.map((product, index) => `
            <div class="product-card" style="animation-delay: ${index * 0.1}s">

                <div class="product-image">
                    ${product.image
                ? `<img src="${product.image}" alt="${product.title}" style="width:100%; height:100%; object-fit:cover;">`
                : `${product.icon}`
            }
                </div>

                <div class="product-info">
                    <div class="product-title">${product.title}</div>
                    <div class="product-owner">${product.owner}</div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <span class="product-category">${product.category}</span>
                </div>

            </div>
        `).join('');
    }

    updateNavigation();
}


function updateNavigation() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage >= totalPages;
}

function nextPage() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function applyFilters() {
    const category = document.getElementById('categoryFilter').value;
    const maxPrice = parseFloat(document.getElementById('priceFilter').value) || Infinity;
    const searchTerm = document.getElementById('searchFilter').value.toLowerCase();

    filteredProducts = products.filter(product => {
        const matchesCategory = category === 'all' || product.category === category;
        const matchesPrice = product.price <= maxPrice;
        const matchesSearch = product.title.toLowerCase().includes(searchTerm) ||
            product.owner.toLowerCase().includes(searchTerm);

        return matchesCategory && matchesPrice && matchesSearch;
    });

    currentPage = 1;
    displayProducts();
}

function resetFilters() {
    document.getElementById('categoryFilter').value = 'all';
    document.getElementById('priceFilter').value = '';
    document.getElementById('searchFilter').value = '';
    filteredProducts = [...products];
    currentPage = 1;
    displayProducts();
}

displayProducts();