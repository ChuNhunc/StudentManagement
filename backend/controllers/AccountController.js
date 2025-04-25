const Account = require('../models/Account.js');

const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll();
        if (!accounts || accounts.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy tài khoản nào' });
        }
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getAllStudentAccount = async (req, res) => {
    try {
        const accounts = await Account.findAll({
            where: {
                RoleID: 1
            }
        });
        if (!accounts || accounts.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy tài khoản nào' });
        }
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getAllTeacherAccount = async (req, res) => {
    try {
        const accounts = await Account.findAll({
            where: {
                RoleID: 2
            }
        });
        if (!accounts || accounts.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy tài khoản nào' });
        }
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getAllAdminAccount = async (req, res) => {
    try {
        const accounts = await Account.findAll({
            where: {
                RoleID: 3
            }
        });
        if (!accounts || accounts.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy tài khoản nào' });
        }
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getAllAccounts, getAllStudentAccount, getAllTeacherAccount, getAllAdminAccount };