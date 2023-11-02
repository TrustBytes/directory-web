import Image from "next/image"
import {  BsSearch } from "react-icons/bs"
import { AiFillGift } from "react-icons/ai"
import Link from "next/link"


export default function Home(): JSX.Element {
  return (
    <div className="flex grow flex-col items-center  ">
      <div className="w-full  h-2/3 lg:max-w-5xl md:max-w-xl max-w-xs grow-0 relative mx-auto ">
        <Image alt="tb-logo" className="" fill src="/tb-logo.svg" />
      </div>
      <div className="flex gap-8 justify-center flex-wrap">
        <Link href="/auditors" className="bg-primary uppercase p-4 text-sm border interactive bg-dark duration-100 shadow-lg space-x-4">
          <BsSearch className="inline-block w-4 h-4 aspect-square" />
          <span>
            discover auditors
          </span></Link>
        <Link href="/register" className="bg-primary uppercase p-4 border text-sm interactive bg-darker duration-100 shadow-lg space-x-2">
          <AiFillGift className="inline-block w-4 h-4 aspect-square" />
          <span>Claim auditor profile</span></Link>
      </div>
    </div>
  )
}
