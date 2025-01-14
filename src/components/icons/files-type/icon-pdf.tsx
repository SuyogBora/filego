import { LucideProps } from 'lucide-react'
import { FC } from 'react'

interface IconPdfProps extends LucideProps {

}

const IconPdf: FC<IconPdfProps> = ({ width = 24, height = 24, ...props }) => {
    return (
        <svg {...props} width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.2999 5.53245e-07H28.3478L41.949 14.1769V41.7511C41.949 45.2054 39.1544 48 35.7121 48H12.2999C8.84561 48 6.05102 45.2054 6.05102 41.7511V6.24885C6.05096 2.79459 8.84555 5.53245e-07 12.2999 5.53245e-07Z" fill="#E5252A" />
            <path fillRule="evenodd" clipRule="evenodd" d="M28.3358 5.53245e-07V14.069H41.949L28.3358 5.53245e-07Z" fill="#DBA6A6" />
            <path d="M12.9955 35.8141V27.0465H16.7257C17.6492 27.0465 18.3809 27.2983 18.9326 27.8141C19.4843 28.3178 19.7602 29.0015 19.7602 29.8531C19.7602 30.7046 19.4843 31.3883 18.9326 31.892C18.3809 32.4078 17.6492 32.6597 16.7257 32.6597H15.2384V35.8141H12.9955ZM15.2384 30.7527H16.4738C16.8096 30.7527 17.0735 30.6807 17.2534 30.5128C17.4333 30.3569 17.5293 30.141 17.5293 29.8531C17.5293 29.5653 17.4334 29.3494 17.2534 29.1935C17.0735 29.0255 16.8096 28.9536 16.4738 28.9536H15.2384V30.7527ZM20.6837 35.8141V27.0465H23.7901C24.4018 27.0465 24.9775 27.1304 25.5172 27.3103C26.0569 27.4902 26.5487 27.7422 26.9805 28.09C27.4123 28.4258 27.7601 28.8815 28.012 29.4573C28.2518 30.033 28.3838 30.6927 28.3838 31.4363C28.3838 32.1679 28.2519 32.8276 28.012 33.4033C27.7601 33.979 27.4123 34.4348 26.9805 34.7706C26.5487 35.1184 26.0569 35.3703 25.5172 35.5502C24.9775 35.7301 24.4018 35.8141 23.7901 35.8141H20.6837ZM22.8786 33.9071H23.5262C23.874 33.9071 24.1979 33.8711 24.4977 33.7871C24.7856 33.7032 25.0615 33.5712 25.3253 33.3913C25.5772 33.2114 25.7811 32.9595 25.925 32.6237C26.0689 32.2879 26.1409 31.892 26.1409 31.4363C26.1409 30.9685 26.0689 30.5727 25.925 30.2369C25.7811 29.9011 25.5772 29.6492 25.3253 29.4693C25.0615 29.2894 24.7856 29.1574 24.4977 29.0735C24.1979 28.9896 23.874 28.9535 23.5262 28.9535H22.8786V33.9071ZM29.5113 35.8141V27.0465H35.7482V28.9535H31.7541V30.3568H34.9445V32.2519H31.7541V35.8141H29.5113Z" fill="white" />
        </svg>
    )
}

export default IconPdf