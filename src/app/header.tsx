'use client'

import type { Team } from '@/models'

import Logo from './logo'
import NavBar from './navbar'
import { useParams } from 'next/navigation'
import { formatTeamRecord, formatPointsPercentage } from '@/formatters'

export default function Header ({ teams }: { teams: Team[] }): React.ReactElement {
  // Check for a team in the URL
  const params = useParams()
  const activeTeamId = params.teamId as string
  const activeTeam = teams.find(team => team.id === parseInt(activeTeamId))

  // If there was an active team, use that team's colors for the header background, otherwise use black
  const bgClassName = (activeTeam != null) ? activeTeam.slug : 'bg-black'

  function renderGenericHeader (): React.ReactElement {
    return (
      <header className={'pb-10 pt-3'}>
        <div className={'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
          <h1 className={'text-3xl font-bold'}>NHL Schedule Tables</h1>
        </div>
      </header>
    )
  }

  function renderTeamHeader (): React.ReactElement | null {
    if (activeTeam == null) { return null }
    if (activeTeam.stats == null) { throw new Error(`Could not load stats for team: ${activeTeam.name}`) }

    return (
      <header className={'pb-5 pt-3'}>
        <div className={'flex flex-col md:flex-row justify-between items-left md:items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
          <div className={'my-4'}>
            <Logo size={150} teamName={activeTeam.name} />
          </div>
          <div>
            <h1 className={'text-5xl font-bold mb-5 md:mb-0'}>{activeTeam.name}</h1>
          </div>
          <div>
            <p className={'text-lg'}>
              <span className={'font-bold'}>Games Played:</span> {activeTeam.stats.gamesPlayed}
            </p>
            <p className={'text-lg'}>
              <span className={'font-bold'}>Record:</span> {formatTeamRecord(activeTeam.stats)}
            </p>
            <p className={'text-lg'}>
              <span className={'font-bold'}>Points Percentage:</span> {formatPointsPercentage(activeTeam.stats.pointsPercentage)}
            </p>
          </div>
        </div>
      </header>
    )
  }

  return (
    <div className={`${bgClassName} text-white pb-32`}>
      <NavBar teams={teams} />
      {(activeTeam != null) ? renderTeamHeader() : renderGenericHeader()}
    </div>
  )
}
