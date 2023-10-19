
import React from 'react'
import { getC4Auditor, getManyC4Auditors } from '../../_utils/auditors';

import Image from 'next/image';

interface AuditorPageParams {
  id: string
}


type ClassName = React.HTMLAttributes<HTMLHeadingElement>['className']



const CSS_SECTION_LABEL: ClassName = 'text-2xl font-bold border-b py-2'
const CSS_SECTION: ClassName = 'my-4  overflow-x-auto'
const CSS_AUDITOR_OVERVIEW_ITEM: ClassName = 'p-4 text-lg border cursor-pointer hover:brightness-90'

export async function generateStaticParams() {
  const manyC4Auditors = await getManyC4Auditors()
  const auditorProfiles = manyC4Auditors.map((auditor) => {
    return {
      id: auditor.handle,
    }
  })
  return auditorProfiles
}



const page = async ({ params }: { params: AuditorPageParams }): Promise<JSX.Element> => {
  const { id } = params;
  const auditor = await getC4Auditor(id)
  return (
    <div className='m-4'>

      <section className="w-1/3 relative aspect-video">
        <Image src={auditor.avatarURL || "/"} fill={true} alt="avatar" className="object-cover" />
      </section>
      <section className={CSS_SECTION}>

        <h1 className={CSS_SECTION_LABEL}>Overview: {id}</h1>
        <ul className="flex flex-wrap gap-4 my-4">
          {Object.entries(auditor).map(([key, value]) => {
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
      <section className={CSS_SECTION}>
        <h2 className={CSS_SECTION_LABEL}>Credentials</h2>
      </section>
      <section className={CSS_SECTION}>
        <h2 className={CSS_SECTION_LABEL}>Similar Profiles</h2>
      </section>
    </div>
  )
}

// css classes



export default page
