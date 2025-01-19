"use client";

import IconGithub from '@/components/icons/icon-github';
import IconGoogle from '@/components/icons/icon-google';
import { Button } from '@/components/ui/button';
import { socialAuthAction } from '@/lib/actions/auth';
import { useToast } from '@/lib/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useServerAction } from 'zsa-react';

interface SocialAuthButtonsProps { }

type Provider = "github" | "google";

const SocialAuthButtons: FC<SocialAuthButtonsProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const { toast } = useToast();
  const [pendingProvider, setPendingProvider] = useState<Provider | null>(null);
  const { execute: socialAuthExecute } = useServerAction(socialAuthAction);

  const handleSocialSignIn = async (provider: Provider) => {
      setPendingProvider(provider);
      const [data, error] = await socialAuthExecute({ provider });
      if (error) {
        toast({
          variant: "destructive",
          title: `${provider} sign in failed`,
          description: error.message
        });
        return;
      }
      toast({
        title: "Success",
        description: data.message,
      });
  };

  useEffect(() => {
    setTimeout(() => {
      if (error) {
        switch (error) {
          case "OAuthSignInError":
            toast({
              variant: "destructive",
              title: "Authentication failed",
              description: `${pendingProvider} sign in failed`,
            });
            break;
          case "OAuthCallbackError":
            toast({
              variant: "destructive",
              title: "Authentication failed",
              description: `${pendingProvider} callback error`,
            });
            break;
          case "OAuthAccountNotLinked":
            toast({
              variant: "destructive",
              title: "Authentication failed",
              description: `You already have an account registered with this email. Try logging in with credentials.`,
            });
            break;
        }
      }
      router.replace("/auth/login");
    }, 50);
  }, [error,router,toast]);


  return (
    <div className='grid grid-cols-2 gap-2'>
      <Button
        onClick={() => handleSocialSignIn("google")}
        disabled={pendingProvider === "google"}
        className='text-xs py-3.5 h-auto'
      >
        <IconGoogle className="mr-2" />
        {pendingProvider === "google" ? 'Signing in...' : 'Sign In With Google'}
      </Button>
      <Button
        onClick={() => handleSocialSignIn("github")}
        disabled={pendingProvider === "github"}
        className='text-xs py-3.5 h-auto'
      >
        <IconGithub className="mr-2" />
        {pendingProvider === "github" ? 'Signing in...' : 'Sign In With Github'}
      </Button>
    </div>
  );
};

export default SocialAuthButtons;