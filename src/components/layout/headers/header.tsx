import ThemeToggle from "@/components/common/theme-toggle"
import { Container } from "@/components/ui/container"
import Link from "next/link"

const Header = () => {
    return (
        <header className='py-2 border-b border-border fixed top-0 right-0 w-full'>
            <Container>
                <div className="header-content flex items-center justify-between">
                    <div className="logo-part">
                        <Link href={"/"} className='text-xl font-semibold'>Filego</Link>
                    </div>
                    <div className="">
                        <ThemeToggle/>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header