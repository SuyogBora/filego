import { NavUser } from "@/components/pages/workspace/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { auth } from "@/lib/auth/auth"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import Link from "next/link"
import { FC } from 'react'
import DashboardMenuList from "./workspace-sidebar-menu"

// Sidebar navigation items
const sidebarItems = [
  {
    title: "Home",
    url: "/workspace",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

// Async server component for dashboard sidebar
const WorkspaceSidebar: FC = async () => {
  // Fetch user session on server side
  const session = await auth()

  return (
    <Sidebar collapsible="icon">
      {/* Sidebar Header */}
      <SidebarHeader className="px-4 border-b border-border h-[54px] flex justify-center">
        <div className="logo-part">
          <Link href="/" className='text-xl font-semibold'>Filego</Link>
        </div>
      </SidebarHeader>
      {/* Sidebar Content */}
      <SidebarContent className="py-3">
        <SidebarGroup>
          <SidebarGroupContent>
             <DashboardMenuList/> 
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer with User Info */}
      {session && (
        <SidebarFooter>
          <NavUser session={session} />
        </SidebarFooter>
      )}
    </Sidebar>
  )
}

export default WorkspaceSidebar