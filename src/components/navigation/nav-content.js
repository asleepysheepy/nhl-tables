import Image from 'next/image'
import Link from 'next/link'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Team } from '../../models'
import { divisions } from '../../data'

const getTeamsForDivision = (division) => {
  const teamsInDivision = Team.getTeams().filter((team) => team.getDivision().nhlId === division.nhlId)
  return teamsInDivision
}

export const NavContent = () => {
  return (
    <div className={'ml-10 flex items-baseline space-x-4'}>
      {divisions.all.map((division) => (
        <Menu as={'div'} className={'relative inline-block text-left'} key={division.nhlId}>
          <div>
            <Menu.Button className={'inline-flex justify-center w-full px-4 py-2 font-medium focusable'}>
              {division.name}
              <ChevronDownIcon aria-hidden={'true'} className={'-mr-1 ml-2 h-5 w-5'} />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter={'transition ease-out duration-100'}
            enterFrom={'transform opacity-0 scale-95'}
            enterTo={'transform opacity-100 scale-100'}
            leave={'transition ease-in duration-75'}
            leaveFrom={'transform opacity-100 scale-100'}
            leaveTo={'transform opacity-0 scale-95'}
          >
            <Menu.Items className={'z-10 origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-gray-300 divide-y divide-gray-200 focus:outline-none'}>
              {getTeamsForDivision(division).map((team) => (
                <Menu.Item key={team.getId()}>
                  <Link
                    className={'ui-active:bg-gray-200 hover:bg-gray-200 text-gray-900 group flex items-center px-4 py-2'}
                    href={`/teams/${team.getSlug()}`}
                  >
                    <Image
                      alt={`${team.getName()} Logo`}
                      height={30}
                      src={`/img/logos/${team.getSlug()}.svg`}
                      width={30}
                    />
                    <span className={'ml-3'}>{team.getName()}</span>
                  </Link>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>

        </Menu>
      ))}
    </div>
  )
}
