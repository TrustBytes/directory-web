'use client';
import React, { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useContractWrite } from 'wagmi';
import Providers from '../_components/providers';
import registryArtifact from '../_data/abi/AuditorRegistry.json';
import config from '../_data/config';

const INITIAL_STATE = {
  name: "",
  bio: "",
  competencies: ""
}

interface RegisterState {
  name: string;
  bio: string;
  competencies: string;
}

function Register(): JSX.Element {
  const [state, setState] = useState<RegisterState>(INITIAL_STATE)

  const { isConnected } = useAccount()


  const { write: registerProfile, isLoading } = useContractWrite({
    address: config.mumbai.CONTRACT_ADDRESS_REGISTRY as `0x${string}`,
    abi: registryArtifact.abi,
    functionName: 'insertIntoTable',
    args: [state.name, state.bio, state.competencies, 0],
    onSettled: () => {
      // eslint-disable-next-line no-alert -- Dev mode alert
      window.alert('Profile registered!')
    },
    onError: (e) => {
      // eslint-disable-next-line no-alert -- Dev mode alert
      window.alert(`Error registering profile: ${e.message}`)
    }

  })

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    registerProfile()
  }

  function onInputChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault()
    setState(() => { return { ...state, name: e.target.value } })
  }

  function onInputChangeBio(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault()
    setState(() => { return { ...state, bio: e.target.value } })
  }

  function onInputChangeCompetencies(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault()
    setState(() => { return { ...state, competencies: e.target.value } })
  }

  return (
    <Providers >
      <div className="m-8 gap-4 ">
        <div className="flex p-4 border-b border-accent justify-between flex-wrap items-center gap-2" >
          <h1 className="text-2xl  uppercase ">Register Profile Via tableland</h1>

          <ConnectButton />
        </div>
        {isConnected &&
          (
            <React.Fragment>




              <section className="md:m-16 my-8">
                <form className="flex flex-wrap gap-8" onSubmit={onFormSubmit}>
                  <div>
                    <input type="text" name="name" id="name" placeholder="1. name" className="bg-transparent border-b border-white text-xl p-4" value={state.name} onChange={onInputChangeName} />
                  </div>
                  <div>
                    <input type="text" name="bio" id="bio" placeholder="2. bio" className="bg-transparent border-b border-white text-xl p-4" value={state.bio} onChange={onInputChangeBio} />
                  </div>
                  <div>
                    <input type="text" name="competencies" id="competencies" placeholder="3. competencies" className="bg-transparent border-b border-white text-xl p-4" onChange={onInputChangeCompetencies} />
                  </div>
                  <button type="submit" className="flex p-2 px-8 text-xs border items-center justify-center" disabled={isLoading}>Register</button>



                </form>

              </section>
              <pre className="p-4 bg-dark tracking-wide font-thin whitespace-pre" id="json">{JSON.stringify(state)}</pre>
            </React.Fragment>
          )

        }
      </div>
    </ Providers>
  )
}

export default Register;
