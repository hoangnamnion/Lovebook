document.addEventListener('DOMContentLoaded', () => {
    const book = document.querySelector('.book');
    let pages = document.querySelectorAll('.page');
    let currentPage = 0;
    let startX = 0;
    let isDragging = false;

    // Khởi tạo z-index ban đầu
    function initializeZIndex() {
        pages = document.querySelectorAll('.page'); // Cập nhật lại danh sách trang
        const totalPages = pages.length;
        pages.forEach((page, index) => {
            page.style.zIndex = totalPages - index;
        });
    }
    initializeZIndex();

    // Hàm cập nhật z-index khi thêm trang mới
    function updateAllZIndex() {
        pages = document.querySelectorAll('.page'); // Cập nhật lại danh sách trang
        const totalPages = pages.length;
        pages.forEach((page, index) => {
            if (index < currentPage) {
                page.style.zIndex = totalPages - currentPage + index;
            } else if (index === currentPage) {
                page.style.zIndex = totalPages;
            } else {
                page.style.zIndex = totalPages - index;
            }
        });
    }

    // Xử lý sự kiện touch
    book.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    book.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;

        if (diff > 50 && currentPage < pages.length - 1) {
            flipPage('next');
            isDragging = false;
        }
        else if (diff < -50 && currentPage > 0) {
            flipPage('prev');
            isDragging = false;
        }
    });

    book.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Xử lý sự kiện chuột
    book.addEventListener('mousedown', (e) => {
        e.preventDefault();
        startX = e.clientX;
        isDragging = true;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const currentX = e.clientX;
        const diff = startX - currentX;

        if (diff > 50 && currentPage < pages.length - 1) {
            flipPage('next');
            isDragging = false;
        }
        else if (diff < -50 && currentPage > 0) {
            flipPage('prev');
            isDragging = false;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    document.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    function flipPage(direction) {
        if (direction === 'next' && currentPage < pages.length - 1) {
            pages[currentPage].classList.add('flipped');
            currentPage++;
            updateAllZIndex();
        } else if (direction === 'prev' && currentPage > 0) {
            currentPage--;
            pages[currentPage].classList.remove('flipped');
            updateAllZIndex();
        }
    }

    // Hiệu ứng trái tim rơi
    function createFallingHeart() {
        const hearts = document.querySelector('.falling-hearts');
        if (!hearts) return;
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.innerHTML = `<svg viewBox="0 0 32 29.6" width="32" height="32"><path fill="#ff6b81" d="M23.6,0c-2.7,0-5.1,1.3-6.6,3.3C15.5,1.3,13.1,0,10.4,0C4.7,0,0,4.7,0,10.4c0,6.1,5.2,11.1,13.1,18.2l2.2,2l2.2-2C26.8,21.5,32,16.5,32,10.4C32,4.7,27.3,0,23.6,0z"/></svg>`;
        heart.style.left = Math.random() * 96 + 'vw';
        heart.style.animationDuration = (2.8 + Math.random() * 1.5) + 's';
        hearts.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }
    setInterval(createFallingHeart, 500);
}); 