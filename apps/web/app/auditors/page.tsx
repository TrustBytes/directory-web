import Link from "next/link"
import Image from "next/image"

// import { getManyC4Auditors } from "../_utils/auditors"
import type {  TrustbytesAuditor } from "../_types/auditor"
import SearchFilter from "../_components/search-filter"
import {  getTrustbytesAuditors } from "../_lib/trustbytes"
// import { shortenAddress } from "../_utils/string"




export default async function Auditors(): Promise<JSX.Element> {
  // const paramsTrustScore = searchParams.trust_score || "0"
  // const paramsSpecialities = searchParams.specialties ? searchParams.specialities as string : ""
  // const paramsSpecialitiesArray = paramsSpecialities ? paramsSpecialities.split(',') : []


  const trustbytesAuditors = await getTrustbytesAuditors()

  return (
    <main className="flex flex-col m-4 px-8   ">
      <SearchFilter auditors={trustbytesAuditors} />

      <section className="gap-4 flex flex-col border p-4 my-8 mt-16  bg-dark">
        <h3 className=" w-fit bg-dark  tracking-wide textborder ">INFO</h3>
        <ul className="list-disc px-4 text-sm gap-2 flex flex-col ">
          <li className="">An auditor is considered <strong className="text-accent">registered</strong> once he/she adds a user record on the <a href="https://tablescan.io/trustbytes_auditors_list_80001_7927" className="text-accent hover:underline" target="_blank" rel="noreferrer">Trustbytes Tableland User table</a></li>
          <li><strong className="text-purple-500">Unregistered</strong> auditors still benefit from our <strong className="text-yellow-500">profiles aggregator</strong></li>
        </ul>
      </section>
      <section className="flex flex-wrap gap-8 my-8  items-center">
        <div className="flex gap-4 text-xs items-center">
          <div className="p-4 border colors__auditor-premium"  />
          <span  className="">registered</span>
        </div>
        <div className="flex gap-4 text-xs items-center">
          <div className="p-4 border colors__auditor-standard" />
          <span  className="">unregistered</span>
        </div>
      </section>
      <div className="flex gap-8 mt-24  flex-wrap ">
        {(trustbytesAuditors).map((a: TrustbytesAuditor) => {
          return (
            <Link key={a.pageID} className="h-64 flex flex-col relative hover:brightness-125 bg-transparent  hover:translate-x-1 hover:-translate-y-1 cursor-pointer  duration-200 ease-out  mx-auto " href={`/auditors/${a.pageID}`}>
              <div className="w-full flex justify-between">
                <div className="relative rounded-3xl aspect-square h-28 w-28 overflow-hidden mx-8  bg-base z-10 flex items-center justify-center">
                  <Image src={a.avatarURL || "/anon.png"} fill alt="avatar img" className="overflow-hidden object-cover " />
                </div>
                <div className="mt-10 z-10 -mr-2 flex flex-col items-end">
                  <h5 className="text-5xl  text-accent ">{a.trustScore}</h5>
                  <span className="text-xs p-1 uppercase">trustscore</span>
                </div>
              </div>
              <div className="h-72 bg-transparent z-10  justify-center  rounded-3xl text-white md:aspect-[4/3] aspect-[4/3]    flex-col    flex" key={a.address}>
                <div className="z-10  text-bold flex   justify-between  mx-8      h-min  space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <span className="p-1 w-min border-b border-accent">{a.name}</span>
                    <div className=" p--base rounded-xl uppercase">{a.totalFindings} Total Findings</div>
                  </div>
                  <div className="flex  flex-col  gap-2">
                    {a.competencies.map((c) => {
                      return (
                      <span key={c}>{c}</span>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className={`absolute h-48 w-full shadow-2xl  bottom-0 rounded-3xl ${a.isRegistered ? "colors__auditor-premium" : "colors__auditor-standard"}`} />
            </Link>
          )
        })}

      </div>



    </main>
  )
}

