import AuthCard from '@/components/pages/auth/auth-card'
import ForgotPassword from '@/components/pages/auth/forgot-password-form'
import { Container } from '@/components/ui/container'
import { forgotPasswordMetadata } from '@/lib/metadata'
import { Metadata } from 'next'
import { FC } from 'react'

interface ForgotPasswordProps {

}
export const metadata: Metadata = forgotPasswordMetadata

const ForgotPasswordPage: FC<ForgotPasswordProps> = ({ }) => {
    return (
        <section className=''>
            <Container>
                <div className="page-content w-full py-20 grid place-items-center min-h-[calc(100vh-95px)]">
                    <AuthCard title='Forgot Password' description='Enter Your Email To get Password Reset link'>
                        <div className="py-2">
                            <ForgotPassword />
                        </div>
                    </AuthCard>
                </div>
            </Container>
        </section>
    )
}

export default ForgotPasswordPage