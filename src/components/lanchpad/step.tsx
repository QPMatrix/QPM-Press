'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';

type Props = {
  imageSrc: string;
  description: string;
  buttonText: string;
};

type BeforeInstallPromptEvent = Event & {
  prompt: () => void;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
};

const Step = ({ imageSrc, description, buttonText }: Props) => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleClick = () => {
    // Show the install prompt
    deferredPrompt?.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt?.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  };

  return (
    <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
      <div className="flex md:items-center gap-4 flex-col md:!flex-row">
        <Image
          src={imageSrc}
          alt="app logo"
          height={80}
          width={80}
          className="rounded-md object-contain"
        />
        <p>{description}</p>
      </div>
      <Button onClick={handleClick}>{buttonText}</Button>
    </div>
  );
};

export default Step;
