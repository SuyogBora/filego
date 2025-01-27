
import ReactQueryProvider from '@/components/providers/react-query-provider'
import { FC, PropsWithChildren } from 'react'
import { ThemeProvider } from '../components/providers/theme-provider'
import { Toaster } from '../components/ui/toaster'
import { FileUploadContextProvider } from '../lib/context/upload-context'

interface RootProvidersProps extends PropsWithChildren {}

const RootProviders: FC<RootProvidersProps> = ({ children }) => {
    return (
        <FileUploadContextProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <ReactQueryProvider>
                    {children}
                </ReactQueryProvider>
            </ThemeProvider>
            <Toaster />
        </FileUploadContextProvider>
    )
}

export default RootProviders