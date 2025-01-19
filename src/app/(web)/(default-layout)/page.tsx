import FeatureCard from "@/components/pages/landing/feature-card";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { auth } from "@/lib/auth/auth";
import { homeMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { ChartSpline, CircleChevronRight, Lock, LogIn, Mail, Send, Wallet } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = homeMetadata

const features = [
  {
    title: "Password Protection",
    description: "Add a password to your files to ensure only authorized users can access them.",
    icon: <Lock className="text-blue-600" />,
    bgColor: "",
  },
  {
    title: "Direct Email Transfers",
    description: "Easily send files directly to an email address for secure and convenient sharing.",
    icon: <Mail className="text-violet-600" />,
    bgColor: "",
  },
  {
    title: "Paid Download Links",
    description: "Monetize your content by setting a price for downloads, and get paid upfront.",
    icon: <Wallet className="text-green-600" />,
    bgColor: "",
  },
  {
    title: "Real-Time Analytics",
    description: "Track downloads, revenue, and user engagement with detailed real-time insights.",
    icon: <ChartSpline className="text-orange-600" />,
    bgColor: "",
  },
];

export default async function Home() {
  const session = await auth()
  return (
    <section className="py-4 xxs:py-6 sm:py-8 md:py-10">
      <Container>
        <div className="section-content">
          <div className="mx-auto flex flex-col items-center gap-4 text-center xxs:gap-5 sm:gap-6 md:gap-8 md:max-w-[800px]">
            <div>
              <h1 className="font-bold leading-tight mb-2 
                text-3xl xxs:text-4xl sm:text-5xl md:text-6xl 
                xxs:leading-[1.1] sm:leading-[1.15] md:leading-[1.2]">
                Share and Monetize Your Files with Ease
              </h1>
              <p className="text-muted-foreground !leading-relaxed 
                text-xs lg:text-sm 
                max-w-[90%] mx-auto sm:max-w-[85%] md:max-w-none">
                Transform file sharing into an opportunity. Upload your files, generate secure links, and set your price for downloads. Empower your file-sharing experience with seamless payments, detailed real-time analytics, and robust security. Whether for business or personal use, our platform ensures your content is shared efficiently and profitably.
              </p>
            </div>

            <div className="flex items-center gap-2 xxs:gap-3 sm:gap-4">
              {session ? null : (
                <Link
                  href={"/auth/login"}
                  className={cn(buttonVariants({
                    className: "min-w-[120px] xxs:min-w-[130px] sm:min-w-[140px] md:min-w-[150px] shadow-md",
                    variant: "secondary"
                  }))}
                >
                SignIn   <LogIn />  
                </Link>
              )}
              <Link
                href={"/upload"}
                className={cn(buttonVariants({
                  className: "min-w-[120px] xxs:min-w-[130px] sm:min-w-[140px] md:min-w-[150px] shadow-md gap-2",
                  variant: "default"
                }))}
              >
                Transfer File Now <Send className="w-4 h-4 xxs:w-5 xxs:h-5" />
              </Link>
            </div>

            <div className="w-full">
              <ul className="grid grid-cols-1 gap-3 mb-4 
                xxs:gap-4 sm:grid-cols-2 md:gap-4">
                {features.map((feature, index) => (
                  <li key={index}>
                    <FeatureCard
                      title={feature.title}
                      description={feature.description}
                      icon={feature.icon}
                      bgColor={feature.bgColor}
                    />
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <Link
                  href={"/"}
                  className={cn(buttonVariants({
                    variant: "secondary",
                    size: "sm",
                    className: "text-[10px] xxs:text-xs gap-1"
                  }))}
                >
                  Read More <CircleChevronRight className="w-3 h-3 xxs:w-4 xxs:h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}