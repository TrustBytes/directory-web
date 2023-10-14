
import React from 'react'
import getMockUsers from '../../utils/mock';

interface AuditorPageParams  {
  id: string
}


type ClassName = React.HTMLAttributes<HTMLHeadingElement>['className']


const CSS_SECTION_LABEL: ClassName = 'text-2xl font-bold border-b py-2'
const CSS_SECTION: ClassName = 'my-4 h-96 overflow-x-auto'

export async function generateStaticParams() : Promise<AuditorPageParams[]> {
  const mockUsers = await getMockUsers()
  return mockUsers.map((user) => ({
    id: String(user.id),
  }))
}


const page = ({ params }: { params: AuditorPageParams }): JSX.Element => {
  const { id } = params;
  return (
    <div className='m-4'>
      <section className={CSS_SECTION}>
        <h1 className={CSS_SECTION_LABEL}>User {id} Overview</h1>
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
