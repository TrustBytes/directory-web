'use client'
import React, { useEffect, useState } from 'react'

import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation'
import type { Speciality, TrustbytesAuditor } from '../_types/auditor'
import type { getTrustbytesAuditors } from '../_lib/trustbytes'

interface SearchProps {
  auditors: Awaited<ReturnType<typeof getTrustbytesAuditors>>
}



const ALL_SPECIALITES: Speciality[] = ["nft", "dao", "defi", "wallet"]




const INIT_INPUT_VALUE_TRUSTSCORE = 0

function SearchFilter(props: SearchProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("")
  const [inputValueSpecialities, setInputValueSpecialities] = useState(ALL_SPECIALITES)
  const [inputValueTrustScore, setInputValueTrustScore] = useState<number>(INIT_INPUT_VALUE_TRUSTSCORE)
  const router = useRouter()
  const searchParamsSpecialities = useSearchParams().get('specialities')
  const searchParamsSpecialitiesArray = searchParamsSpecialities ? searchParamsSpecialities.split(',') : []



  const searchParamsTrustScore = useSearchParams().get('trust_score')

  //@TODO: migrate filter to server side?
  function filterAuditors(auditors: TrustbytesAuditor[]): TrustbytesAuditor[] {
    return auditors.filter((a) => {
      const hasTrustScore = a.trustScore >= inputValueTrustScore
   
      return hasTrustScore 
    })
  }


  const filteredAuditors = filterAuditors(props.auditors)


  function onSearchInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setInputValue(e.target.value)
  }

  function onInputValueTrustScoreChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setInputValueTrustScore(Number(e.target.value))
  }

  //@TODO: submissions should update /auditor view instead of pushing to new page
  function onFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    // router.push(`/auditors?specialties=${inputValueSpecialities.join(',')}&trust_score=${inputValueTrustScore}`)
    router.push(`/auditors/${inputValue}`)
  }

  function onSpecialitiesChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault()
    const speciality = e.target.value as Speciality
    const checked = e.target.checked
    if (checked) {
      setInputValueSpecialities([...inputValueSpecialities, speciality])
    } else {
      setInputValueSpecialities(inputValueSpecialities.filter((s) => s !== speciality))
    }
  }

  useEffect(() => {
    setInputValueSpecialities(searchParamsSpecialitiesArray as Speciality[])
    if (searchParamsTrustScore) {
      setInputValueTrustScore(Number(searchParamsTrustScore))
    }
  }, [])

  return (
    <>

      <form onSubmit={onFormSubmit} className="flex w-full flex-col space-y-8">
        <input className="mt-12 p-2 flex-grow  bg-transparent md:text-5xl text-lg border-b border-accent outline-none" placeholder="SEARCH AUDITORS" value={inputValue} type="text" name="handle" list="list-auditors" onChange={onSearchInputChange} />
        <datalist id="list-auditors">
          {props.auditors.map((a: TrustbytesAuditor) => {
            return (

              <option key={a.address} value={a.address} />
            )
          })}
        </ datalist>
        <div className="flex w-full gap-8 flex-wrap ">
          <fieldset className="flex flex-wrap gap-8 p-8 rounded-lg border w-full md:w-fit bg-dark ">
            <legend className="text-lg bg-base bg-opacity-70 p-2 select-none rounded-lg uppercase text-sm">Specialities</legend>
            {ALL_SPECIALITES.map((speciality) => {
              return (
                <div key={speciality} className="flex space-x-2 text-lg tracking-wide cursor-pointer">
                  <label htmlFor={`checkbox_${speciality}`} className="select-none">{speciality}</label>
                  <input type="checkbox" name="specialities" id={`checkbox_${speciality}`} defaultChecked={false} value={speciality} onChange={onSpecialitiesChange} checked={inputValueSpecialities.includes(speciality)} />
                </div>
              )
            })}
          </fieldset>
          <fieldset className="flex  flex-wrap gap-8 p-8 rounded-lg border md:w-96 w-full bg-dark  ">
            <legend className="text-sm bg-base bg-opacity-70 p-2 rounded-lg select-none">MIN TRUSTSCORE: <span>{inputValueTrustScore}</span></legend>
            <input type="range" min="0" max="100" value={inputValueTrustScore} onChange={onInputValueTrustScoreChange} className="cursor-pointer w-full" />
          </fieldset>
        </div>
        <button className="bg-base w-fit px-8 py-2 hidden hover:brightness-125" type="submit" value="search">APPLY FILTER</button>

      </form>

      <section className="gap-4 flex flex-col border p-4 my-8 mt-16  bg-dark">
        <h3 className=" w-fit bg-dark  tracking-wide textborder ">INFO</h3>
        <ul className="list-disc px-4 text-sm gap-2 flex flex-col ">
          <li className="">An auditor is considered <strong className="text-accent">registered</strong> once he/she adds a user record on the <a href="https://tablescan.io/trustbytes_auditors_list_80001_7927" className="text-accent hover:underline" target="_blank" rel="noreferrer">Trustbytes Tableland User table</a></li>
          <li><strong className="text-purple-500">Unregistered</strong> auditors still benefit from our <strong className="text-yellow-500">profiles aggregator</strong></li>
        </ul>
      </section>
      <section className="flex flex-wrap gap-8 my-8  items-center">
        <div className="flex gap-4 text-xs items-center">
          <div className="p-4 border colors__auditor-premium" />
          <span className="">registered</span>
        </div>
        <div className="flex gap-4 text-xs items-center">
          <div className="p-4 border colors__auditor-standard" />
          <span className="">unregistered</span>
        </div>
      </section>
      <h1 className="uppercase">showing <span className="text-2xl">{filteredAuditors.length}</span> results </h1>
      <div className="flex gap-8 mt-24  flex-wrap ">
        {(filteredAuditors).map((a: TrustbytesAuditor) => {

          return (
            <Link key={a.pageID} className="h-64 flex flex-col relative hover:brightness-125 bg-transparent  hover:translate-x-1 hover:-translate-y-1 cursor-pointer  duration-200 ease-out  md:mx-auto w-full lg:w-fit" href={`/auditors/${a.pageID}`}>
              <div className="w-full flex justify-between">
                <div className="relative rounded-3xl aspect-square h-28 w-28 overflow-hidden mx-8  bg-base z-10 flex items-center justify-center">
                  <Image src={a.avatarURL || "/anon.png"} fill alt="avatar img" className="overflow-hidden object-cover " />
                </div>
                <div className="mt-10 z-10 -mr-2 flex flex-col items-end">
                  <h5 className="text-5xl  text-accent ">{a.trustScore}</h5>
                  <span className="text-xs p-1 uppercase">trustscore</span>
                </div>
              </div>
              <div className="h-72 bg-transparent z-10  justify-center  rounded-3xl text-white md:aspect-[4/3] aspect-[1/1]    flex-col    flex" key={a.address}>
                <div className="z-10  text-bold flex   justify-between  mx-8      h-min  space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <span className="p-1 w-min border-b border-accent">{a.name}</span>
                    <div className=" p--base rounded-xl uppercase">{a.totalFindings} Total Findings</div>
                  </div>
                  <div className="flex  flex-col  gap-2">
                    {a.competencies.map((c) => {
                      return (
                        <span key={c}>{c}</span>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className={`absolute h-48 w-full shadow-2xl  bottom-0 rounded-3xl ${a.isRegistered ? "colors__auditor-premium" : "colors__auditor-standard"}`} />
            </Link>
          )
        })}

      </div>


    </>
  )
}

export default SearchFilter
