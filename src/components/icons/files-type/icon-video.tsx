import { LucideProps } from 'lucide-react'
import { FC } from 'react'

interface IconVideoProps extends LucideProps {

}

const IconVideo: FC<IconVideoProps> = ({ width = 24, height = 24, ...props }) => {
    return (
        <svg {...props} width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.2999 4.76837e-07H28.3478L41.949 14.1769V41.7511C41.949 45.2054 39.1544 48 35.7121 48H12.2999C8.84562 48 6.05103 45.2054 6.05103 41.7511V6.24885C6.05096 2.79459 8.84556 4.76837e-07 12.2999 4.76837e-07Z" fill="#FA0000" />
            <path fillRule="evenodd" clipRule="evenodd" d="M28.3358 4.76837e-07V14.069H41.949L28.3358 4.76837e-07Z" fill="#DBA6A6" />
            <path d="M24.006 21.7811C19.7242 21.7811 16.2459 25.2594 16.2459 29.5413C16.2459 33.8231 19.7242 37.2893 24.006 37.2893C28.2879 37.2893 31.7541 33.8231 31.7541 29.5412C31.7541 25.2594 28.2759 21.7931 24.006 21.7811ZM27.2684 29.7811C27.2101 29.8874 27.1227 29.9747 27.0165 30.033L22.5907 32.2519C22.3149 32.3838 21.979 32.2759 21.8471 32C21.7992 31.928 21.7872 31.8441 21.7872 31.7481V27.3223C21.7872 27.0105 22.039 26.7706 22.3389 26.7706C22.4228 26.7706 22.5068 26.7826 22.5907 26.8306L27.0165 29.0375C27.2924 29.1814 27.4003 29.5052 27.2684 29.7811Z" fill="white" />
        </svg>
    )
}

export default IconVideo