import { ChevronDownIcon } from '@heroicons/react/solid'
import { Menu } from '@headlessui/react'
import { NavDropdown } from './nav-dropdpwn'
import { Team } from '../../models'
import { divisions } from '../../data'

const getTeamsForDivision = (division) => {
  const teamsInDivision = Team.getTeams().filter((team) => team.getDivision().nhlId === division.nhlId)
  return teamsInDivision
}

const NavContent = () => {
  return (
    <div className={'ml-10 flex items-baseline space-x-4'}>
      {divisions.all.map((division) => (
        <Menu as={'div'} className={'relative inline-block text-left'} key={division.nhlId}>
          <div>
            <Menu.Button className={'inline-flex justify-center w-full px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-500 focus:ring-neutral-200'}>
              {division.name}
              <ChevronDownIcon aria-hidden={'true'} className={'-mr-1 ml-2 h-5 w-5'} />
            </Menu.Button>
          </div>
          <NavDropdown teams={getTeamsForDivision(division)} />
        </Menu>
      ))}
    </div>
  )
}

export { NavContent }
