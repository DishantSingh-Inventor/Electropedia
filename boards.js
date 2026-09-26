document.addEventListener("DOMContentLoaded", () => {
  initBoardsCatalog();
});

const initBoardsCatalog = () => {
  const container = document.querySelector("#boards-grid");
  const searchInput = document.querySelector("#filter-search");
  const categorySelect = document.querySelector("#filter-category");
  const vendorSelect = document.querySelector("#filter-vendor");
  const sortSelect = document.querySelector("#filter-sort");
  const resultsCount = document.querySelector("#results-count");

  if (!container) return;

  const getFilteredBoards = () => {
    const q = (searchInput?.value ?? "").trim().toLowerCase();
    const cat = categorySelect?.value ?? "all";
    const vendor = vendorSelect?.value ?? "all";
    const sortBy = sortSelect?.value ?? "name-asc";

    let dataset = [...HARDWARE_DATA.boards];

    if (q) {
      dataset = dataset.filter(({ name, architecture, vendor: v, summary }) =>
        [name, architecture, v, summary].some((field) => field.toLowerCase().includes(q))
      );
    }

    if (cat !== "all") {
      dataset = dataset.filter((b) => b.category === cat);
    }

    if (vendor !== "all") {
      dataset = dataset.filter((b) => b.vendor.toLowerCase().includes(vendor.toLowerCase()));
    }

    dataset.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "clock-desc":
          return (parseInt(b.clockSpeed) || 0) - (parseInt(a.clockSpeed) || 0);
        case "gpio-desc":
          return (parseInt(b.gpioCount) || 0) - (parseInt(a.gpioCount) || 0);
        default:
          return 0;
      }
    });

    return dataset;
  };

  const render = () => {
    const boards = getFilteredBoards();

    if (resultsCount) {
      resultsCount.textContent = `${boards.length} board${boards.length === 1 ? "" : "s"} found`;
    }

    if (!boards.length) {
      container.innerHTML = `
        <div>
          <h3>No boards match your filter criteria</h3>
          <p>Try resetting your search filters or clearing the search query.</p>
          <button class="btn btn-secondary btn-sm" id="reset-filters-btn">Reset All Filters</button>
        </div>
      `;
      document.querySelector("#reset-filters-btn")?.addEventListener("click", resetFilters);
      return;
    }

    container.innerHTML = boards.map(({ id, name, vendor, category, summary, architecture, clockSpeed, sram, flash, operatingVoltage, wifi, bluetooth, gpioCount, adcChannels }) => {
      const bookmarked = isBookmarked(id);
      return `
        <article class="card">
          <div class="card-header">
            <div>
              <h3 class="card-title">
                <a href="board-detail.html?id=${encodeURIComponent(id)}">${escapeHtml(name)}</a>
              </h3>
              <div class="card-subtitle">${escapeHtml(vendor)}</div>
            </div>
            <span class="badge ${category === "sbc" ? "badge-purple" : "badge-blue"}">${category.toUpperCase()}</span>
          </div>

           <div class="card-body">
             <p>${escapeHtml(summary)}</p>
           
             <div class="specs-grid">
               <div class="spec-item">
                 <span class="spec-label">Architecture</span>
                 <span class="spec-value">${escapeHtml(architecture)}</span>
               </div>
               <div class="spec-item">
                 <span class="spec-label">Clock Speed</span>
                 <span class="spec-value">${escapeHtml(clockSpeed)}</span>
               <div class="spec-item">
                 <span class="spec-label">SRAM / Flash</span>
                 <span class="spec-value">${escapeHtml(sram)} / ${escapeHtml(flash)}</span>
               </div>
               <div>
                 <div class="spec-item">
                   <span class="spec-label">Logic Level</span>
                   <span class="spec-value">${escapeHtml(operatingVoltage)}</span>
                 </div>
               </div>

               <div class="tag-list">
                 ${wifi !== "None" ? `<span class="tag">Wi-Fi</span>` : ""}
                 ${bluetooth !== "None" ? `<span class="tag">BLE</span>` : ""}
                 <span class="tag">${gpioCount} GPIOs</span>
                 <span class="tag">${adcChannels.split(" ")[0]} ADC</span>
               </div>
             </div>
    
             <div class="card-footer">
               <a href="board-detail.html?id=${encodeURIComponent(id)}" class="btn btn-secondary">View Datasheet &rarr;</a>
               <div>
                 <a href="pinouts.html?board=${encodeURIComponent(id)}"class="btn btn-thirdary" title="View Interactive Pinout">Pinout</a>
                 <button class="btn btn-thirdary bookmark-btn" data-id="${escapeHtml(id)}" title="Bookmark board">
                   ${bookmarked ? "★" : "☆"}
                 </button>
               </div>
             </div>
           </article>
         `;
       }).join("");

       attachCardHandlers();
     };

     const attachCardHandlers = () => {
       document.querySelectorAll(".bookmark-btn").forEach((btn) => {
         btn.addEventListener("click", (e) => {
           e.preventDefault();
           const { id } = btn.dataset;
           const active = toggleBookmark(id);
           btn.textContent = active ? "★" : "☆";
         });
       }); 
     };

     const resetFilters = () => {
       if (searchInput) searchInput.value = "";
       if (categorySelect) categorySelect.value = "all";
       if (vendorSelect) vendorSelect.value = "all";
       if (sortSelect) sortSelect.value = "name-asc";
       render(); 
     };
     
     [searchInput, categorySelect, vendorSelect, sortSelect].forEach((el) => {
       el?.addEventListener("input", render);
       el?.addEventListener("change", render);
     });
     
     render();
};

 
