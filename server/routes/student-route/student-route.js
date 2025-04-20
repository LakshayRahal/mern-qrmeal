
const express =require('express');

const {upload}=require('../../helpers/cloudinary');
const {handleImageUpload
    ,addQR,
    editQR,
    fetchAllQR,
    deleteQR

} = require('../../controllers/student/student-controller');

const router=express.Router();

router.post("/upload-image",upload.single("my_file"),handleImageUpload);
router.post('/add',addQR)
router.put('/edit/:id',editQR)
router.delete('/delete/:id',deleteQR)
router.get("/get",fetchAllQR);



module.exports=router;
