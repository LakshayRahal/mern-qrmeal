const {imageUploadUtils}=require('../../helpers/cloudinary');
const QR=require('../../models/qr')


const handleImageUpload=async(req,res) =>{
    try{
        const b64=Buffer.from(req.file.buffer).toString("base64");
        const url="data:" + req.file.mimetype+';base64,' +b64;
        const result=await imageUploadUtils(url);
        res.json({
            success:true,
            result,
        });

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:'Error occured'});
    };
}


const addQR = async (req, res) => {
    try {
      const {
        image,
        name,
        timing,
        date
      } = req.body;
      const newlyCreatedQR= new QR({
        image,
        name,
        timing,
        date
      });
  
      await newlyCreatedQR.save();
      res.status(201).json({ success: true, message: "No Error" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ success: false, message: "Error occurred" });
    }
  };


  const fetchAllQR= async (req, res) => {
    try {
      // find everything
      const listofQRS = await QR.find({});
      res.status(200).json({
        success: true,
        data: listofQRS,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ success: false, message: "Error occurred" });
    }
  };
  
  // edit a products by id
  const editQR = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        image,
        name,
        timing,
        date
      } = req.body;
      let findProduct = await QR.findById(id);
      if (!findProduct)
        return res
          .status(404)
          .json({ success: false, message: "QR not found" });
      findProduct.name = name || findProduct.name;
      findProduct.timing = timing || findProduct.timing;
      findProduct.date = date || findProduct.date;
      findProduct.image = image || findProduct.image;
  
      await findProduct.save();
      res.status(200).json({ success: true, data: findProduct });
    } catch (e) {
      console.log(e);
      res.status(500).json({ success: false, message: "Error occurred" });
    }
  };
  
  
  // delete product
  const deleteQR = async (req, res) => {
    try {
      console.log("Request Params:", req.params); 
  
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ success: false, message: "Product ID is missing" });
      }
  
      const product = await QR.findByIdAndDelete(id);
  
      if (!product) {
        return res.status(404).json({ success: false, message: "QR not found" });
      }
  
      res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (e) {
      console.log("Delete Error:", e);
      res.status(500).json({ success: false, message: "Error occurred" });
    }
  };
  
  module.exports = {
    handleImageUpload,
        addQR,
    fetchAllQR,
    editQR,
    deleteQR,
  };
  


