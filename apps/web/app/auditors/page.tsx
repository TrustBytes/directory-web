import Link from "next/link"
import Image from "next/image"
import { getManyC4Auditors } from "../_utils/auditors"
import type { Auditor } from "../_types/auditor"

const auditors = getManyC4Auditors().then((auditor) => {
  return auditor as Auditor[]
})



export default async function Auditors(): Promise<JSX.Element> {
  return (
    <main className="flex flex-col m-4 px-8   ">
      <input className="mt-12 p-2  bg-transparent text-5xl border-b border-accent outline-none"  placeholder="search auditors" type="text" />
      <div className="flex gap-16 mt-24  flex-wrap ">
        {(await auditors).map((auditor: Auditor) => {
          return (
            <Link key={auditor.handle} className="h-60 flex flex-col relative hover:brightness-125  hover:translate-x-1 hover:-translate-y-1 cursor-pointer  duration-200 ease-out shadow-2xl mx-auto " href={`/auditors/${auditor.handle}`}>
              <div className="relative rounded-3xl aspect-square h-32 w-32 overflow-hidden mx-auto bg-base z-10 flex items-center justify-center">
                <Image src={auditor.avatarURL || "/anon.png"} fill alt="avatar img"   className="overflow-hidden object-cover " />
              </div>
            <div className="h-52 bg-transparent z-10 items-center justify-center  rounded-3xl text-white aspect-[4/3]   flex-col    flex"  key={auditor.handle}>
              <div className="z-10 items-center text-bold flex justify-between w-full h-min flex-col space-y-4">
                <span className="p-1 border-b border-accent">{auditor.handle}</span>
                <div className=" p-2 px-4 text-sm bg-base rounded-xl">{auditor.totalFindings} Total Findings</div>

              </div>
            </div>
              <div className="absolute h-48 w-full bg-dark bottom-0 rounded-3xl"/>
            </Link>
          )
        })}
      </div>



    </main>
  )
}

