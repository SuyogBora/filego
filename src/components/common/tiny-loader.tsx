import { FC } from 'react'

interface TinyLoaderProps {
  
}

const TinyLoader: FC<TinyLoaderProps> = ({}) => {
  return <div className='border-4 border-t-white animate-spin border-border w-6 h-6 rounded-full'></div>
}

export default TinyLoader