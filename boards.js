document.addEventListener("DOMContentLoaded", () => {
  initBoardCatalog();
});

const initBoardCatalog = () => {
  const container = document.querySelector("#boards-grid")};
  const searchInput = document.querySelector("#filter-search");
  const categorySelect = document.querySelector("#filter-category");
  const vendorSelect = document.querySelector("#filter-vendor");
  const sortSelect = document.querySelector("#filter-sort");
  const resultsCount = document.querySelector("#results-count");

  if (!container) return;

  const getFilteredBoards = () => {
    const q = (searchInput?.value ?? "").trim().toLowerCase();
    const cat = categorySelect?}