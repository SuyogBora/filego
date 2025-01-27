import WorkspaceHeader from '@/components/layout/headers/workspace-header'
import WorkspaceSidebar from '@/components/layout/sidebars/workspace-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { FC, PropsWithChildren } from 'react'

interface WorkspaceLayoutProps extends PropsWithChildren {

}

const WorkspaceLayout: FC<WorkspaceLayoutProps> =  ({ children }) => {
    return (
        <SidebarProvider defaultOpen={true}>
            <WorkspaceSidebar />
            <main className='flex-grow'>
                <WorkspaceHeader/>
                {children}
            </main>
        </SidebarProvider>
    )
}

export default WorkspaceLayout