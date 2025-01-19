import Footer from '@/components/layout/footers/Footer'
import Header from '@/components/layout/headers/header'
import { FC, PropsWithChildren } from 'react'

interface WebDefaultLayoutProps extends PropsWithChildren{
  
}

const WebDefaultLayout: FC<WebDefaultLayoutProps> = ({children}) => {
  return (
     <>
       <Header/>
       <main className='pt-[53px] min-h-[calc(100vh-53px)]'>
         {children}
       </main>
       <Footer/>
     </>
  )
}

export default WebDefaultLayout