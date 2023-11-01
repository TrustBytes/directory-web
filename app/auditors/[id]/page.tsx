
import React from 'react'
import Image from 'next/image';
import { getC4Auditor } from '../../_utils/auditors';
import type { TrustbytesAuditor } from '../../_types/auditor';
import { getTrustbytesAuditors, getTrustbytesAuditor } from '../../_lib/trustbytes';


interface AuditorPageParams {
  id: string
}


type ClassName = React.HTMLAttributes<HTMLHeadingElement>['className']



const CSS_SECTION_LABEL: ClassName = 'text-2xl font-bold border-b py-2'
const CSS_SECTION: ClassName = 'my-4  overflow-x-auto '
const CSS_AUDITOR_OVERVIEW_ITEM: ClassName = 'p-4 text-lg border cursor-pointer hover:brightness-90'

export async function generateStaticParams(): Promise<{ id: string, address?: string }[]> {
  const trustbytesAuditors = await getTrustbytesAuditors()
  const auditorProfiles = trustbytesAuditors.map((a: TrustbytesAuditor) => {
    return {
      id: a.pageID,
      address: a.address,
    }
  })
  return auditorProfiles
}



const page = async ({ params }: { params: AuditorPageParams }): Promise<JSX.Element> => {
  const { id } = params;
  // const auditor: Auditor = await getC4Auditor(id) as Auditor
  let trustbytesAuditor = {} as TrustbytesAuditor
  trustbytesAuditor = await getTrustbytesAuditor(id)
  const c4Auditor = await getC4Auditor(params.id)
  const auditorRegistrationStatusStyling = `${trustbytesAuditor.isRegistered ? "colors__auditor-premium" : "colors__auditor-standard"}`
  return (
    <div className='m-8 flex flex-col md:flex-row  gap-8'>
      <div className="w-96 flex flex-col gap-8">
        <div className=" relative aspect-square rounded-3xl overflow-hidden bg-dark shadow-2xl">
          <Image src={trustbytesAuditor.avatarURL || c4Auditor.image || "/anon.png"} fill alt="avatar" className="object-cover" />
        </div>


        <div className="flex flex-wrap  flex-col rounded-3xl p-4 gap-4 shadow-2xl bg-dark">
          <div className="flex flex-wrap items-center justify-between border-b border-accent">
            <h3 className="">{trustbytesAuditor.name} </h3>
            <span className="text-xs text-accent">{trustbytesAuditor.isRegistered ? "Registered" : "Not Registered"}</span>
          </div>
          <span className="whitespace-normal">
            {trustbytesAuditor.bio || "No bio provided"}
          </span>
        </div>
      </div>

      <div className=" flex flex-col gap-4">
        <div className=" rounded-3xl shadow-2xl flex justify-end bg-dark p-4 gap-4 ">
          <button type="button" className="p-1 uppercase hover:brightness-125 bg-base rounded-md text-xs px-4">message</button>
          <button type="button" className="p-1 uppercase hover:brightness-125 bg-base rounded-md text-xs px-4">hire</button>
        </div>
        <div className={`flex flex-col space-y-4 max-w-5xl flex-1  p-8 rounded-3xl shadow-2xl ${auditorRegistrationStatusStyling}`}>
          {
            // eslint-disable-next-line react/jsx-no-leaked-render -- @TODO revisit bug this bug later
            trustbytesAuditor.isRegistered && (
              <section className={CSS_SECTION}>
                <div className="flex flex-col items-end w-fit">
                  <h1 className="text-7xl tracking-tight text-accent">{trustbytesAuditor.trustScore} </h1>
                  <span className="text-white text-xs uppercase">trustscore</span>
                </div>
                <ul className="my-8 flex flex-col gap-4 text-accent text-lg tacling-wide  border-l p-4">
                  {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- @TODO revisit bug this bug later*/}
                  {trustbytesAuditor.competencies?.map((competency) => {
                    return <li className="cursor-pointer hover:brightness-125" key={competency}>{competency}</li>
                  })}
                </ul>

              </section>
            )
          }
          <section className={CSS_SECTION}>
            <h1 className={CSS_SECTION_LABEL}>Auditor Preferences</h1>
            <ul className="flex flex-wrap gap-4 my-4">
              {Object.entries(trustbytesAuditor).map(([key, value]) => {
                return (
                  <div key={key} className={CSS_AUDITOR_OVERVIEW_ITEM}>
                    <span>{key}: </span>
                    <span>{String(value)}</span>
                  </div>
                )

              })}
            </ul>
          </section>

          <section className={CSS_SECTION}>
            <h1 className={CSS_SECTION_LABEL}>External Data</h1>
            <ul className="flex flex-wrap gap-4 my-4">
              {Object.entries(c4Auditor).map(([key, value]) => {
                if (!value) return null;
                return (
                  <div key={key} className={CSS_AUDITOR_OVERVIEW_ITEM}>
                    <span>{key}: </span>
                    <span>{String(value)}</span>
                  </div>
                )
              })}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

// css classes



export default page
