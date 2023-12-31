'use client'

import { Disclosure } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { type Team } from '@/models'

export default function MobileNav({ teams }: { teams: Team[] }): React.ReactElement {
  return (
    <Disclosure.Panel className={'border-b border-gray-700 md:hidden'}>
      <div className={'space-y-1 px-2 py-3 sm:px-3'}>
        {teams.map((team) => (
          <Disclosure.Button
            as={Link}
            className={'group flex items-center px-4 py-2'}
            href={`/teams/${team.teamId}`}
            key={team.teamId}
          >
            <Image src={team.darkLogo.url} alt={`${team.name} Logo`} width={33} height={22} />
            <span className={'ml-3'}>{team.name}</span>
          </Disclosure.Button>
        ))}
        <hr />
        <Disclosure.Button
          as={Link}
          className={'group flex items-center px-4 py-2'}
          href="/teams-showcase"
        >
          Teams Showcase
        </Disclosure.Button>
        <Disclosure.Button
          as={Link}
          className={'group flex items-center px-4 py-2'}
          href="/hypothetical-standings"
        >
          Hypothetical Standings
        </Disclosure.Button>
      </div>
    </Disclosure.Panel>
  )
}
