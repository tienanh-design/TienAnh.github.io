const CalendarController = {
    container: null,
    start: new Date(2026, 0, 1),
    end: new Date(2026, 5, 31), // Demo 3 tháng

    init() {
        this.container = document.getElementById("calendar-container");
        this.render();
    },

    render() {
        // Xóa cũ vẽ mới
        CalendarView.clear(this.container);

        const months = CalendarModel.getMonthsInRange(this.start, this.end);

        months.forEach(m => {
            const days = CalendarModel.generateMonthData(m.year, m.month);

            // Truyền thêm hàm xử lý sự kiện click
            CalendarView.renderMonth(m.year, m.month, days, this.container, (y, mo, d, session) => {
                this.handleSlotClick(y, mo, d, session);
            });
        });
    },

    handleSlotClick(year, month, day, session) {
        // Lấy dữ liệu cũ
        const currentData = CalendarModel.getEvent(year, month, day)[session];

        // Hỏi người dùng nhập liệu (Thực tế sẽ dùng Modal, đây dùng prompt cho nhanh)
        const sessionName = session === "am" ? "Sáng" : "Chiều";
        const content = prompt(`Nhập lịch cho ngày ${day}/${month + 1} (${sessionName}):`, currentData);

        if (content !== null) {
            // Cập nhật Model
            CalendarModel.setEvent(year, month, day, session, content);
            // Vẽ lại giao diện để thấy thay đổi
            this.render();
        }
    }
};

window.onload = () => CalendarController.init();