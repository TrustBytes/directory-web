import Image from "next/image"


export default function Home(): JSX.Element {
  return (
    <div className="flex grow flex-col items-center ">
      <h1 className="text-6xl font-bold tracking-wide m-32">TrustBytes Auditors Dashboard</h1>
      <Image alt="hackathon-logo"  height={500} src="/hackathon-logo.jpg" width={500}   />
    </div>
  )
}
