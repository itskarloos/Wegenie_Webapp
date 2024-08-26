import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Navitems from './Navitems'
import Mobilenav from './Mobilenav'

const Header = () => {
  return (
    <header className="w-full border-b backdrop-blur-xl bg-white/30 ">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image src="/assets/images/wegenie-logo.svg" width={128} height={38} alt="Wegenie Logo" />
        </Link>
        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <Navitems />
          </nav>
        </SignedIn>
        <div className="flex w-32 justify-end gap-3">


          <SignedIn>
            <UserButton />
            <Mobilenav />
          </SignedIn>

          <SignedOut>
            <Button asChild className='rounded-full' variant='outline' size='lg'>
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>

        </div>
      </div>
    </header>
  )
}

export default Header