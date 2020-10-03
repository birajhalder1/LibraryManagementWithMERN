const Admin = require('../models/Admin');

//@route    POST /api/v1/admin
//desc      Create admin record
//access    Private
exports.createSingleAdminRecords = async (req, res, next) => {
    try {
        const admin = await Admin.create(req.body);
        res.status(201).json({
            success: true,
            data: admin
        });

    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
    }
};

//@route    GET /api/v1/admin
//desc      GET all admin records
//access    Private
exports.getAllAdminRecords = async (req, res, next) => {
    try {
        const admin = await Admin.find();
        res.status(200).json({
            success: true,
            data: admin
        });

    } catch (err) {
        res.status(400).json({ success: false });
    }
};

//@route    GET /api/v1/admin
//desc      GET single admin records
//access    Private
exports.getSingleAdminRecords = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: admin
        });

    } catch (err) {
        res.status(400).json({ success: false });
    }
};

//@route    PUT /api/v1/admin
//desc      Update admin record
//access    Private
exports.updateAdminRecord = async (req, res, next) => {

    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if(!admin){
            res.status(400).json({ success: false });
        }
        res.status(200).json({
            success: true,
            data: admin
        });
    } catch (err) {
        res.status(400).json({ success: false });
    }

};

//@route    DELETE /api/v1/admin
//desc      Dalete admin account
//access    Private
exports.deleteAdminAccount = async (req, res, next) => {

    try {
        const admin = await Admin.findOneAndDelete(req.params.id);

        if(!admin){
            res.status(400).json({ success: false });
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};
