const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Kết nối MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "sa", // Thay bằng user MySQL của bạn
    password: "", // Thay bằng password MySQL của bạn
    database: "thammyvien",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Kết nối MySQL thành công!");
});

// API nhận thông tin từ form và lưu vào database
app.post("/submit-form", (req, res) => {
    const { name, phone, email, message } = req.body;

    if (!name || !phone) {
        return res.status(400).json({ error: "Tên và số điện thoại là bắt buộc!" });
    }

    const sql = "INSERT INTO khachhang (name, phone, email, message) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, phone, email, message], (err, result) => {
        if (err) return res.status(500).json({ error: "Lỗi lưu dữ liệu!" });
        res.json({ message: "Gửi thông tin thành công!" });
    });
});

// API lấy danh sách khách hàng
// app.get("/customers", (req, res) => {
//     const sql = "SELECT * FROM khachhang ORDER BY created_at DESC";
//     db.query(sql, (err, results) => {
//         if (err) return res.status(500).json({ error: "Lỗi lấy dữ liệu!" });
//         res.json(results);
//     });
// });

// // Chạy server trên cổng 3000
// app.listen(3000, () => {
//     console.log("Server chạy trên cổng 3000");
// });
