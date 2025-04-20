
// import CommonForm from "@/components/common/form";
// import { registerFormControls } from "@/config";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { registerUser } from "@/store/auth-slice"; 
// import { toast } from "sonner"; // 

// const initialState = {
//   userName: "",
//   email: "",
//   role: "",
//   password: "",
// };

// function AuthRegister() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState(initialState);

//   function onSubmit(event) {
//     event.preventDefault();
//     dispatch(registerUser(formData)).then((data) => {
//       console.log(data);
//       if (data?.payload?.success) {
//         toast.success(data?.payload?.message); 
//         navigate("/auth/login");
//       } else {
//         toast.error(data?.payload?.message); }
//     });
//   }

//   console.log(formData);

//   return (
//     <div className="mx-auto w-full max-w-md space-y-6">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold tracking-tight text-foreground">
//           Create new account
//         </h1>
//         <p>Already have an account?</p>
//         <Link
//           className="font-medium ml-2 text-primary hover:underline"
//           to="/auth/login"
//         >
//           Login
//         </Link>
//       </div>
//       <CommonForm
//         formControls={registerFormControls}
//         buttonText={"Sign up"}
//         formData={formData}
//         setFormData={setFormData}
//         onSubmit={onSubmit}
//       />
//     </div>
//   );
// }

// export default AuthRegister;
import CommonForm from '@/components/common/form';
import { registerFormControls } from '@/config';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '@/store/auth-slice';
import { useToast } from '@/hooks/use-toast'; // ✅ use custom toast

const initialState = {
  userName: '',
  email: '',
  role: '',
  password: '',
};

function AuthRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast(); // ✅ hook version

  const [formData, setFormData] = useState(initialState);

  function onSubmit(event) {
    event.preventDefault();

    dispatch(registerUser(formData)).then((data) => {
      const payload = data?.payload;
   
      console.log(payload?.success);
      console.log(payload)
      
      if (payload?.success) {
        toast({
          title: 'Success!',
          description: payload.message || 'Registration successful.',
          type: 'success',
        });
        navigate('/auth/login');
      } else {
        toast({
          title: 'Error!',
          description: payload?.message || 'Registration failed.',
          type: 'error',
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p>Already have an account?</p>
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/login"
        >
          Login
        </Link>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={'Sign up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
