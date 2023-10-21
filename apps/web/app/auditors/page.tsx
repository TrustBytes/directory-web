import Link from "next/link"
import Image from "next/image"
import { getManyC4Auditors } from "../_utils/auditors"
import type { Auditor } from "../_types/auditor"
import SearchFilter from "../_components/search-filter"




export default async function Auditors({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<JSX.Element> {
  const paramsTrustScore = searchParams.trust_score || "0"
  const paramsSpecialities = searchParams.specialties ? searchParams.specialities as string : ""
  const paramsSpecialitiesArray = paramsSpecialities ? paramsSpecialities.split(',') : []

  const auditors = await getManyC4Auditors({ specialities: paramsSpecialitiesArray, trustScore: String(paramsTrustScore) })

  return (
    <main className="flex flex-col m-4 px-8   ">
      <SearchFilter auditors={auditors} />
      <div className="flex gap-8 mt-24  flex-wrap ">
        {(auditors).map((auditor: Auditor) => {
          return (
            <Link key={auditor.handle} className="h-64 flex flex-col relative hover:brightness-125  hover:translate-x-1 hover:-translate-y-1 cursor-pointer  duration-200 ease-out shadow-2xl mx-auto " href={`/auditors/${auditor.handle}`}>
              <div className="w-full flex justify-between">
                <div className="relative rounded-3xl aspect-square h-28 w-28 overflow-hidden mx-8  bg-base z-10 flex items-center justify-center">
                  <Image src={auditor.avatarURL || "/anon.png"} fill alt="avatar img" className="overflow-hidden object-cover " />
                </div>
                <div className="mt-10 z-10 -mr-2 flex flex-col items-end">
                  <h5 className="text-5xl  text-accent ">{auditor.trustScore}</h5>
                  <span className="text-xs p-1 uppercase">trustscore</span>
                </div>
              </div>
              <div className="h-72 bg-transparent z-10  justify-center  rounded-3xl text-white md:aspect-[4/3] aspect-[4/3]    flex-col    flex" key={auditor.handle}>
                <div className="z-10  text-bold flex   justify-between  mx-8      h-min  space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <span className="p-1 w-min border-b border-accent">{auditor.handle}</span>
                    <div className=" p-2 px-4 w-fit text-xs bg-base rounded-xl uppercase">{auditor.totalFindings} Total Findings</div>
                  </div>
                  <div className="flex  flex-col  gap-2">
                    {auditor.specialities.map((speciality) => {
                      return (
                        <div key={speciality} className=" text-accent   text-xs">{speciality}</div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="absolute h-48 w-full bg-dark bottom-0 rounded-3xl" />
            </Link>
          )
        })}
      </div>



    </main>
  )
}

