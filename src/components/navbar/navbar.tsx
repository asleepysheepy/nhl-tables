'use client'

import { Disclosure } from '@headlessui/react'
import { useParams } from 'next/navigation'
import { type Team } from '@/models'
import { getHeaderColorClass } from '@/utils'
import DesktopNav from './desktop-nav'
import LogoButton from './logo-button'
import MobileButton from './mobile-button'
import MobileNav from './mobile-nav'

export default function Navbar({ teams }: { teams: Team[] }): React.ReactElement {
  const params = useParams()
  const activeTeamId = params.teamId as string
  const activeTeam = teams.find((team) => team.teamId === parseInt(activeTeamId))
  const bgColorClass = getHeaderColorClass(activeTeam)

  return (
    <Disclosure as={'nav'} className={`${bgColorClass} text-gray-50`}>
      {({ open }) => (
        <>
          <div className={'mx-auto max-w-7xl sm:px-6 lg:px-8'}>
            <div className={'flex h-16 items-center justify-between px-4 sm:px-0'}>
              <div className={'flex items-center'}>
                <div className={'flex-shrink-0'}>
                  <LogoButton open={open} />
                </div>
              </div>
              <div>
                <div className={'hidden md:block'}>
                  <DesktopNav teams={teams} />
                </div>
                <div className={'-mr-2 flex md:hidden'}>
                  <MobileButton open={open} />
                </div>
              </div>
            </div>
          </div>

          <MobileNav teams={teams} />
        </>
      )}
    </Disclosure>
  )
}
