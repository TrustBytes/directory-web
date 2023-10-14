'use client';
import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';



const CSS_LINK_LABEL: React.HTMLAttributes<HTMLHeadingElement>['className'] = ' p-4 hover:text-blue-500'

function Navbar(): JSX.Element {
  return (
    <nav className="p-4  flex items-center justify-between ">
      <ul className='flex space-x-8'>
        <Link  className={CSS_LINK_LABEL} href="/">Home</Link>
        <Link  className={CSS_LINK_LABEL} href="/auditors">Auditors</Link>
      </ul>
      <ConnectButton />
    </nav>
  )
}


export default Navbar
