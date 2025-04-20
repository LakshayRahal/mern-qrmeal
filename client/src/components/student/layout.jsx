import { Outlet } from "react-router-dom"
import { useState } from "react";
import StudentHeader from "./header";
import StudentSideBar from "./sidebar";

export default function StudentLayout(){

    const[openSideBar,setOpenSidebar]=useState(false);

    return (
       <div className="flex min-h-screen w-full">
        <StudentSideBar open={openSideBar} setOpen={setOpenSidebar}/>
        <div className="flex flex-1 flex-col">
            <StudentHeader open={openSideBar} setOpen={setOpenSidebar}/>   
            <main className="flex-1 flex flex-col bg-muted/40 p-4 md:p-6">
            <Outlet/>
            </main> 
        </div>
       </div>
    )
}