
import { FC, PropsWithChildren } from 'react'
import { ThemeProvider } from '../components/providers/theme-provider'
import { FileUploadContextProvider } from '../lib/context/upload-context'
import { Toaster } from '../components/ui/toaster'

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