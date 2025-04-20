// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { Upload, ArrowUp, CreditCard, QrCode } from "lucide-react";

// function HomePage() {
//   const [selectedMeal, setSelectedMeal] = useState("breakfast");
//   const [showDetails, setShowDetails] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar */}
  

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-8">
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           {/* Responsive Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Left Section */}
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold">
//                 UPLOAD CROPPED SCREENSHOT OF QR
//               </h2>
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50">
//                 <Upload className="w-12 h-12 text-gray-400 mb-4" />
//                 <p className="text-gray-500">Click or drag QR code to upload</p>
//               </div>
//             </div>

//             {/* Right Section (Moves below on small screens) */}
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold">UPLOAD QR CODE</h2>
//               <div className="space-y-2">
//                 <p className="font-medium">
//                   NO OF {selectedMeal.toUpperCase()} QR CODE
//                 </p>
//                 <p className="text-lg font-semibold">AVAILABLE: 35</p>
//               </div>

//               <button
//                 onClick={() => setShowDetails(!showDetails)}
//                 className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 flex items-center justify-center"
//               >
//                 DETAILS
//               </button>

//               {showDetails && (
//                 <div className="p-4 bg-gray-50 rounded-md">
//                   <select
//                     value={selectedMeal}
//                     onChange={(e) => setSelectedMeal(e.target.value)}
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                   >
//                     <option value="breakfast">Breakfast</option>
//                     <option value="lunch">Lunch</option>
//                     <option value="snacks">Snacks</option>
//                     <option value="dinner">Dinner</option>
//                   </select>
//                 </div>
//               )}

//               <button className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 flex items-center justify-center">
//                 <ArrowUp className="w-4 h-4 mr-2" />
//                 UPLOAD
//               </button>

//               <button className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 flex items-center justify-center">
//                 <CreditCard className="w-4 h-4 mr-2" />
//                 CHECK CREDIT SCORE
//               </button>

//               <NavLink
//                 to="/retrieve-qr"
//                 className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 flex items-center justify-center"
//               >
//                 <QrCode className="w-4 h-4 mr-2" />
//                 RETRIEVE QR CODE
//               </NavLink>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-white mt-12">
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="flex justify-center space-x-8 mb-8">
//             <NavLink to="#" className="text-gray-600 hover:text-gray-900">
//               Features
//             </NavLink>
//             <NavLink to="#" className="text-gray-600 hover:text-gray-900">
//               Resources
//             </NavLink>
//             <span className="text-xl font-bold">LOGO</span>
//             <NavLink to="#" className="text-gray-600 hover:text-gray-900">
//               About
//             </NavLink>
//             <NavLink to="#" className="text-gray-600 hover:text-gray-900">
//               Support
//             </NavLink>
//           </div>

//           <div className="text-center text-sm text-gray-600">
//             © 2024 — 2032 <span className="mx-2">·</span>
//             <NavLink to="#" className="hover:underline">
//               Privacy
//             </NavLink>
//             <span className="mx-2">—</span>
//             <NavLink to="#" className="hover:underline">
//               Terms
//             </NavLink>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default HomePage;


import { Fragment, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { addNewQr } from "@/store/student-slice";
import {Sheet,SheetContent,SheetTitle,SheetHeader} from '@/components/ui/sheet'
import CommonForm from "@/components/common/form";
import { addQrFormElements } from "@/config";
import QRImageUpload from "@/components/student/image-upload";
import { useDispatch,useSelector } from "react-redux";
import { fetchAllQr } from "@/store/student-slice";
import StudentQRTitle from "@/components/student/dashboard";
import { useState } from "react";
import { editQr } from "@/store/student-slice";
import { deleteQr } from "@/store/student-slice";
import { Plus } from "lucide-react";
const initialFormData={
  image:null,
  name:'',
  timing:'',
  date:''
}

function StudentQR(){

  const[currentEditedId,setCurrentEditedId]=useState(null);
  const [openCreateProductsDialog,setOpenCreateProductsDialog]=useState(false);
  const [formData,setFormData]=useState(initialFormData);
  const [imageFile,setImageFile]=useState(null);
  const [uploadImageUrl,setUploadedImageUrl]=useState('');
  const [imageLoadingState,setImageLoadingState]=useState(false);
  
  const dispatch=useDispatch();
  const {toast}=useToast();
  const {qrList}=useSelector((state)=>state.studentQR)
  
  function onSubmit(event){
    event.preventDefault();

    currentEditedId!=null?
    dispatch(
      editQr({
        id:currentEditedId,
        formData,
      })
    ).then((data)=>{
      console.log(data,"edit");

      if(data?.payload?.success){
        dispatch(fetchAllQr());
        setFormData(initialFormData);
        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null);
      }
    }
  ):dispatch(
    addNewQr({
      ...formData,
      image:uploadImageUrl,
    })
  ).then((data)=>{
    console.log(data);
    if(data?.payload?.success){
      dispatch(fetchAllQr);
      setOpenCreateProductsDialog(false);
      setImageFile(null);
      setFormData(initialFormData);
      toast({
        title:"QR added Successfully",
      });
    }
  });
  }


  // delete 
  function handleDelete(getCurrentProductId){
    console.log(getCurrentProductId);
    dispatch(deleteQr({id:getCurrentProductId})).then(data=>{
      if(data?.payload?.success){
        dispatch(fetchAllQr());
      }
    });
  }


  function isFormValid(){
    return Object.keys(formData)
    .map((key)=>formData[key]!=="")
    .every((item)=>item);
  }

  // display
  useEffect(()=>{
    dispatch(fetchAllQr());

  },[dispatch]);
  console.log(qrList,setUploadedImageUrl,"QR list");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button className='text-xl' onClick={()=>setOpenCreateProductsDialog(true)}>
         <Plus/>
          Share Qr Code
        </Button>
      </div>

 

<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {qrList && qrList.length > 0 ? qrList.map((productItem) => (
    <StudentQRTitle
      setCurrentEditedId={setCurrentEditedId}
      setFormData={setFormData}
      setOpenCreateProductsDialog={setOpenCreateProductsDialog}
      product={productItem}
      key={productItem?._id}
      handleDelete={handleDelete}
    />
  )) : null}


    </div>
    
    <Sheet open={openCreateProductsDialog}
    onOpenChange={()=>{
      setOpenCreateProductsDialog(false);
      setCurrentEditedId(null);
      setFormData(initialFormData);
    }}>

<SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <QRImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            // this is actualy for loading image
            isEditMode={currentEditedId != null}
            // currentEditedId={currentEditedId}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
          />
          <div className="py-6 px-2">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              isBtnDisabled={!isFormValid()}
              formControls={addQrFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>

    </Fragment>
  )

  




}
export default StudentQR;



