// Wait for page to load
document.addEventListener('DOMContentLoaded', function(){

  // 1. Footer year - REQUIRED
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Accordion for FAQ/Services page - You had this, keep it
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      header.nextElementSibling.classList.toggle('active');
    });
  });

  // 3. Gallery Lightbox - ADD THIS, you were missing
  document.querySelectorAll('.lightbox-thumb').forEach(img => {
    img.addEventListener('click', () => {
      const lightbox = document.getElementById('lightbox');
      const lightboxImg = document.getElementById('lightbox-img');
      if(lightbox && lightboxImg){
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      }
    });
  });

  // 4. Dynamic Menu + Search/Filter - THIS IS 10 MARKS, you were missing
  const bakeryData = [
    { title: "Chocolate Cake", category: "cakes", price: 350, description: "Rich chocolate cake - R350" },
    { title: "Vanilla Birthday Cake", category: "cakes", price: 300, description: "Birthday special - R300" },
    { title: "Wedding Cake", category: "cakes", price: 1500, description: "Custom wedding cakes from R1500" },
    { title: "Sourdough Loaf", category: "pastries", price: 45, description: "Fresh sourdough - R45" },
    { title: "Croissant", category: "pastries", price: 25, description: "Buttery croissant - R25" },
    { title: "Blueberry Muffin", category: "pastries", price: 30, description: "Blueberry muffin - R30" }
  ];

  const container = document.getElementById('content-container');

  function loadContent(items){
    if(!container) return;
    container.innerHTML = "";
    items.forEach(item => {
      container.innerHTML += `
        <div class="card fade-in show">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <a href="enquiries.html"><button>Order Now</button></a>
        </div>`;
    });
  }

  // Make these global so HTML onkeyup can find them
  window.filterContent = function(){
    const q = document.getElementById('searchInput').value.toLowerCase();
    const filtered = bakeryData.filter(d => 
      d.title.toLowerCase().includes(q) || d.category.includes(q)
    );
    loadContent(filtered);
  }

  window.sortContent = function(){
    const sortBy = document.getElementById('sortSelect').value;
    let sorted = [...bakeryData].sort((a,b) => 
      sortBy === 'price' ? a.price - b.price : a.title.localeCompare(b.title)
    );
    loadContent(sorted);
  }

  loadContent(bakeryData);

  // 5. Fade-in animation on scroll
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.fade-in').forEach(el => {
      if(el.getBoundingClientRect().top < window.innerHeight - 50) {
        el.classList.add('show');
      }
    });
  });

  // 6. Map for index.html 
  var mapEl = document.getElementById('map');
  if(mapEl && typeof L !== 'undefined'){
    var map = L.map('map').setView([-25.7479, 28.2293], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);
    L.marker([-25.7479, 28.2293]).addTo(map).bindPopup("Tumi's Bakery, Pretoria").openPopup();
  }

});

// 7. Modal - Keep outside DOMContentLoaded so onclick can access it
function openModal(id){ 
  const el = document.getElementById(id);
  if(el) el.style.display = 'block'; 
}
function closeModal(id){ 
  const el = document.getElementById(id);
  if(el) el.style.display = 'none'; 
}