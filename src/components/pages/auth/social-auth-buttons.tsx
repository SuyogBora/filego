"use client";

import { authClient } from '@/lib/auth/auth-client';
import IconGithub from '@/components/icons/icon-github';
import IconGoogle from '@/components/icons/icon-google';
import { Button } from '@/components/ui/button';
import { ErrorContext } from 'better-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

interface SocialAuthButtonsProps {}

type Provider = "github" | "google";

const SocialAuthButtons: FC<SocialAuthButtonsProps> = () => {
  const router = useRouter();
  const [pendingProvider, setPendingProvider] = useState<Provider | null>(null);

  const handleSocialSignIn = async (provider: Provider) => {
    try {
      await authClient.signIn.social(
        { provider },
        {
          onRequest: () => setPendingProvider(provider),
          onSuccess: async () => {
            router.push("/");
          },
          onError: (ctx: ErrorContext) => {
            console.error(`${provider} auth error:`, ctx);
          },
        }
      );
    } catch (error) {
      console.error(`${provider} auth failed:`, error);
    } finally {
      setPendingProvider(null);
    }
  };

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