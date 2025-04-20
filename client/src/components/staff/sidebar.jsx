import { Fragment } from "react";
import { Sheet, SheetContent, SheetTitle, SheetHeader } from "../ui/sheet";
import {
  ChartNoAxesCombined,
  LayoutDashboard,
  BookMarked,
  History
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sidebar menu items
const StaffSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/staff/dashboard",
    icons: <LayoutDashboard />,
  },
  {
    id: "features",
    label: "Features",
    path: "/staff/dashboard",
    icons: <BookMarked />,
  },

    {
      id: "history",
      label: "Claim History",
      path: "/staff/claimed", 
      icons: <History />,
    }

];

// Menu component for sidebar
export function MenuStaffItems({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {StaffSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            if (setOpen) setOpen(false);
          }}
          className="flex text-items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
        >
          {menuItem.icons}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

// Sidebar layout
export function StaffSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-xl font-extrabold">Staff panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuStaffItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-xl font-extrabold">Staff panel</h1>
        </div>
        <MenuStaffItems />
      </aside>
    </Fragment>
  );
}
