import Image from 'next/image'
import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import { Team } from '../../models'

const MobileDropdown = () => {
  const renderTeamLink = (team) => {
    return (
      <Link href={`/teams/${team.getSlug()}`} key={team.getId()} >
        <a className={'text-neutral-300 group flex items-center px-4 py-2'}>
          <Image height={30} src={`/img/logos/${team.getSlug()}.svg`} width={30} />
          <span className={'ml-3'}>{team.getName()}</span>
        </a>
      </Link>
    )
  }

  return (
    <Disclosure.Panel className={'border-b border-neutral-700 md:hidden'}>
      <div className={'px-2 py-3 space-y-1 sm:px-3'}>
        {Team.getTeams().map((team) => renderTeamLink(team))}
      </div>
    </Disclosure.Panel>
  )
}

export { MobileDropdown }
