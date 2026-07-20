// =========================
// CATEGORY SIDEBAR
// =========================

const categoryFilterBtn = document.getElementById('categoryFilterBtn');
const categorySidebar = document.getElementById('categorySidebar');
const categoryOverlay = document.getElementById('categoryOverlay');
const closeCategorySidebar = document.getElementById('closeCategorySidebar');
const categorySearch = document.getElementById('categorySearch');
const categoryLinks = document.querySelectorAll('.category-list a');

// Open sidebar
categoryFilterBtn?.addEventListener('click', () => {
    categorySidebar.classList.add('active');
    categoryOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close sidebar
function closeSidebar() {
    categorySidebar.classList.remove('active');
    categoryOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

closeCategorySidebar?.addEventListener('click', closeSidebar);
categoryOverlay?.addEventListener('click', closeSidebar);

// Close after selecting a category
categoryLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeSidebar();
    });
});

// Search categories
categorySearch?.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();

    categoryLinks.forEach(link => {
        const text = link.textContent.toLowerCase();
        link.style.display = text.includes(value) ? 'flex' : 'none';
    });
});
