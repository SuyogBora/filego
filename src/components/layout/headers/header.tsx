import ProfileDropdown from "@/components/common/profile-dropdown"
import ThemeToggle from "@/components/common/theme-toggle"
import { Container } from "@/components/ui/container"
import { auth } from "@/lib/auth/auth"
import Link from "next/link"

const Header = async () => {
    const session = await auth()
    return (
        <header className='py-2 border-b border-border fixed top-0 right-0 w-full'>
            <Container>
                <div className="header-content flex items-center justify-between">
                    <div className="logo-part">
                        <Link href={"/"} className='text-xl font-semibold'>Filego</Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle/>
                       {session &&  <ProfileDropdown session={session}/>}
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header