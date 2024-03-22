'use client';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

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
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      const addButton = document.querySelector('.add-button') as HTMLElement;
      addButton.style.display = 'block';
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const addButtonClick = () => {
    const addButton = document.querySelector('.add-button') as HTMLElement;
    addButton.style.display = 'none';

    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null);
      });
    }
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
      <Button className="add-button" onClick={addButtonClick}>
        {buttonText}
      </Button>
    </div>
  );
};

export default Step;
