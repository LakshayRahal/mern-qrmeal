import { Outlet } from "react-router-dom"
import { useState } from "react";
import {StaffSideBar} from "./sidebar";
import StaffHeader from "./header";

export default function StaffLayout(){

 const [openStaffSideBar,setOpenStaffSidebar]=useState(false);


    return (
       <div className="flex min-h-screen w-full">
        <StaffSideBar open={openStaffSideBar} setOpen={setOpenStaffSidebar}/>
        <div className="flex flex-1 flex-col">
            <StaffHeader open={openStaffSideBar} setOpen={setOpenStaffSidebar}/>   
            <main className="flex-1 flex flex-col bg-muted/40 p-4 md:p-6">
            <Outlet/>
            </main> 
        </div>
       </div>
    )
}