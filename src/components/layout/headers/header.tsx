import ProfileDropdown from "@/components/common/profile-dropdown"
import ThemeToggle from "@/components/common/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { auth } from "@/lib/auth/auth"
import { cn } from "@/lib/utils"
import { LogInIcon } from "lucide-react"
import Link from "next/link"

const Header = async () => {
    const session = await auth()
    return (
        <header className='py-2 border-b border-border fixed top-0 right-0 w-full bg-background'>
            <Container>
                <div className="header-content flex items-center justify-between">
                    <div className="logo-part">
                        <Link href={"/"} className='text-xl font-semibold'>Filego</Link>
                    </div>
                    <div className="flex items-center gap-2 action-part">
                       {!session ? <Link className={cn(buttonVariants({variant:"secondary",className:"gap-1"}))} href={"/auth/login"}>Login <LogInIcon/></Link> :  <ProfileDropdown session={session}/>}
                       <ThemeToggle/>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header