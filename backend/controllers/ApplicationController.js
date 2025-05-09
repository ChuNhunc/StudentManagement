const Application = require("../models/Application.js");
const Student = require("../models/Student.js");
const Classes = require("../models/Classes.js");
const Status = require("../models/Status.js");
const Attendance = require("../models/Attendance.js");
const { Op } = require("sequelize");
const { generateAttendanceID } = require("./AttendanceController");
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
    if (!CourseID || typeof CourseID !== "string") {
      throw new Error("Invalid CourseID");
    }

    // Lấy tất cả các ApplicationID bắt đầu bằng CourseID
    const applications = await Application.findAll({
      where: {
        ApplicationID: {
          [Op.like]: `${CourseID}_%`, // Tìm các ApplicationID bắt đầu bằng CourseID
        },
      },
      attributes: ["ApplicationID"], // Chỉ lấy cột ApplicationID
      order: [["ApplicationID", "DESC"]], // Sắp xếp giảm dần theo ApplicationID
    });

    // Lấy ApplicationID cuối cùng (lớn nhất)
    let lastApplicationID =
      applications.length > 0 ? applications[0].ApplicationID : null;

    // Tách số thứ tự từ ApplicationID cuối cùng
    let nextNumber = 1;
    if (lastApplicationID) {
      const numberPart = lastApplicationID.split("_").pop(); // Lấy phần số cuối cùng sau dấu "_"
      const lastNumber = parseInt(numberPart, 10); // Chuyển đổi phần số thành số nguyên
      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1; // Tăng số thứ tự lên 1 nếu hợp lệ
      }
    }

    // Tạo ApplicationID mới
    const newApplicationID = `${CourseID}_${String(nextNumber).padStart(
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
    const { studentID, classID, ApplicationDate, Remarks } = req.body;
    const classData = await Classes.findOne({
      where: { ClassID: classID },
    });

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Kiểm tra số lượng application hiện tại của lớp
    const currentAttendance = await Attendance.count({
      where: { ClassID: classID },
    });

    if (currentAttendance >= classData.StudentNumber) {
      return res
        .status(400)
        .json({ message: "Class is full. Cannot create application." });
    }
    const newApplication = await Application.create({
      ApplicationID: await generateApplicationID(classID),
      ClassID: classID,
      StudentID: studentID,
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
    const { statusID, Remarks } = req.body;
    const application = await Application.findByPk(ApplicationID);
    if (!application) {
      return res.status(404).json({ message: "Đơn không tồn tại" });
    }
    if (statusID == 3) {
      const attendanceID = await generateAttendanceID(
        application.ClassID,
        application.StudentID
      );
      const existingAttendance = await Attendance.findOne({
        where: { AttendanceID: attendanceID },
      });

      if (!existingAttendance) {
        await Attendance.create({
          AttendanceID: attendanceID,
          ClassID: application.ClassID,
          StudentID: application.StudentID,
        });
      }

      application.StatusID = statusID;
      application.Remarks = Remarks;
    } else if (statusID == 2) {
      const attendance = await Attendance.findOne({
        where: {
          ClassID: application.ClassID,
          StudentID: application.StudentID,
        },
      });
      if (attendance) {
        await Attendance.destroy({
          where: {
            ClassID: application.ClassID,
            StudentID: application.StudentID,
          },
        });
      }
      application.StatusID = statusID;
      application.Remarks = Remarks;
    }
    await application.save();
    res.json(application);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getApplicationInClassByStudentID = async (req, res) => {
  try {
    const classID = req.params.ClassID;
    const studentID = req.params.StudentID;
    console.log("ClassID:+", classID);
    console.log("StudentID:+", studentID);
    const application = await Application.findOne({
      where: {
        ClassID: classID.trim(),
        StudentID: studentID.trim(),
      },
    });
    if (!application) {
      return null;
    }
    res.json(application);
  } catch (error) {
    console.log(err);
  }
};

const getApplicationByID = async (req, res) => {
  try {
    const applicationID = req.params.ApplicationID;
    const application = await Application.findByPk(applicationID);
    if (!application) {
      return res.status(404).json({ message: "Đơn không tồn tại" });
    }
    res.json(application);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getAllStudentApplication = async (req, res) => {
  try {
    const studentID = req.params.StudentID;
    const applications = await Application.findAll({
      where: { StudentID: studentID },
    });
    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "Không có đơn nào" });
    }
    res.json(applications);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getAllApplicationByClassID = async (req, res) => {
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

module.exports = {
  getAllApplicationsInClass,
  getApplicationInClassByStudentID,
  createApplication,
  updateApplication,
  getAllStudentApplication,
  getApplicationByID,
  getAllApplicationByClassID,
};
