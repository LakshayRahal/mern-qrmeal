import { LogOut } from "lucide-react";
import { logoutUser } from "@/store/auth-slice";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AlignJustify } from "lucide-react";
import { DropdownMenu,DropdownMenuContent,DropdownMenuTrigger,DropdownMenuSeparator,DropdownMenuLabel,DropdownMenuItem} from '@/components/ui/dropdown-menu';
import { useNavigate } from "react-router-dom";
import { Avatar ,AvatarFallback} from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { UserRoundCog } from "lucide-react";
function HeaderRightContent(){

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


function StudentHeader({setOpen}){

  return (
    <header className="flex items-center justify-between px-4 py-3">
      <Button onClick={()=>setOpen(true)} className='lg:hidden sm:block' >
        <AlignJustify/>
        <span className="sr-only">Toggle Menu</span>
      </Button>
      
      <div className="flex flex-1 justify-end">
       
<HeaderRightContent/>
      </div>
    </header>
  )
}
export default StudentHeader;