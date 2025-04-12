
const toggleBtn = document.getElementById("modeToggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "🌙";
    }
  });
}
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
  }
  loadAllSections();
});

const modal = document.getElementById("previewModal");
const modalImg = document.getElementById("modalImage");
const downloadBtn = document.getElementById("downloadBtn");
const closeModal = document.getElementById("closeModal");

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("previewable")) {
    modal.classList.remove("hidden");
    modalImg.src = e.target.src;
    downloadBtn.href = e.target.src;
  }
});
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  modalImg.src = "";
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    modal.classList.add("hidden");
    modalImg.src = "";
  }
});

function loadWallpapers(category, count) {
  const container = document.getElementById(`${category.toLowerCase()}-grid`);
  for (let i = container.children.length + 1; i <= count; i++) {
    if (i > 10) break;
    const img = document.createElement("img");
    img.src = `assets/images/${category}/${category.toLowerCase()}${i}.jpg`;
    img.alt = `${category} ${i}`;
    img.loading = "lazy";
    img.className = "previewable fade-in";
    container.appendChild(img);
  }
}

function loadAllSections() {
  ["Nature", "Abstract", "Anime"].forEach(cat => loadWallpapers(cat, 4));
}

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    ["Nature", "Abstract", "Anime"].forEach(cat => loadWallpapers(cat, 10));
  }
});

const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll(".wallpaper-grid img").forEach(img => {
      const tags = img.dataset.tags || "";
      const alt = img.alt.toLowerCase();
      if (alt.includes(query) || tags.includes(query)) {
        img.style.display = "";
      } else {
        img.style.display = "none";
      }
    });
  });
}
