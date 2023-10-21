'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { getManyC4Auditors } from '../_utils/auditors'
import type { Speciality, Auditor } from '../_types/auditor'

interface SearchProps {
  auditors: Awaited<ReturnType<typeof getManyC4Auditors>>
}



const ALL_SPECIALITES: Speciality[] = ["nft", "dao", "defi", "wallet"]



const INIT_INPUT_VALUE_TRUSTSCORE = 0

function SearchFilter(props: SearchProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("")
  const [inputValueSpecialities, setInputValueSpecialities] = useState<Speciality[]>(ALL_SPECIALITES)
  const [inputValueTrustScore, setInputValueTrustScore] = useState<number>(INIT_INPUT_VALUE_TRUSTSCORE)
  const router = useRouter()
  const searchParamsSpecialities = useSearchParams().get('specialities')
  const searchParamsSpecialitiesArray = searchParamsSpecialities ? searchParamsSpecialities.split(',') : []



  const searchParamsTrustScore = useSearchParams().get('trust_score')




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
    <form onSubmit={onFormSubmit} className="flex w-full flex-col space-y-8">
      <input className="mt-12 p-2 flex-grow  bg-transparent md:text-5xl text-lg border-b border-accent outline-none" placeholder="SEARCH AUDITORS" value={inputValue} type="text" name="handle" list="list-auditors" onChange={onSearchInputChange} />
      <datalist id="list-auditors">
        {props.auditors.map((a: Auditor) => {
          return (

            <option key={a.handle} value={a.handle} />
          )
        })}
      </ datalist>
      <div className="flex w-full gap-8 flex-wrap hidden">
        <fieldset className="flex flex-wrap gap-8 p-8 rounded-lg border w-full md:w-fit bg-dark ">
          <legend className="text-lg bg-base bg-opacity-70 p-2 select-none rounded-lg uppercase text-sm">Specialities</legend>
          {ALL_SPECIALITES.map((speciality) => {
            const initiallyChecked = inputValueSpecialities.includes(speciality)
            return (
              <div key={speciality} className="flex space-x-2 text-lg tracking-wide cursor-pointer">
                <label htmlFor={`checkbox_${speciality}`} className="select-none">{speciality}</label>
                <input type="checkbox" name="specialities" id={`checkbox_${speciality}`} defaultChecked={initiallyChecked} value={speciality} onChange={onSpecialitiesChange} />
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
  )
}

export default SearchFilter
