import type { Team } from '@/models'

import NavBar from './navbar'
import { formatTeamRecord, formatPointsPercentage } from '@/formatters'
import { fetchTeamStats } from '@/api'
import { defaultSeason } from '@/constants'
import Image from 'next/image'

interface Props {
  teams: Team[]
  activeTeam?: Team
}

export default async function Header ({ teams, activeTeam }: Props): Promise<React.ReactElement> {
  // If there was an active team, use that team's colors for the header background, otherwise use black
  const bgClassName = (activeTeam != null) ? `bg-[--color-${activeTeam.abbreviation}]` : 'bg-black'

  const activeTeamStats = activeTeam != null ? await fetchTeamStats(activeTeam, defaultSeason) : null

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
    if (activeTeamStats == null) {
      throw new Error(`Could not load stats for team: ${activeTeam.name}`)
    }

    return (
      <header className={'pb-5 pt-3'}>
        <div className={'flex flex-col md:flex-row justify-between items-left md:items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
          <div className={'my-4'}>
            <Image
              src={activeTeam.logo.url}
              alt={`${activeTeam.name} Logo`}
              width={150}
              height={100}
              className="mb-2"
            />
          </div>
          <div>
            <h1 className={'text-5xl font-bold mb-5 md:mb-0'}>{activeTeam.name}</h1>
          </div>
          <div>
            <p className={'text-lg'}>
              <span className={'font-bold'}>Games Played:</span> {activeTeamStats.gamesPlayed}
            </p>
            <p className={'text-lg'}>
              <span className={'font-bold'}>Record:</span> {formatTeamRecord(activeTeamStats)}
            </p>
            <p className={'text-lg'}>
              <span className={'font-bold'}>Points Percentage:</span> {formatPointsPercentage(activeTeamStats.pointsPercentage)}
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
