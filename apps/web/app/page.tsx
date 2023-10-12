import Image from "next/image"


export default function Home() {
  return (
    <div className="flex grow flex-col items-center ">
      <h1 className="text-6xl font-bold tracking-wide m-32">TrustBytes Auditors Dashboard</h1>
      <Image src="/hackathon-logo.jpg" width={500} height={500} alt="hackathon-logo"/>
    </div>
  )
}
