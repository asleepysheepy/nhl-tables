'use client'

import type { Team } from '@/models'
import Link from 'next/link'
import Image from 'next/image'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import Logo from './logo'
import { divisions } from '@/constants'

function teamsForDivision (division: string, teams: Team[]): Team[] {
  return teams.filter((team) => team.divisionName === division)
}

function LogoButton ({ open }: { open: boolean }): React.ReactElement {
  if (open) {
    return (
      <Disclosure.Button as={Link} href={'/'}>
        <Logo size={40} />
      </Disclosure.Button>
    )
  }

  return (
    <Link href={'/'}>
      <Logo size={40} />
    </Link>
  )
}

function MobileButton ({ open }: { open: boolean }): React.ReactElement {
  const Icon = open ? XMarkIcon : Bars3Icon

  return (
    <div className={'-mr-2 flex md:hidden'}>
      <Disclosure.Button className={'inline-flex items-center justify-center p-2 rounded-md focusable'}>
        <span className={'sr-only'}>Open main menu</span>
        <Icon aria-hidden={'true'} className={'block h-6 w-6'} />
      </Disclosure.Button>
    </div>
  )
}

function MobileNav ({ teams }: { teams: Team[] }): React.ReactElement {
  return (
    <Disclosure.Panel className={'border-b border-gray-700 md:hidden'}>
      <div className={'px-2 py-3 space-y-1 sm:px-3'}>
        {teams.map((team) => (
          <Disclosure.Button
            as={Link}
            className={'group flex items-center px-4 py-2'}
            href={`/teams/${team.teamId}`}
            key={team.teamId}
          >
            <Image
              src={team.darkLogo.url}
              alt={`${team.name} Logo`}
              width={33}
              height={22}
            />
            <span className={'ml-3'}>{team.name}</span>
          </Disclosure.Button>
        ))}
      </div>
    </Disclosure.Panel>
  )
}

function DesktopNav ({ teams }: { teams: Team[] }): React.ReactElement {
  return (
    <div className={'ml-10 flex items-baseline space-x-4'}>
      {divisions.map((division) => (
        <Menu as={'div'} className={'relative inline-block text-left'} key={division}>
          <Menu.Button className={'inline-flex items-center w-full px-4 py-2 font-medium focusable'}>
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
            <Menu.Items className={'z-10 origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-gray-300 divide-y divide-gray-200 focus:outline-none'}>
              {teamsForDivision(division, teams).map((team) => (
                <Menu.Item key={team.teamId}>
                  <Link
                    className={'ui-active:bg-gray-200 hover:bg-gray-200 text-gray-900 group flex items-center px-4 py-2'}
                    href={`/teams/${team.teamId}`}
                  >
                    <Image
                      src={team.logo.url}
                      alt={`${team.name} Logo`}
                      width={33}
                      height={22}
                    />
                    <span className={'ml-3'}>{team.name}</span>
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

export default function Navbar ({ teams }: { teams: Team[] }): React.ReactElement {
  return (
    <Disclosure as={'nav'}>
      {({ open }) => (
        <>
          <div className={'max-w-7xl mx-auto sm:px-6 lg:px-8'}>
            <div className={'flex items-center justify-between h-16 px-4 sm:px-0'}>
              <div className={'flex items-center'}>
                <div className={'flex-shrink-0'}>
                  <LogoButton open={open} />
                </div>
              </div>
              <div>
                <div className={'hidden md:block'}>
                  <DesktopNav teams={teams} />
                </div>
                <MobileButton open={open} />
              </div>
            </div>
          </div>

          <MobileNav teams={teams} />
        </>
      )}
    </Disclosure>
  )
}
