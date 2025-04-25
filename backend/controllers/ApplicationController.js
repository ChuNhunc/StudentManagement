const Application = require("../models/Application.js");
const Student = require("../models/Student.js");
const Classes = require("../models/Classes.js");
const Status = require("../models/Status.js");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

dayjs.extend(utc);

const getAllApplicationsInClass = async (req, res) => {
  try {
    const classID = req.params.ClassID;
    const applications = await Application.findAll({
      where: { ClassID: classID },
    });
    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "Không có đơn nào trong lớp" });
    }
    res.json(applications);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const generateApplicationID = async (CourseID) => {
  try {
    // Lấy tất cả các ApplicationID bắt đầu bằng CourseID
    const applications = await Application.findAll({
      where: {
        ClassID: CourseID,
      },
      attributes: ["ApplicationID"], // Chỉ lấy cột ApplicationID
      order: [["ApplicationID", "DESC"]], // Sắp xếp giảm dần theo ApplicationID
    });

    // Lấy ApplicationID cuối cùng (lớn nhất)
    let lastApplicationID =
      applications.length > 0 ? applications[0].ApplicationID : null;

    // Tách số thứ tự từ ApplicationID cuối cùng
    let nextNumber = 1; // Mặc định là 1 nếu chưa có ApplicationID nào
    if (lastApplicationID) {
      const lastNumber = parseInt(lastApplicationID.slice(CourseID.length), 10); // Lấy phần số
      nextNumber = lastNumber + 1; // Tăng số thứ tự lên 1
    }

    // Tạo ApplicationID mới
    const newApplicationID = `${CourseID + "_"}${String(nextNumber).padStart(
      4,
      "0"
    )}`; // Định dạng số với 4 chữ số
    return newApplicationID;
  } catch (err) {
    console.error("Error generating ApplicationID:", err);
    throw err;
  }
};

const createApplication = async (req, res) => {
  try {
    const { StudentID, ClassID , ApplicationDate, Remarks} = req.body;
    const newApplication = await Application.create({
      ApplicationID: await generateApplicationID(ClassID),
      StudentID,
      ClassID,
      StatusID: 1,
      ApplicationDate: ApplicationDate,
      ModifiedDate: ApplicationDate,
      Remarks: Remarks,
    });
    res.status(201).json(newApplication);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const updateApplication = async (req, res) => {
  try {
    const { ApplicationID } = req.params;
    const { statusID,Remarks } = req.body;
    const application = await Application.findByPk(ApplicationID);
    if (!application) {
      return res.status(404).json({ message: "Đơn không tồn tại" });
    }
    application.StatusID = statusID;
    application.Remarks = Remarks;
    await application.save();
    res.json(application);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllApplicationsInClass,
  createApplication,
  updateApplication,
};
