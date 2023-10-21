'use client';
import React from 'react'
import Link from 'next/link';
import Image from "next/image"

const CSS_LINK_LABEL: React.HTMLAttributes<HTMLHeadingElement>['className'] = ' p-4 text-gray-300 hover:text-white'

function Navbar(): JSX.Element {
  return (
    <nav className="p-4 select-none  flex items-center justify-between max-w-screen-2xl w-full mx-auto ">
      <Link href="/">
        <Image alt="tb-logo" className="" width={40} height={40} src="/tb-logo.webp" />
      </Link>
      <ul className='flex space-x-8'>
        <Link className={CSS_LINK_LABEL} href={{
          pathname: '/auditors',
        }} >Auditors</Link>
      </ul>
    </nav>
  )
}


export default Navbar
