import type { Metadata } from 'next'

import TableRow from './table-row'
import SeasonSelector from './season-selector'
import { fetchGameData, fetchTeamsData } from '@/api'
import { defaultSeason } from '@/constants'
import { groupGamesByTeam } from '@/game-service'

interface Props {
  params: {
    teamId: string
  }
  searchParams: {
    season?: string
  }
}

export default async function TeamPage ({ params, searchParams }: Props): Promise<React.ReactElement> {
  // Fetch teams and determine the active team, throw an error if no active team was found
  const teams = await fetchTeamsData()
  const activeTeam = teams.find(team => team.id === parseInt(params.teamId))
  if (activeTeam == null) { throw new Error('Unable to locate team.') }

  // Get the season from the url search params, fall back to a default
  const season = searchParams.season ?? defaultSeason.key

  // Fetch the team's games that season
  const games = await fetchGameData(activeTeam.id, season)
  const groupedGames = groupGamesByTeam(games, activeTeam)

  return (
    <div>
      <div className={'flex flex-col md:flex-row justify-between'}>
        <div className={'w-48 mb-5'}>
          <SeasonSelector />
        </div>
      </div>
      <table className={'table-auto min-w-full'}>
        <thead>
          <tr>
            <th>Against</th>
            <th colSpan={4}>Games</th>
            <th>Total Points</th>
            <th>Points %</th>
          </tr>
        </thead>
        <tbody className={'divide-y divide-gray-300'}>
          {Object.entries(groupedGames).map(([teamName, games]) => (
            <TableRow teamName={teamName} games={games} key={teamName} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export async function generateMetadata ({ params }: Props): Promise<Metadata> {
  const teams = await fetchTeamsData()
  const activeTeam = teams.find(team => team.id === parseInt(params.teamId))
  if (activeTeam == null) { throw new Error('Unable to locate team.') }

  return {
    title: `${activeTeam.name} Table`
  }
}
