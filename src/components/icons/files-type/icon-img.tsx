import { LucideProps } from 'lucide-react'
import { FC } from 'react'

interface IconImageProps extends LucideProps {

}

const IconImage: FC<IconImageProps> = ({ width = 24, height = 24, ...props }) => {
    return (
        <svg {...props} width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.2994 4.76837e-07H28.3535L41.9518 14.1869V41.7488C41.9518 45.1992 39.1509 48 35.7006 48H12.2994C8.84906 48 6.04822 45.1992 6.04822 41.7488V6.25116C6.04822 2.80084 8.84906 4.76837e-07 12.2994 4.76837e-07Z" fill="#0AC963" />
            <path fillRule="evenodd" clipRule="evenodd" d="M28.3332 4.76837e-07V14.0651H41.9518L28.3332 4.76837e-07Z" fill="#77ECAD" />
            <path fillRule="evenodd" clipRule="evenodd" d="M30.0989 23.9899H17.9011C16.9878 23.9899 16.2368 24.7408 16.2368 25.6542V33.4072C16.2368 34.3205 16.9877 35.0715 17.9011 35.0715H30.0989C31.0122 35.0715 31.7429 34.3206 31.7429 33.4072V25.6541C31.7429 24.7408 31.0123 23.9899 30.0989 23.9899ZM21.2296 26.0803C22.2241 26.0803 23.0156 26.8922 23.0156 27.8664C23.0156 28.8609 22.2241 29.6727 21.2296 29.6727C20.2351 29.6727 19.4233 28.8609 19.4233 27.8664C19.4233 26.8922 20.2351 26.0803 21.2296 26.0803ZM30.6469 33.4072C30.6469 33.7117 30.4034 33.9755 30.0989 33.9755H17.9011C17.5966 33.9755 17.353 33.7117 17.353 33.4072V33.0825L19.5653 30.8703L21.3919 32.6969C21.6152 32.9202 21.9602 32.9202 22.1835 32.6969L26.7704 28.11L30.6469 31.9865V33.4072Z" fill="white" />
        </svg>
    )
}

export default IconImage