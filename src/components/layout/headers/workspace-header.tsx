import ThemeToggle from "@/components/common/theme-toggle"
import DynamicBreadcrumb from "@/components/pages/workspace/dynamic-breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"

// Async server component for dashboard header
const WorkspaceHeader =() => {
  return (
    <header className="py-2 px-4 border-b border-border h-[54px] w-full bg-background z-50">
        <div className="header-content flex items-center justify-between">
          {/* Left side: Sidebar toggle and breadcrumb */}
          <div className="flex items-center gap-4">
            <div className="toggle-part">
              <SidebarTrigger />
            </div>
            <div className="breadcrumb-part">
              <DynamicBreadcrumb/>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
    </header>
  )
}

export default WorkspaceHeader