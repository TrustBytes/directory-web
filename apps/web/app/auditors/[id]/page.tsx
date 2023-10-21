
import React from 'react'
import Image from 'next/image';
import { getC4Auditor } from '../../_utils/auditors';
import type {  TrustbytesAuditor } from '../../_types/auditor';
import { getTrustbytesAuditors,getTrustbytesAuditor } from '../../_lib/trustbytes';


interface AuditorPageParams {
  id: string
}


type ClassName = React.HTMLAttributes<HTMLHeadingElement>['className']



const CSS_SECTION_LABEL: ClassName = 'text-2xl font-bold border-b py-2'
const CSS_SECTION: ClassName = 'my-4  overflow-x-auto '
const CSS_AUDITOR_OVERVIEW_ITEM: ClassName = 'p-4 text-lg border cursor-pointer hover:brightness-90'

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const trustbytesAuditors = await getTrustbytesAuditors()
  const auditorProfiles = trustbytesAuditors.map((a: TrustbytesAuditor) => {
    return {
      id: a.pageID,
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
  return (
    <div className='m-8 flex flex-col md:flex-row  gap-8'>
      <div className="w-96">
      <div className=" relative aspect-square rounded-3xl overflow-hidden">
        <Image src={trustbytesAuditor.avatarURL || c4Auditor.image || "/anon.png"} fill alt="avatar" className="object-cover" />
      </div>
      </div>

      <div className="flex flex-col space-y-4 max-w-5xl flex-1">

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
  )
}

// css classes



export default page
