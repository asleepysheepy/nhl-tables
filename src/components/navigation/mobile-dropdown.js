import Image from 'next/image'
import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import { Team } from '../../models'

export const MobileDropdown = () => {
  return (
    <Disclosure.Panel className={'border-b border-gray-700 md:hidden'}>
      <div className={'px-2 py-3 space-y-1 sm:px-3'}>
        {Team.getTeams().map((team) => (
          <Disclosure.Button
            as={Link}
            className={'group flex items-center px-4 py-2'}
            href={`/teams/${team.getSlug()}`}
            key={team.getId()}
          >
            <Image
              alt={`${team.getName()} Logo`}
              height={30}
              src={`/img/logos/${team.getSlug()}.svg`}
              width={30}
            />
            <span className={'ml-3'}>{team.getName()}</span>
          </Disclosure.Button>
        ))}
      </div>
    </Disclosure.Panel>
  )
}

