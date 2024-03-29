'use client'

import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { divisions } from '@/constants'
import { type Team } from '@/models'

const menuItemGroupClass =
  'absolute right-0 z-10 mt-2 w-64 origin-top-right divide-y divide-gray-200 dark:divide-gray-600 ' +
  'rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-gray-300 dark:ring-gray-600 focus:outline-none'
const menuItemLinkClass =
  'group flex items-center px-4 py-2 text-gray-900 dark:text-gray-200 ' +
  'hover:bg-gray-200 ui-active:bg-gray-200 dark:hover:bg-gray-600 dark:ui-active:bg-gray-600'

function teamsForDivision(division: string, teams: Team[]): Team[] {
  return teams.filter((team) => team.divisionName === division)
}

export default function DesktopNav({ teams }: { teams: Team[] }): React.ReactElement {
  return (
    <div className={'ml-10 flex items-baseline space-x-4'}>
      {divisions.map((division) => (
        <Menu as={'div'} className={'relative inline-block text-left'} key={division}>
          <Menu.Button
            className={'focusable inline-flex w-full items-center px-4 py-2 font-medium'}
          >
            {division}
            <ChevronDownIcon aria-hidden={'true'} className={'-mr-1 ml-2 h-5 w-5'} />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter={'transition ease-out duration-100'}
            enterFrom={'transform opacity-0 scale-95'}
            enterTo={'transform opacity-100 scale-100'}
            leave={'transition ease-in duration-75'}
            leaveFrom={'transform opacity-100 scale-100'}
            leaveTo={'transform opacity-0 scale-95'}
          >
            <Menu.Items className={menuItemGroupClass}>
              {teamsForDivision(division, teams).map((team) => (
                <Menu.Item key={team.teamId}>
                  <Link className={menuItemLinkClass} href={`/teams/${team.teamId}`}>
                    <Image src={team.logo.url} alt={`${team.name} Logo`} width={33} height={22} />
                    <span className={'ml-3'}>{team.name}</span>
                  </Link>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      ))}

      <Menu as={'div'} className={'relative inline-block text-left'}>
        <Menu.Button className={'focusable inline-flex w-full items-center px-4 py-2 font-medium'}>
          More
          <ChevronDownIcon aria-hidden={'true'} className={'-mr-1 ml-2 h-5 w-5'} />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter={'transition ease-out duration-100'}
          enterFrom={'transform opacity-0 scale-95'}
          enterTo={'transform opacity-100 scale-100'}
          leave={'transition ease-in duration-75'}
          leaveFrom={'transform opacity-100 scale-100'}
          leaveTo={'transform opacity-0 scale-95'}
        >
          <Menu.Items className={menuItemGroupClass}>
            <Menu.Item>
              <Link className={menuItemLinkClass} href="/teams-showcase">
                Teams Showcase
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link className={menuItemLinkClass} href="/hypothetical-standings">
                Hypothetical Standings
              </Link>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
