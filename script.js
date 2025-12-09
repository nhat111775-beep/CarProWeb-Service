document.addEventListener('DOMContentLoaded', () => {
    // === Variables ===
    const loginBtn = document.getElementById('loginBtn');
    const wholesalePrices = document.querySelectorAll('.wholesale-price strong');
    const searchTabs = document.querySelectorAll('.search-tab');
    const searchBtn = document.querySelector('.search-btn-group button');
    const navbar = document.querySelector('.navbar');
    const addCartBtns = document.querySelectorAll('.product-card button');
    const cartBadge = document.querySelector('.cart-icon .badge');
    
    let isLoggedIn = false;
    let cartCount = 0;

    // === Login Toggle (B2B Mode) ===
    loginBtn.addEventListener('click', () => {
        isLoggedIn = !isLoggedIn;
        
        if (isLoggedIn) {
            // Activate B2B View
            loginBtn.innerHTML = '<i class="fa-solid fa-user-check"></i> Gara Minh Tuấn';
            loginBtn.classList.remove('btn-outline');
            loginBtn.classList.add('btn-primary');
            
            // Reveal Prices
            wholesalePrices.forEach(price => {
                // Generate a random wholesale price for demo if it's purely masked strings
                if (price.textContent.includes('***')) {
                    // Logic to find retail price sibling and discount it by 20%
                    const retailPriceEl = price.closest('.price-box').querySelector('.retail-price strong');
                    const retailVal = parseInt(retailPriceEl.textContent.replace(/\D/g, ''));
                    const wholesaleVal = Math.floor(retailVal * 0.8);
                    price.textContent = wholesaleVal.toLocaleString('vi-VN') + '₫';
                    price.parentElement.classList.remove('blur-text');
                    price.parentElement.style.color = '#00f2fe'; // Highlight
                }
            });
            
            alert('Đăng nhập thành công! Chế độ B2B đã được kích hoạt. Bạn có thể xem giá sỉ.');
        } else {
            // Revert to Guest
            loginBtn.innerHTML = '<i class="fa-regular fa-user"></i> Đăng Nhập (B2B)';
            loginBtn.classList.add('btn-outline');
            loginBtn.classList.remove('btn-primary');
            
            // Blur Prices
            wholesalePrices.forEach(price => {
                price.textContent = '***.***.***₫';
                price.parentElement.classList.add('blur-text');
            });
        }
    });

    // === Sticky Navbar ===
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'var(--glass-bg)';
            navbar.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
        }
    });

    // === Search Tabs Logic ===
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all
            searchTabs.forEach(t => t.classList.remove('active'));
            // Add to clicked
            tab.classList.add('active');
            
            // Toggle Content (Simulated)
            const type = tab.getAttribute('data-type');
            const searchInputs = document.querySelector('.search-inputs');
            
            if (type === 'vin') {
                document.querySelector('.input-group:nth-child(2)').style.display = 'none'; // Hide Model Year
                document.querySelector('#make').innerHTML = '<option>Nhập số VIN</option>';
            } else {
                document.querySelector('.input-group:nth-child(2)').style.display = 'flex';
                document.querySelector('#make').innerHTML = `
                    <option value="">Chọn Hãng Xe</option>
                    <option>Toyota</option>
                    <option>Mercedes</option>
                    <option>VinFast (EV)</option>
                    <option>Ford</option>
                `;
            }
        });
    });

    // === Search Button Effect ===
    searchBtn.addEventListener('click', () => {
        searchBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang tìm...';
        setTimeout(() => {
            searchBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> Tìm Kiếm';
            const grid = document.getElementById('products');
            grid.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    });

    // === Cart Logic ===
    addCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            cartCount++;
            cartBadge.textContent = cartCount;
            
            // Button Feedback
            const originalText = this.textContent;
            this.textContent = 'Đã Thêm';
            this.style.background = '#10b981'; // Green
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = ''; // Reset
            }, 2000);
        });
    });

    // === Mobile Menu Toggle ===
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = '#0f172a';
            navLinks.style.padding = '20px';
            navLinks.style.textAlign = 'center';
        }
    });
});
