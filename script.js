document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, title: "Botanical Glow Serum", owner: "PureSkin", category: "Skincare", price: 24.99, img: "./images/p1.png", sku: "PS-001", desc: "Lightweight vitamin C serum for radiant skin." },
        { id: 2, title: "Hydra Mist Toner", owner: "GreenAura", category: "Skincare", price: 14.50, img: "./images/p2.png", sku: "GA-010", desc: "Refreshing mist toner to balance and hydrate." },
        { id: 3, title: "Velvet Lipstick - Rose", owner: "LuxeMake", category: "Makeup", price: 12.00, img: "./images/p3.png", sku: "LM-501", desc: "Silky matte lipstick with lasting pigment." },
        { id: 4, title: "Nourish Hair Oil", owner: "HairBloom", category: "Hair", price: 19.99, img: "./images/p4.png", sku: "HB-220", desc: "Light oil blend for shine and nourishment." },
        { id: 5, title: "Bamboo Face Brush", owner: "EcoTools", category: "Accessories", price: 8.99, img: "./images/p5.png", sku: "ET-07", desc: "Soft bamboo brush for gentle exfoliation." },
        { id: 6, title: "Glow Highlighter Stick", owner: "LuxeMake", category: "Makeup", price: 15.00, img: "./images/p6.png", sku: "LM-302", desc: "Creamy stick highlighter for instant glow." },
        { id: 7, title: "Aloe Recovery Gel", owner: "PureSkin", category: "Skincare", price: 11.99, img: "./images/p7.png", sku: "PS-045", desc: "Cooling aloe gel for soothing irritated skin." },
        { id: 8, title: "Charcoal Detox Mask", owner: "GreenAura", category: "Skincare", price: 17.50, img: "./images/p8.png", sku: "GA-088", desc: "Purifying mask to clear pores and balance oil." },
        { id: 9, title: "Blush Tint Peach", owner: "LuxeMake", category: "Makeup", price: 9.99, img: "./images/p9.png", sku: "LM-241", desc: "Light cream blush tint for a natural flush." },
        { id: 10, title: "Keratin Repair Shampoo", owner: "HairBloom", category: "Hair", price: 13.49, img: "./images/p10.png", sku: "HB-341", desc: "Strengthening shampoo infused with keratin." },
        { id: 11, title: "Volumizing Hair Mousse", owner: "HairBloom", category: "Hair", price: 10.99, img: "./images/p11.png", sku: "HB-412", desc: "Lightweight mousse for added volume & lift." },
        { id: 12, title: "Eco Cotton Pads", owner: "EcoTools", category: "Accessories", price: 4.99, img: "./images/p12.png", sku: "ET-15", desc: "Reusable soft cotton pads for makeup removal." },
        { id: 13, title: "Compact Travel Mirror", owner: "EcoTools", category: "Accessories", price: 6.50, img: "./images/p13.png", sku: "ET-22", desc: "Portable foldable mirror for quick touch-ups." },
        { id: 14, title: "Matte Nude Lipstick", owner: "LuxeMake", category: "Makeup", price: 13.00, img: "./images/p14.png", sku: "LM-602", desc: "Long-lasting matte lipstick in nude shade." },
        { id: 15, title: "Hydrating Face Cream", owner: "PureSkin", category: "Skincare", price: 21.99, img: "./images/p15.png", sku: "PS-078", desc: "Daily moisturizer for soft and hydrated skin." }
    ];

    let startIndex = 0;
    const showCount = 3;
    const container = document.getElementById('productGrid');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartList = document.getElementById('cartList');
    const cartBtn = document.getElementById('cartBtn');
    const closeCartBtn = document.getElementById('closeCart');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');

    const searchInput = document.getElementById('search');
    const categoryList = document.getElementById('categoryList');
    const sortBy = document.getElementById('sortBy');

    let cart = [];
    let filteredProducts = [...products];

    function renderProducts() {
        container.innerHTML = '';
        const visible = filteredProducts.slice(startIndex, startIndex + showCount);

        visible.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${p.img}" alt="${p.title}">
                <h3>${p.title}</h3>
                <p>${p.owner}</p>
                <p><strong>$${p.price.toFixed(2)}</strong></p>
                <button class="add-cart" data-id="${p.id}">Add to Cart</button>
            `;
            container.appendChild(card);
        });

        prevBtn.disabled = startIndex === 0;
        nextBtn.disabled = startIndex + showCount >= filteredProducts.length;

        // Add cart buttons
        container.querySelectorAll('.add-cart').forEach(btn => {
            btn.addEventListener('click', e => addToCart(parseInt(e.currentTarget.dataset.id)));
        });
    }

    // --- Pagination ---
    nextBtn.addEventListener('click', () => { startIndex += showCount; renderProducts(); });
    prevBtn.addEventListener('click', () => { startIndex -= showCount; renderProducts(); });

    // --- Filters ---
    searchInput.addEventListener('input', applyFilters);

    categoryList.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', () => {
            categoryList.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            applyFilters();
        });
    });

    sortBy.addEventListener('change', applyFilters);

    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCat = document.querySelector('.category-item.active')?.dataset.cat || 'All';
        const sortVal = sortBy.value;

        filteredProducts = products.filter(p => {
            const matchesSearch = p.title.toLowerCase().includes(searchTerm) || p.owner.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCat === 'All' || p.category === selectedCat;
            return matchesSearch && matchesCategory;
        });

        if (sortVal === 'price-asc') filteredProducts.sort((a,b) => a.price - b.price);
        if (sortVal === 'price-desc') filteredProducts.sort((a,b) => b.price - a.price);
        if (sortVal === 'owner') filteredProducts.sort((a,b) => a.owner.localeCompare(b.owner));

        startIndex = 0;
        renderProducts();
    }

    // --- Cart ---
    function addToCart(id) {
        const existing = cart.find(c => c.id === id);
        if (existing) existing.qty++;
        else cart.push({ id, qty: 1 });
        renderCart();
        openCart();
    }

    function renderCart() {
        cartList.innerHTML = '';
        if (!cart.length) {
            cartList.innerHTML = '<p>Your cart is empty.</p>';
            subtotalEl.textContent = '$0.00';
            totalEl.textContent = '$0.00';
            return;
        }

        let subtotal = 0;
        cart.forEach(item => {
            const p = products.find(prod => prod.id === item.id);
            subtotal += p.price * item.qty;

            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `
                <img src="${p.img}" alt="${p.title}">
                <div class="cart-info">
                    <h4>${p.title}</h4>
                    <p>${p.owner}</p>
                    <p>$${(p.price * item.qty).toFixed(2)}</p>
                    <div>
                        <button class="decrease" data-id="${p.id}">-</button>
                        <span>${item.qty}</span>
                        <button class="increase" data-id="${p.id}">+</button>
                    </div>
                </div>
            `;
            cartList.appendChild(el);
        });

        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        totalEl.textContent = `$${(subtotal + 5).toFixed(2)}`; // shipping

        cartList.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', e => {
                const id = parseInt(e.currentTarget.dataset.id);
                cart.find(c => c.id === id).qty++;
                renderCart();
            });
        });

        cartList.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', e => {
                const id = parseInt(e.currentTarget.dataset.id);
                const item = cart.find(c => c.id === id);
                item.qty--;
                if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
                renderCart();
            });
        });

        document.getElementById('cartBadge').textContent = cart.reduce((a,b) => a+b.qty, 0);
    }

    function openCart() { cartSidebar.classList.add('open'); }
    function closeCart() { cartSidebar.classList.remove('open'); }

    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);

    renderProducts();
    renderCart();
});