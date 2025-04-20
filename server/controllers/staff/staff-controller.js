const Product = require("../../models/qr");

// Get all QRs (for staff dashboard)
const fetchAllQR = async (req, res) => {
  try {
    const listofQRS = await Product.find({});
    res.status(200).json({
      success: true,
      data: listofQRS,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Error occurred" });
  }
};

// Claim a QR code
const claimQR = async (req, res) => {
  const { qrId, claimedBy } = req.body;

  try {
    const qr = await Product.findById(qrId);
    if (!qr) {
      return res.status(404).json({ success: false, message: "QR not found" });
    }

    if (qr.claimedBy) {
      return res.status(400).json({ success: false, message: "QR already claimed" });
    }

    // Check if the user already claimed a meal for that date and timing
    const alreadyClaimed = await Product.findOne({ claimedBy, date: qr.date, timing: qr.timing });
    if (alreadyClaimed) {
      return res.status(400).json({ success: false, message: "You already claimed a meal for this timing." });
    }

    qr.claimedBy = claimedBy;
    qr.claimedAt = new Date();

    await qr.save();
    res.status(200).json({ success: true, qr });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getClaimHistory = async (req, res) => {
  const { email } = req.params;

  try {
    const claimedQrs = await Product.find({ claimedBy: email }).sort({ claimedAt: -1 });
    res.status(200).json({
      success: true,
      data: claimedQrs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Could not fetch claimed history" });
  }
};

module.exports = {
  fetchAllQR,
  claimQR,
  getClaimHistory,
};
