const CalendarModel = {
    // Dữ liệu mẫu (Database giả lập)
    // Key format: "YYYY-M-D" (Lưu ý: Month chạy từ 0-11)
    events: {
        // --- THÁNG 1 (Month 0) ---
        "2026-0-6": { am: "", pm: "Cấu trúc dữ liệu và giải thuật (3+0) Vũ Văn Nam" },
        "2026-0-9": { am: "Lập trình Web (2+0) Trần Bá Minh Sơn", pm: "" },
        "2026-0-13": { am: "", pm: "Cấu trúc dữ liệu và giải thuật (3+0) Vũ Văn Nam" },
        "2026-0-16": { am: "Lập trình Web (2+0) Trần Bá Minh Sơn", pm: "" },
        "2026-0-19": { am: "", pm: "Thực hành lập trình Web (0+2) Trần Bá Minh Sơn" },
        "2026-0-20": {
            am: "Thực hành Cấu trúc dữ liệu và giải thuật (0+1) Vũ Văn Nam",
            pm: "Cấu trúc dữ liệu và giải thuật (3+0) Vũ Văn Nam"
        },
        "2026-0-23": { am: "Lập trình Web (2+0) Trần Bá Minh Sơn", pm: "" },
        "2026-0-26": { am: "", pm: "Thực hành lập trình Web (0+2) Trần Bá Minh Sơn" },
        "2026-0-27": {
            am: "Thực hành Cấu trúc dữ liệu và giải thuật (0+1) Vũ Văn Nam",
            pm: "Cấu trúc dữ liệu và giải thuật (3+0) Vũ Văn Nam"
        },
        "2026-0-30": { am: "Lập trình Web (2+0) Trần Bá Minh Sơn", pm: "" },

        // --- THÁNG 2 (Month 1) ---
        "2026-1-3": { am: "", pm: "Cấu trúc dữ liệu và giải thuật (3+0) Vũ Văn Nam" },
        "2026-1-23": { am: "", pm: "Thực hành lập trình Web (0+2) Trần Bá Minh Sơn" },
        "2026-1-24": {
            am: "Thực hành Cấu trúc dữ liệu và giải thuật (0+1) Vũ Văn Nam",
            pm: "Cấu trúc dữ liệu và giải thuật (3+0) Vũ Văn Nam"
        },

        // --- THÁNG 3 (Month 2) ---
        "2026-2-2": { am: "", pm: "Thực hành lập trình Web (0+2) Trần Bá Minh Sơn" },
        "2026-2-3": {
            am: "Thực hành Cấu trúc dữ liệu và giải thuật (0+1) Vũ Văn Nam",
            pm: "Cấu trúc dữ liệu và giải thuật (3+0) Vũ Văn Nam"
        },
        "2026-2-6": { am: "Lập trình Web (2+0) Trần Bá Minh Sơn", pm: "" },
        "2026-2-9": { am: "", pm: "Thực hành lập trình Web (0+2) Trần Bá Minh Sơn" },
        "2026-2-10": {
            am: "Thực hành Cấu trúc dữ liệu và giải thuật (0+1) Vũ Văn Nam",
            pm: "Cấu trúc dữ liệu và giải thuật (3+0) Vũ Văn Nam"
        },
        "2026-2-13": { am: "Lập trình Web (2+0) Trần Bá Minh Sơn", pm: "" },
        "2026-2-16": { am: "", pm: "Thực hành lập trình Web (0+2) Trần Bá Minh Sơn" },
        "2026-2-17": {
            am: "Thực hành Cấu trúc dữ liệu và giải thuật (0+1) Vũ Văn Nam",
            pm: "Cấu trúc dữ liệu và giải thuật (3+0) Vũ Văn Nam"
        },
        "2026-2-30": { am: "", pm: "Thực hành lập trình Web (0+2) Trần Bá Minh Sơn" },
        "2026-2-31": { am: "Lập trình trên Windows (3+0) Huỳnh Nguyễn Thành Luân", pm: "" },

        // --- THÁNG 4 (Month 3) ---
        "2026-3-1": { am: "Toán rời rạc (3+0) Lê Thị Thu", pm: "Thực hành lập trình trên Windows (0+1) Huỳnh Nguyễn Thành Luân" },
        "2026-3-6": { am: "", pm: "Thực hành lập trình Web (0+2) Trần Bá Minh Sơn" },
        "2026-3-7": { am: "Lập trình trên Windows (3+0) Huỳnh Nguyễn Thành Luân", pm: "" },
        "2026-3-8": { am: "Toán rời rạc (3+0) Lê Thị Thu", pm: "Thực hành lập trình trên Windows (0+1) Huỳnh Nguyễn Thành Luân" },
        "2026-3-9": { am: "", pm: "Toán rời rạc (3+0) Lê Thị Thu" },
        "2026-3-13": { am: "", pm: "Thực hành lập trình Web (0+2) Trần Bá Minh Sơn" },
        "2026-3-14": { am: "Lập trình trên Windows (3+0) Huỳnh Nguyễn Thành Luân", pm: "" },
        "2026-3-15": { am: "Toán rời rạc (3+0) Lê Thị Thu", pm: "Thực hành lập trình trên Windows (0+1) Huỳnh Nguyễn Thành Luân" },
        "2026-3-20": { am: "", pm: "Thực hành lập trình Web (0+2) Trần Bá Minh Sơn" },
        "2026-3-21": { am: "Lập trình trên Windows (3+0) Huỳnh Nguyễn Thành Luân", pm: "" },
        "2026-3-22": { am: "Toán rời rạc (3+0) Lê Thị Thu", pm: "Thực hành lập trình trên Windows (0+1) Huỳnh Nguyễn Thành Luân" },
        "2026-3-23": { am: "", pm: "Toán rời rạc (3+0) Lê Thị Thu" },
        "2026-3-28": { am: "Lập trình trên Windows (3+0) Huỳnh Nguyễn Thành Luân", pm: "" },

        // --- THÁNG 5 (Month 4) ---
        "2026-4-4": { am: "", pm: "Thực hành lập trình Web (0+2) Trần Bá Minh Sơn" },
        "2026-4-5": { am: "Lập trình trên Windows (3+0) Huỳnh Nguyễn Thành Luân", pm: "" },
        "2026-4-6": { am: "Toán rời rạc (3+0) Lê Thị Thu", pm: "Thực hành lập trình trên Windows (0+1) Huỳnh Nguyễn Thành Luân" },
        "2026-4-7": {
            am: "Lập trình trên Windows (3+0) Huỳnh Nguyễn Thành Luân",
            pm: "Toán rời rạc (3+0) Lê Thị Thu"
        },
        "2026-4-12": { am: "Lập trình trên Windows (3+0) Huỳnh Nguyễn Thành Luân", pm: "" },
        "2026-4-13": { am: "Toán rời rạc (3+0) Lê Thị Thu", pm: "Thực hành lập trình trên Windows (0+1) Huỳnh Nguyễn Thành Luân" },
        "2026-4-14": { am: "Lập trình trên Windows (3+0) Huỳnh Nguyễn Thành Luân", pm: "" }
    },

    getMonthsInRange(start, end) {
        const months = [];
        let current = new Date(start.getFullYear(), start.getMonth(), 1);
        while (current <= end) {
            months.push({ year: current.getFullYear(), month: current.getMonth() });
            current.setMonth(current.getMonth() + 1);
        }
        return months;
    },

    generateMonthData(year, month) {
        const days = [];
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        let offset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // T2=0, CN=6

        for (let i = 0; i < offset; i++) days.push(null);
        for (let d = 1; d <= lastDay.getDate(); d++) days.push(d);
        while (days.length % 7 !== 0) days.push(null);

        return days;
    },

    // Lấy dữ liệu của 1 ngày
    getEvent(year, month, day) {
        const key = `${year}-${month}-${day}`;
        return this.events[key] || { am: "", pm: "" };
    },

    // Cập nhật dữ liệu
    setEvent(year, month, day, session, content) {
        const key = `${year}-${month}-${day}`;
        if (!this.events[key]) {
            this.events[key] = { am: "", pm: "" };
        }
        this.events[key][session] = content;
    }
};