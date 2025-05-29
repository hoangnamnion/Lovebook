document.addEventListener('DOMContentLoaded', () => {
    const book = document.querySelector('.book');
    const pages = document.querySelectorAll('.page');
    let currentPage = 0;
    let startX = 0;
    let isDragging = false;

    // Xử lý sự kiện touch
    book.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    book.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;

        // Lật trang từ phải sang trái
        if (diff > 50 && currentPage < pages.length - 1) {
            flipPage('next');
            isDragging = false;
        }
        // Lật trang từ trái sang phải
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

        // Lật trang từ phải sang trái
        if (diff > 50 && currentPage < pages.length - 1) {
            flipPage('next');
            isDragging = false;
        }
        // Lật trang từ trái sang phải
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

    // Hàm lật trang
    function flipPage(direction) {
        if (direction === 'next' && currentPage < pages.length - 1) {
            pages[currentPage].classList.add('flipped');
            currentPage++;
        } else if (direction === 'prev' && currentPage > 0) {
            currentPage--;
            pages[currentPage].classList.remove('flipped');
        }
        
        // Cập nhật hiệu ứng 3D cho cuốn sách
        book.style.transform = `rotateX(10deg) rotateY(${currentPage * 5}deg)`;
    }

    // Thêm hiệu ứng loading cho hình ảnh
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease-in-out';
    });
}); 