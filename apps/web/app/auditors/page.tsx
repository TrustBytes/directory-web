import Link from "next/link"
import getMockUsers from "../utils/mock"

export default async function Auditors() {
  const mockUsers = await getMockUsers()
  return (
    <main className="flex flex-col m-4 space-y-6  ">
      <section className=" flex items-center  w-full"><input type="text" className="bg-gray-100 p-2 px-4 rounded-3xl border-b w-96 cursor-not-allowed" disabled placeholder="search by address" /></section>
        <h1 className="text-2xl">Results</h1>
        <hr />
      <div className="flex gap-4  flex-wrap ">
        {mockUsers.map((profile, i) => {
          return (
            <Link href={`/auditors/${profile.id}`} key={i} className="h-48 aspect-video flex bg-blue-500 p-4 cursor-pointer hover:brightness-105 rounded-lg hover:translate-x-1 hover:-translate-y-1 duration-100 ease-out ">
              <span className="text-2xl font-bold text-white">{profile.id}</span>
            </Link>
          )
        })}
      </div>



    </main>
  )
}

