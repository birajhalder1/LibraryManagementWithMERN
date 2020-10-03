const express = require('express');
const {
    createSingleAdminRecords,
    getAllAdminRecords,
    getSingleAdminRecords,
    updateAdminRecord,
    deleteAdminAccount
     } = require('../controller/admin');
const route = express.Router();

route
    .route('/')
    .post(createSingleAdminRecords)
    .get(getAllAdminRecords);

route
     .route('/:id')
     .get(getSingleAdminRecords)
     .put(updateAdminRecord)
     .delete(deleteAdminAccount)

module.exports = route;
