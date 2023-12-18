import Image from 'next/image'
import { fetchTeamStats, fetchTeams } from '@/api'
import { defaultSeason } from '@/constants'
import { formatPointsPercentage, formatTeamRecord } from '@/formatters'
import { getHeaderColorClass } from '@/utils'

export default async function TeamPageLayout({ children, params }: Props) {
  const teams = await fetchTeams()

  const activeTeamId = params.teamId as string
  const activeTeam = teams.find((team) => team.teamId === parseInt(activeTeamId))
  const activeTeamStats =
    activeTeam != null ? await fetchTeamStats(activeTeam, defaultSeason) : null

  if (activeTeam == null || activeTeamStats == null) {
    return null
  }

  return (
    <div>
      <header
        className={`pb-5 pt-3 text-white shadow dark:shadow-none ${getHeaderColorClass(
          activeTeam,
        )}`}
      >
        <div
          className={
            'items-left mx-auto flex max-w-5xl flex-col justify-between px-4 sm:px-6 md:flex-row md:items-center lg:px-8'
          }
        >
          <div className={'my-4'}>
            <Image
              src={activeTeam.darkLogo.url}
              alt={`${activeTeam.name} Logo`}
              width={150}
              height={100}
              className="mb-2"
            />
          </div>
          <div>
            <h1 className={'mb-5 text-5xl font-bold md:mb-0'}>{activeTeam.name}</h1>
          </div>
          <div>
            <p className={'text-lg'}>
              <span className={'font-bold'}>Games Played:</span> {activeTeamStats.gamesPlayed}
            </p>
            <p className={'text-lg'}>
              <span className={'font-bold'}>Record:</span> {formatTeamRecord(activeTeamStats)}
            </p>
            <p className={'text-lg'}>
              <span className={'font-bold'}>Points Percentage:</span>{' '}
              {formatPointsPercentage(activeTeamStats.pointsPercentage)}
            </p>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}

type Props = {
  children: React.ReactNode
  params: {
    teamId: string
  }
}
