import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { FileUploadContextProvider } from '@/lib/context/upload-context'
import { FC, PropsWithChildren } from 'react'

interface RootProvidersProps extends PropsWithChildren{

}

const RootProviders: FC<RootProvidersProps> = ({ children}) => {
    return (
        <FileUploadContextProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
            <Toaster/>
        </FileUploadContextProvider>
    )
}

export default RootProviders