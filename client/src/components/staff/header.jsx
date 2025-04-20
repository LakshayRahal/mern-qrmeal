import { House,Menu} from "lucide-react";
import { Sheet,SheetTrigger,SheetContent } from "../ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { DropdownMenu , DropdownMenuTrigger,DropdownMenuLabel,DropdownMenuContent ,DropdownMenuSeparator,DropdownMenuItem} from "../ui/dropdown-menu";
import { Avatar ,AvatarFallback} from "../ui/avatar";
import { UserRoundCog,LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import {MenuStaffItems} from "./sidebar";

function HeaderStaffRightContent(){

    const {user}=useSelector((state)=>state.auth);
    const navigate=useNavigate()
    const dispatch=useDispatch();

    function handleLogout(){
        dispatch(logoutUser());
    }

    return <div className="flex lg:items-center lg:flex-row flex-col gap-4">

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
        <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
                {user?.userName[0].toUpperCase()}
            </AvatarFallback>
        </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="w-56">

                <DropdownMenuLabel >
                    Logged in as {user?.userName}
                </DropdownMenuLabel>
            <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={()=>navigate("/shop/account")}>
            <UserRoundCog  className='mr-2 h-4 w-4'/>
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
            <DropdownMenuItem onClick={handleLogout}>
          <LogOut  className='mr-2 h-4 w-4'/>
            Logout
          </DropdownMenuItem>
         
            </DropdownMenuContent>
        </DropdownMenu>
        
    </div>
}




export default function StaffHeader(){
    return(
        <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to='/shop/home' className="flex items-center gap-2">
        <House className='h-6 w-6 font-bold'/>
        <span className="font-bold">QR-Meal</span>
        </Link>
        <Sheet> 
            <SheetTrigger asChild>
                <Button variant='outline' size='icon' className='lg:hidden'>
                <Menu className="h-6 w-6"/>
                    <span className="sr-only">
                        Toggle header menu
                    </span>
                </Button>
                </SheetTrigger>
                <SheetContent side='left' className='w-full max-w-xs'>
         
        <MenuStaffItems/>
           <HeaderStaffRightContent/>
                </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
               <HeaderStaffRightContent className='cursor-pointer'/>
            </div>


        </div>

    </header>
    )
}
