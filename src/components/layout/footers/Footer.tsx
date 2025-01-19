import IconGithub from '@/components/icons/icon-github'
import IconHeart from '@/components/icons/icon-heart'
import IconLinkedIn from '@/components/icons/Icon-linkedIn'
import { Container } from '@/components/ui/container'
import Link from 'next/link'
import { FC } from 'react'

interface FooterProps {
}

const Footer: FC<FooterProps> = ({ }) => {
    return (
        <footer className='py-3 border-t border-border'>
            <Container>
                <div className="header-content">
                    <div className="logo-part flex items-center justify-between gap-2">
                        <h4 className='text-xs font-medium uppercase flex items-center gap-1'>Build By Suyog Bora <span><IconHeart className='w-5 h-5'/></span> </h4>
                        <div className="">
                            <ul className='flex items-center gap-2'>
                                <li>
                                    <Link href={""}><IconGithub className='w-5 h-5' /></Link>
                                </li>
                                <li>
                                    <Link href={""}><IconLinkedIn className='w-5 h-5' /></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer