import AuthCard from '@/components/pages/auth/auth-card'
import LoginForm from '@/components/pages/auth/login-form'
import SocialAuthForm from '@/components/pages/auth/social-auth-buttons'
import { Container } from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'
import { loginMetadata } from '@/lib/metadata'
import { Metadata } from 'next'
import Link from 'next/link'
import { FC } from 'react'

interface LoginProps {

}

export const metadata: Metadata = loginMetadata

const LoginPage: FC<LoginProps> = ({ }) => {
  return (
    <section className=''>
      <Container>
        <div className="page-content w-full py-20 grid place-items-center min-h-[calc(100vh-95px)]">
          <AuthCard title='Sign In' description='Login To Start Using Advance Features'>
            <div className="py-2">
              <LoginForm />
              <Separator className="my-4" />
              <SocialAuthForm />
              <Separator className="my-4" />
              <div className="text-center">
                <h4 className="text-xs font-semibold">Dont Have Account , <Link href={"/auth/register"}>SignUp</Link></h4>
              </div>
            </div>
          </AuthCard>
        </div>
      </Container>
    </section>
  )
}

export default LoginPage