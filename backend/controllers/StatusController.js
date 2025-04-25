const Status = require("../models/Status.js");

const getAllStatus = async (req, res) => {
    try {
        const status = await Status.findAll();
        if (!status || status.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy trạng thái nào" });
        }
        res.json(status);
    } catch (err) {
        console.log(err); // Ghi log lỗi để kiểm tra
        res
        .status(500)
        .json({ message: err.message || "Đã xảy ra lỗi không xác định" });
    }
}

module.exports = {
    getAllStatus,
};