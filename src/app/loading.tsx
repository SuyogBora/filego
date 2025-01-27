import TinyLoader from "@/components/common/tiny-loader";

export default function Loading() {
    return (
       <div className="h-screen flex items-center justify-center bg-background">
         <TinyLoader/>
       </div>
    )
  }