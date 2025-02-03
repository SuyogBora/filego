import ReactQueryProvider from '@/components/providers/react-query-provider'
import { FC, PropsWithChildren } from 'react'
import { ThemeProvider } from '../components/providers/theme-provider'
import { Toaster } from '../components/ui/toaster'
import { FileUploadContextProvider } from '../lib/context/upload-context'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

interface RootProvidersProps extends PropsWithChildren { }

const RootProviders: FC<RootProvidersProps> = ({ children }) => {
    return (
        <ReactQueryProvider>
            <FileUploadContextProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NuqsAdapter>{children}</NuqsAdapter>
                </ThemeProvider>
                <Toaster  />
            </FileUploadContextProvider>
        </ReactQueryProvider>
    )
}

export default RootProviders