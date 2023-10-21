import Image from "next/image"


export default function Home(): JSX.Element {
  return (
    <div className="flex grow flex-col items-center ">
      <div className="w-1/2 h-96 relative m-auto">
      <Image alt="hackathon-logo" className=""  fill src="/landing-title.svg"    />
      </div>
    </div>
  )
}
