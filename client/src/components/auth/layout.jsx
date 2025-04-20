import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      
     
      <div className="hidden lg:block lg:w-1/2 overflow-hidden">
        <img
          src="https://wallpapers.com/images/hd/food-4k-3gsi5u6kjma5zkj0.jpg"
          alt="Illustration of reducing food waste through meal sharing"
          className="w-full h-full object-cover object-[80%_center] opacity-95"
        />
      </div>

     
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-5 sm:px-6 lg:px-8 bg-background relative">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
