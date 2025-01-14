import AuthCard from '@/components/pages/auth/auth-card'
import RegisterForm from '@/components/pages/auth/register-form'
import SocialAuthForm from '@/components/pages/auth/social-auth-buttons'
import { Container } from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'
import { signupMetadata } from '@/lib/metadata'
import { Metadata } from 'next'
import Link from 'next/link'
import { FC } from 'react'

interface RegisterProps {

}
export const metadata: Metadata = signupMetadata

const RegisterPage: FC<RegisterProps> = ({ }) => {
  return (
    <section className=''>
      <Container>
        <div className="page-content w-full py-20 grid place-items-center min-h-[calc(100vh-95px)]">
          <AuthCard title='Sign Up' description='Register To Start Using Advance Features'>
            <div className="py-2">
              <RegisterForm />
              <Separator className="my-4" />
              <SocialAuthForm />
              <Separator className="my-4" />
              <div className="text-center">
                <h4 className="text-xs font-semibold">Already Have Account , <Link href={"/auth/login"}>SignIn</Link></h4>
              </div>
            </div>
          </AuthCard>
        </div>
      </Container>
    </section>
  )
}

export default RegisterPage