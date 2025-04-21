import { Fragment } from "react";
import { Sheet, SheetContent, SheetTitle, SheetHeader } from "../ui/sheet";
import {
  ChartNoAxesCombined,
  LayoutDashboard,
  BookMarked,
  History
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const StudentSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/student/home",
    icons: <LayoutDashboard />,
  },
  {
    id: "features",
    label: "Rewards",
    path: "/student/reward",
    icons: < BookMarked/>,
  },
  {
    id: "History",
    label: "History",
    path: "/student/home",
    icons: <History />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {StudentSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
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
function StudentSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-xl font-extrabold">Student panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-xl font-extrabold">Student panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}
export default StudentSideBar;
