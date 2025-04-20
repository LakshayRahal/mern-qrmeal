const express = require("express");
const router = express.Router();
const { fetchAllQR, claimQR, getClaimHistory } = require("../../controllers/staff/staff-controller");

router.get("/get", fetchAllQR); 
router.post("/claim", claimQR);
router.get("/history/:email", getClaimHistory);

module.exports = router;
