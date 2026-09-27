document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initGlobalSearch();
  initCodeCopyButtons();
});

function initNavigation() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-links a");
  
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navContainer = document.querySelector(".nav-links");
  if (mobileBtn && navContainer) {
    mobileBtn.addEventListener("click", () => {
      navContainer.classList.toggle("mobile-open");
    });
}
}

function initGlobalSearch() {
  const searchModal = document.getElementById("search-modal");
  const searchTrigger = document.querySelector(".search-trigger-btn");
  const searchInput = document.getElementById("global-search-input");
  const searchResults = document.getElementById("search-results-list");

  if (!searchModal || !searchTrigger || !searchInput || !searchResults) return;

  function openSearch() {
    searchModal.classList.add("active");
    searchInput.value = "";
    renderSearchResults("");
    setTimeout(() => searchInput.focus(), 50);
  }

  function closeSearch() {
    searchModal.classList.remove("active");
  }

  searchTrigger.addEventListener("click", openSearch);

  searchModal.addEventListener("click", (e) => {
    if (e.target === searchModal) {
      closeSearch();
    }
  });

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (searchModal.classList.contains("active")) {
        closeSearch();
      } else {
        openSearch();
      }
    }
    if (e.key === "Escape" && searchModal.classList.contains("active")) {
      closeSearch();
    }
  });

  searchInput.addEventListener("input", (e) => {
    renderSearchResults(e.target.value.trim().toLowerCase());
  });

  function renderSearchResults(query) {
    searchResults.innerHTML = "";

    const results = [];

    if (typeof HARDWARE_DATA !== "undefined") {
      HARDWARE_DATA.boards.forEach((b) => {
        if (!query || b.name.toLowerCase().includes(query) || b.architecture.toLowerCase().includes(query) || b.vendor.toLowerCase().includes(query) || b.summary.toLowerCase().includes(query)) {
          results.push({
            title: b.name,
            category: "Board (" + b.category.toUpperCase() + ")",
            url: "board-detail.html?id=" + encodeURIComponent(b.id),
            desc: b.architecture + " | " + b.clockSpeed + " | " + b.vendor
          });
        }
      });

      HARDWARE_DATA.sensors.forEach((s) => {
        if (!query || s.name.toLowerCase().includes(query) || s.type.toLowerCase().includes(query) || s.measures.toLowerCase().includes(query)) {
          results.push({
            title: s.name,
            category: "Sensor (" + s.type + ")",
            url: "sensors.html#" + encodeURIComponent(s.id),
            desc: s.interface + " | " + s.measures
          });
        }
      });

      HARDWARE_DATA.protocols.forEach((p) => {
        if (!query || p.name.toLowerCase().includes(query) || p.summary.toLowerCase().includes(query)) {
          results.push({
            title: p.name,
            category: "Protocol",
            url: "protocols.html#" + encodeURIComponent(p.id),
            desc: p.wires + " | " + p.maxSpeed
          });
        }
      });
    }

    if (results.length === 0) {
      searchResults.innerHTML = '<div>No hardware, sensor, or protocol matching "<strong>' + escapeHtml(query) + '</strong>"</div>';
      return;
    }

    results.slice(0, 10).forEach((item) => {
      const a = document.createElement("a");
      a.className = "search-item";
      a.href = item.url;
      a.innerHTML = `
        <div class="search-item-info">
          <span class="search-item-title">${escapeHtml(item.title)}</span>
          <span class="search-item-meta">${escapeHtml(item.desc)}</span>
        </div>
        <span class="badge badge-blue">${escapeHtml(item.category)}</span>
      `;
      searchResults.appendChild(a);
  });
  }
}

function initCodeCopyButtons() {
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pre = btn.closest(".code-block-wrapper")?.querySelector("pre");
      if (!pre) return;
  
      const code = pre.innerText;
      navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.innerText;
        btn.innerText = "copied!";
        showToast("Code copied to clipboard");
        setTimeout(() => {
         btn.innerText = originalText;
        }, 2000);
      }).catch(()=>{
         showToast("Failed to copy code");
    });
});
});
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
   }
   toast.innerText = message;
   toast.classList.add("visible");
   setTimeout(() => {
      toast.classList.remove("visible");
   }, 2400);
}

function getSavedBookmarks() {
  try {
    return JSON.parse(localStorage.getItem("hw_bookmarks") || "[]");
  } catch (e) {
    return [];
  }
}

function toggleBookmark(id) {
  let list = getSavedBookmarks();
  if (list.includes(id)) {
    list = list.filter((item) => item !== id);
    showToast("Removed from bookmarks");
 } else {
   list.push(id);
   showToast("Saved to bookmarks");
 }
 localStorage.setItem("hw_bookmarks");
 return list.includes(id);
}

function isBookmarked(id) {
  return getSavedBookmarks().includes(id);
}

function escapeHtml(str) {
   if (!str) return "";
   return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")  
      .replace(/>/g, "&gt;") 
      .replace(/"/g, "&qout;")
      .replace(/'/g, "&#039;");
}
