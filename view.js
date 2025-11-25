const CalendarView = {
    renderMonth(year, month, days, container, onSlotClick) {
        const monthBlock = document.createElement("div");
        monthBlock.className = "month-block";

        const title = document.createElement("h3");
        title.textContent = `Tháng ${month + 1} / ${year}`;
        monthBlock.appendChild(title);

        // Header Thứ
        const header = document.createElement("div");
        header.className = "week";
        ["Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7", "CN"].forEach(t => {
            const h = document.createElement("div");
            h.className = "day header";
            h.textContent = t;
            header.appendChild(h);
        });
        monthBlock.appendChild(header);

        // Grid Ngày
        const grid = document.createElement("div");
        grid.className = "week";

        days.forEach(day => {
            const cell = document.createElement("div");
            cell.className = "day";

            if (day === null) {
                cell.classList.add("empty");
            } else {
                // 1. Hiển thị số ngày
                const numberDiv = document.createElement("div");
                numberDiv.className = "day-number";
                numberDiv.textContent = day;
                cell.appendChild(numberDiv);

                // 2. Lấy dữ liệu từ Model
                const eventData = CalendarModel.getEvent(year, month, day);

                // 3. Tạo container chứa 2 slot
                const slotsContainer = document.createElement("div");
                slotsContainer.className = "slots-container";

                // === SLOT SÁNG ===
                const slotAM = this.createSlot("am", eventData.am, () => {
                    onSlotClick(year, month, day, "am");
                });

                // === SLOT CHIỀU ===
                const slotPM = this.createSlot("pm", eventData.pm, () => {
                    onSlotClick(year, month, day, "pm");
                });

                slotsContainer.appendChild(slotAM);
                slotsContainer.appendChild(slotPM);
                cell.appendChild(slotsContainer);
            }
            grid.appendChild(cell);
        });

        monthBlock.appendChild(grid);
        container.appendChild(monthBlock);
    },

    // Hàm helper tạo ô slot
    createSlot(type, content, onClick) {
        const slot = document.createElement("div");
        slot.className = `slot ${type}`;
        if (content && content.trim() !== "") {
            slot.classList.add("has-data");
            slot.title = content; // Hover vào sẽ hiện full text nếu bị cắt
        }

        // Label nhỏ (Sáng/Chiều)
        const label = document.createElement("div");
        label.className = "slot-label";
        label.textContent = type === "am" ? "Sáng" : "Chiều";

        // Nội dung
        const text = document.createElement("div");
        text.className = "slot-content";
        text.textContent = content || "+"; // Hiện dấu + nếu trống

        slot.appendChild(label);
        slot.appendChild(text);

        // Gán sự kiện click
        slot.addEventListener("click", onClick);

        return slot;
    },

    clear(container) { container.innerHTML = ""; }
};