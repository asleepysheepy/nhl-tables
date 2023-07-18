import { TeamLogo } from './team-logo'
import { useTeam, useTeamStats } from '../hooks'

export const TeamHeader = () => {
  const { team } = useTeam()
  const teamStats = useTeamStats()

  if (!team) {
    return (
      <header className={'pb-10 pt-3'}>
        <div className={'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
          <h1 className={'text-3xl font-bold'}>NHL Schedule Tables</h1>
        </div>
      </header>
    )
  }

  if (!teamStats) {
    return null
  }

  return (
    <header className={'pb-5 pt-3'}>
      <div className={'flex flex-col md:flex-row justify-between items-left md:items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
        <div className={'my-4'}>
          <TeamLogo size={150} team={team} />
        </div>
        <div>
          <h1 className={'text-5xl font-bold mb-5 md:mb-0'}>{team.getName()}</h1>
        </div>
        <div>
          <p className={'text-lg'}>
            <span className={'font-bold'}>Games Played:</span> {teamStats.getGamesPlayed()}
          </p>
          <p className={'text-lg'}>
            <span className={'font-bold'}>Record:</span> {teamStats.getRecord()}
          </p>
          <p className={'text-lg'}>
            <span className={'font-bold'}>Points Percentage:</span> {teamStats.getPointsPercentage()}%
          </p>
        </div>
      </div>
    </header>
  )
}
