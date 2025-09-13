import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import AsideNav from "./AsideNav";

const AppSidebar = () => {
  return (
    <Sidebar className="md:hidden flex">
      <SidebarHeader />
      <SidebarContent>
        <AsideNav className="md:hidden block" />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
