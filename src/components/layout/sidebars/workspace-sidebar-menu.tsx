'use client'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { cn } from '@/lib/utils'
import {
    Archive,
    FileText,
    Home,
    Settings,
    Share2,
    SubscriptIcon,
    Upload
} from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

// Define navigation items with icons
const sidebarItems = [
    {
        title: "Dashboard",
        url: "/workspace",
        icon: Home,
    },
    {
        title: "Transfer",
        url: "/workspace/transfer",
        icon: Upload,
    },
    {
        title: "Subscription",
        url: "/workspace/plan",
        icon: SubscriptIcon,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
]

interface WorkspaceMenuListProps {

}

const WorkspaceMenuList: FC<WorkspaceMenuListProps> = ({ }) => {
    const pathname = usePathname()
    return (
        <SidebarMenu>
            {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                     tooltip={item.title}
                        asChild
                        className={cn(
                            "flex items-center gap-3 w-full",
                            pathname === item.url && "bg-secondary text-secondary-foreground"
                        )}
                    >
                        <Link href={item.url}>
                            <item.icon className="w-6 h-6" />
                            <span className="text-sm font-medium">{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}

export default WorkspaceMenuList