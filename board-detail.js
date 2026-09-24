document.addEventListener("DOMContent", () => { 
    initBoardDetailPage();
});

const initBoardDetailPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const boardId = urlParams.get("id") || "esp32-wroom-32";

    const board = HARDWARE_DATA.boards.find(({ id }) => id == boardId) ??
    HARDWARE_DATA.boards[0];
    if (!board) return;

    document.title ='${board.name} Datasheet & Specifications - Hardwarepedia';

    const pageTitle = document.querySelector("#detail-board-name");
    const pageVendor = document.querySelector("#detail-board-vendor");
    const pageCategory = document.querySelector("#detail-board-category");
    const pageSummary = document.querySelector("#detail-board-summary");
    const bookmarkBtn = document.querySelector("#detail-bookmark-btn");
    const compareLink = document.querySelector("#detail-compare-btn");
    const pinoutLink = document.querySelector("#detail-printout-btn");

    if (pageTitle) pageTitle.textContent = board.name;
    if (pageVendor) pageVendor.textContent = board.vendor;
    if (pageCategory) {
        pageCategory.textContent = board.category.toUpperCase();
        pageCategory.className = 'badge ${board.category === "sbc" ? "badge-purple" : "badge-blue"}';
    }
    if (pageSummary) pageSummary.textContent = board.summary;
    if (compareLink) compareLink.href = 'compare.html?b1=${encodeURIComponent(board.id)}';
    if (pinoutLink) pinoutLink.href = 'pinouts.html?board=${encodeURIComponent(board.id)}';

    const updateBookmarkBtn = () => {
        if (!bookmarkBtn) return;
        const active = isBookmarked(board.id);
        bookmarkBtn.textContent = active ? "Bookmarked" : "Add to Bookmarks";
        bookmarkBtn.className = active ? "btn btn-secondary" : "btn btn-thirdary";
    };

    if (bookmarkBtn) {
        updateBookmarkBtn();
        bookmarkBtn.addEventListener("click", () => {
            toggleBookmark(board.id);
            updateBookmarkBtn();
        });
    }

    renderSpecsTable(board);
    renderPeripheralsTable(board);
    renderProsCons(board);
    renderPinTable(board);
    renderCodeTabs(board);
};

const renderSpecsTable = ({ architecture, cores, clockSpeed, flash, sram, psram, operatingVoltage, inputVoltage, activeCurrent, sleepCurrent, wifi, bluetooth }) => {
    const container = document.querySelector("specs-table-body");
    if (!container) return;

    const specs = [
        { label: "Processor Architecture", value: architecture },
        { label: "CPU Cores", value: '${cores} Core(s)' },
        { label: "Clock Frequency", value: clockSpeed },
        { label: "Flash Memory", value: flash },
        { label: "SRAM Memory", value: sram },
        { label: "PSRAM (Pseudo-static RAM)", value: psram },
        { label: "Operating Logic Voltage", value: operatingVoltage },
        { label: "Recommended Input Voltage", value: inputVoltage },
        { label: "Active Current Consumption", value: activeCurrent },
        { label: "Deep Sleep / Low Power Current", value: sleepCurrent },
        { label: "Wi-Fi Connectivity", value: wifi },
        { label: "Bluetooth Connectivity", value: bluetooth }
    ];

    container.innerHTML = specs.map(({ label, value}) =>  `
    <tr>
      <th>${escapeHtml(label)}</th>
      <td>${escapeHtml(value)}</td>
    </tr>
    `).join("");

};

const renderPeripheralsTable = ({ gpioCount, adcChannels, dacChannels, pwmPins, interfaces = {} }) => {
    const container = document.querySelector("peripherals-table-body");
    if (!container) return;

    const peripherals = [
        { label: "Total User GPIOs", value: `${gpioCount} Pins` },
        { label: "Analog-to-Digital Converter (ADC)", value: adcChannels },
        { label: "Digital-to-Analog Converter (DAC)", value: dacChannels },
        { label: "Pulse-Width Modulation (PWM)", value: pwmPins },
        { label: "UART Interfaces", value: interfaces.uart ? `${interfaces.uart} Hardware UARTs` : "None" },
        { label: "SPI Interfaces", value: interfaces.spi ? `${interfaces.spi} Hardware SPI Busses` : "None" },
        { label: "I2C Interfaces", value: interfaces.i2c ? `${interfaces.i2c} Hardware I2C Busses` : "None" },
        { label: "CAN Bus Controller", value: interfaces.can ? (typeof interfaces.can === "string" ? interfaces.can : `${interfaces.can} Controller`) : "None" },
        { label: "Special Peripherals", value: interfaces.pio || interfaces.pcie || interfaces.usb || interfaces.matrix || "Standard hardware timers / DMA" }
       ];

       container.innerHTML = peripherals.map(({ label, value }) => `
         <tr>
           <th>${escapeHtml(label)}</th>
           <td>${escapeHtml(value)}</td>
         </tr>
         `).join("");
};

const renderProsCons = ({ pros = [], cons = [] }) => {
    const prosContainer = document.querySelector("board-pros-list");
    const consContainer = document.querySelector("#board-cons-list");

    if (proscontainer) {
      prosContainer.innerHTML = pros.map((p) => `<li>${escapeHtml(p)}</li>`).join("");
    }
    if (consContainer) {
      consContainer.innerHTML = cons.map((c) => `<li>${escapeHtml(c)}</li>`).join("");
    }
};

