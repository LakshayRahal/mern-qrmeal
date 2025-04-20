const express = require("express");
const { registerUser, loginUser,logoutUser,authMiddleware} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/login",loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.get('/check-auth',authMiddleware
,(req,res)=>{
    //  decoded value
    // const user=req.user.value;
res.status(200).json({
    success:true,
    message:'Authenticated student!',
    user:req.user,
});

});

module.exports = router;
