'use client';
import { ModeToggle } from '@/components/global/mode-toggle';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UserButton } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';

type Props = {
  user?: null | User;
};

const Navigation = ({ user }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const defaultOpen = false;
  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen],
  );
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10 bg-background">
      <aside className="flex items-center gap-2">
        <Image
          src={'./assets/QubeFlow-logo.svg'}
          width={40}
          height={40}
          alt="QubeFlow logo"
        />
        <span className="text-xl font-bold"> QubeFlow.</span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <Link href={'/'}>Pricing</Link>
          <Link href={'/about'}>About</Link>
          <Link href={'#'}>Documentation</Link>
          <Link href={'#'}>Features</Link>
        </ul>
      </nav>
      <aside className="hidden md:!flex gap-2 items-center">
        <Link
          href={'/agency'}
          className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80"
        >
          Login
        </Link>
        <UserButton />
        <ModeToggle />
      </aside>
      <aside className="md:hidden ">
        <Sheet modal={false} {...openState}>
          <SheetTrigger
            asChild
            className="absolute right-4 top-4 z-[100] md:!hidden flex"
          >
            <Button variant="outline" size={'icon'}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <AspectRatio ratio={16 / 9}>
              <Image
                src={'./assets/QubeFlow-logo.svg'}
                alt="Sidebar Logo"
                fill
                className="rounded-md object-contain"
              />
            </AspectRatio>
            <Separator />
            <div className="flex flex-row gap-2 justify-between items-center mt-5">
              <Link
                href={'/agency'}
                className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80"
              >
                Login
              </Link>
              <UserButton />
              <ModeToggle />
            </div>
            <Separator className="mt-4" />
            <nav>
              <ul className="flex flex-col gap-7  mt-4">
                <Link href={'/'}>Pricing</Link>
                <Link href={'/about'}>About</Link>
                <Link href={'/documentation'}>Documentation</Link>
                <Link href={'/features'}>Features</Link>
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </aside>
    </div>
  );
};

export default Navigation;
