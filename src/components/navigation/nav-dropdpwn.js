import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

const NavDropdown = ({ teams }) => {
  const renderTeamLink = (team) => {
    return (
      <Menu.Item key={team.getId()}>
        {({ active }) => (
          <Link href={`/teams/${team.getSlug()}`}>
            <a className={`${active ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-700'} group flex items-center px-4 py-2`}>
              <Image height={30} src={`/img/logos/${team.getSlug()}.svg`} width={30} />
              <span className={'ml-3'}>{team.getName()}</span>
            </a>
          </Link>
        )}
      </Menu.Item>
    )
  }

  return (
    <Transition
      as={Fragment}
      enter={'transition ease-out duration-100'}
      enterFrom={'transform opacity-0 scale-95'}
      enterTo={'transform opacity-100 scale-100'}
      leave={'transition ease-in duration-75'}
      leaveFrom={'transform opacity-100 scale-100'}
      leaveTo={'transform opacity-0 scale-95'}
    >
      <Menu.Items className={'origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'}>
        {teams.map((team) => renderTeamLink(team))}
      </Menu.Items>
    </Transition>
  )
}

export { NavDropdown }
