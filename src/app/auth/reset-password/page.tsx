import AuthCard from '@/components/pages/auth/auth-card'
import ResetPassword from '@/components/pages/auth/reset-password-form'
import { Container } from '@/components/ui/container'
import { resetPasswordMetadata } from '@/lib/metadata'
import { Metadata } from 'next'
import { FC } from 'react'

interface ResetPasswordProps {

}
export const metadata: Metadata = resetPasswordMetadata

const ResetPasswordPage: FC<ResetPasswordProps> = ({ }) => {
    return (
        <section className=''>
            <Container>
                <div className="page-content w-full py-20 grid place-items-center min-h-[calc(100vh-95px)]">
                    <AuthCard title='Forgot Password' description='Enter Your Email To get Password Reset link'>
                        <div className="py-2">
                            <ResetPassword/>
                        </div>
                    </AuthCard>
                </div>
            </Container>
        </section>
    )
}

export default ResetPasswordPage