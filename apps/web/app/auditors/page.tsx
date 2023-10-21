
// import { getManyC4Auditors } from "../_utils/auditors"
import SearchFilter from "../_components/search-filter"
import {  getTrustbytesAuditors } from "../_lib/trustbytes"
// import { shortenAddress } from "../_utils/string"




export default async function Auditors(): Promise<JSX.Element> {
  // const paramsTrustScore = searchParams.trust_score || "0"
  // const paramsSpecialities = searchParams.specialties ? searchParams.specialities as string : ""
  // const paramsSpecialitiesArray = paramsSpecialities ? paramsSpecialities.split(',') : []


  const trustbytesAuditors = await getTrustbytesAuditors()

  return (
    <main className="flex flex-col m-4 md:px-8   ">
      <SearchFilter auditors={trustbytesAuditors} />

    </main>
  )
}

