// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '@/store/auth-slice'; // Adjust the path as needed
// import { toast } from 'sonner';
// import { auth, provider } from './firebase';
// import { signInWithPopup } from 'firebase/auth';
// import CommonForm from '@/components/common/form';
// import { loginFormControls } from '@/config';
// import { Link } from 'react-router-dom';

// const initialState = {
//   email: '',
//   password: '',
// };

// function AuthLogin() {
//   const [formData, setFormData] = useState(initialState);
//   const [isOAuth, setIsOAuth] = useState(false); // Track if login is OAuth or manual
//   const dispatch = useDispatch();

//   // Handle manual form login
//   const onSubmit = (event) => {
//     event.preventDefault();
//     if (!isOAuth) {  // Only proceed with form submission if it's not OAuth
//       dispatch(loginUser(formData)).then((data) => {
//             dispatch(registerUser(formData)).then((data) => {
//               const payload = data?.payload;
           
//               console.log(payload?.success);
//               console.log(payload)
              
//               if (payload?.success) {
//                 toast({
//                   title: 'Success!',
//                   description: payload.message || 'Login successful.',
//                   type: 'success',
//                 });
//                 navigate('/auth/login');
//               } else {
//                 toast({
//                   title: 'Error!',
//                   description: payload?.message || 'Login failed.',
//                   type: 'error',
//                 });
//               }
            
        
//     })
//   };

//   // Handle Microsoft OAuth login
//   const handleLogin = async () => {
//     setIsOAuth(true); // Mark this action as OAuth
//     try {
//       const loginResponse = await signInWithPopup(auth, provider);
//       const user = loginResponse.user;

//       const userData = {
//         name: user.displayName,
//         email: user.email,
//         fromOAuth: true,
//       };

//       // Dispatch OAuth login action to backend
//       const response = await dispatch(loginUser(userData));

//       if (response?.payload?.success) {
//         toast.success(response?.payload?.message);
//       } else {
//         toast.error(response?.payload?.message);
//       }
//     } catch (error) {
//       console.error("Microsoft login failed:", error);
//       toast.error("Microsoft login failed! Please try again.");
//     }
//   };

//   return (
//     <div className="mx-auto w-full max-w-md space-y-6">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold tracking-tight text-foreground">
//           Login
//         </h1>
//         <p>Don't have an account?</p>
//         <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/register">
//           Register
//         </Link>
//       </div>

//       <CommonForm
//         formControls={loginFormControls}
//         buttonText={"Log in"}
//         formData={formData}
//         setFormData={setFormData}
//         onSubmit={onSubmit}
//       />

//       <div className="relative">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-gray-300"></div>
//         </div>
//         <div className="relative flex justify-center text-sm">
//           <span className="px-2 bg-gray-50 text-gray-500">Or</span>
//         </div>
//       </div>

//       <div className="space-y-4">
//         <button onClick={handleLogin} className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50">
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png"
//             className="w-4 h-4"
//             alt="Microsoft"
//           />
//           <span>Sign in with Microsoft</span>
//         </button>

//         <button className="w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
//           Biometric Login
//         </button>
//       </div>

//       <p className="text-center text-sm text-gray-600">
//         Don't have an account?{" "}
//         <Link to="/auth/register" className="text-black font-medium hover:underline">
//           Sign up
//         </Link>
//       </p>

//       <p className="text-center text-sm text-gray-500">© 2025 ALL RIGHTS RESERVED</p>
//     </div>
//   );
// }

// export default AuthLogin;



import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/auth-slice'; // Make sure path is correct
import { toast } from 'sonner';
import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import CommonForm from '@/components/common/form';
import { loginFormControls } from '@/config';
import { Link, useNavigate } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [isOAuth, setIsOAuth] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Manual login
  const onSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please fill in both email and password.');
      return;
    }

    try {
      const result = await dispatch(loginUser(formData));
      const payload = result?.payload;

      if (payload?.success) {
        toast.success(payload.message || 'Login successful');
        // navigate('/dashboard'); // Change route as needed
      } else {
        toast.error(payload?.message || 'Login failed');
      }
    } catch (error) {
      toast.error('Login failed! Please try again.');
      console.error('Login error:', error);
    }
  };

  // Microsoft OAuth Login
  const handleLogin = async () => {
    setIsOAuth(true);
    try {
      const loginResponse = await signInWithPopup(auth, provider);
      const user = loginResponse.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        fromOAuth: true,
      };

      const response = await dispatch(loginUser(userData));
      const payload = response?.payload;

      if (payload?.success) {
        toast.success(payload.message || 'Logged in via Microsoft');
        // navigate('/dashboard'); // Change route as needed
      } else {
        toast.error(payload?.message || 'OAuth login failed');
      }
    } catch (error) {
      console.error('OAuth login failed:', error);
      toast.error('Microsoft login failed. Please try again.');
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Login</h1>
        <p>Don't have an account?</p>
        <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/register">
          Register
        </Link>
      </div>

      <CommonForm
        formControls={loginFormControls}
        buttonText="Log in"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-50 text-gray-500">Or</span>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleLogin}
          className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png"
            className="w-4 h-4"
            alt="Microsoft"
          />
          <span>Sign in with Microsoft</span>
        </button>

        <button className="w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
          Biometric Login
        </button>
      </div>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/auth/register" className="text-black font-medium hover:underline">
          Sign up
        </Link>
      </p>

      <p className="text-center text-sm text-gray-500">© 2025 ALL RIGHTS RESERVED</p>
    </div>
  );
}

export default AuthLogin;
