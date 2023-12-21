import Image from 'next/image'
import { fetchGames, fetchTeams } from '@/api'
import { defaultSeason } from '@/constants'
import { formatPointsPercentage } from '@/formatters'
import { calculateTeamStandings } from '@/utils'

export default async function WhatIfPage(): Promise<React.ReactElement> {
  const teams = await fetchTeams()
  const schedules = await Promise.all(
    teams.map(async (team) => ({
      games: await fetchGames(team, defaultSeason),
      team: team,
    })),
  )

  const standings = schedules.map(({ games, team }) => {
    return {
      team,
      teamStandings: calculateTeamStandings(games, team),
    }
  })

  const sortedStandings = standings
    .sort((a, b) => b.teamStandings.realPoints - a.teamStandings.realPoints)
    .map(({ teamStandings, team }, index) => ({
      teamStandings,
      team: {
        ...team,
        name: `${team.name} (${index + 1})`,
        abbreviation: `${team.abbreviation} (${index + 1})`,
      },
    }))
    .sort((a, b) => b.teamStandings.hypotheticalPoints - a.teamStandings.hypotheticalPoints)

  return (
    <main className="mx-auto mb-6 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 md:flex-row md:gap-24">
        <div>
          Real Standings are based on a system of 2-1-0:
          <ul className="list-inside list-disc">
            <li>2 points for a win</li>
            <li>1 points for an OT/SO loss</li>
            <li>0 points for a regulation loss</li>
          </ul>
        </div>
        <div>
          Hypothetical Standings are based on a system of 3-2-1-0:
          <ul className="list-inside list-disc">
            <li>3 points for a regulation win</li>
            <li>2 points for an OT/SO win</li>
            <li>1 points for an OT/SO loss</li>
            <li>0 points for a regulation loss</li>
          </ul>
        </div>
      </div>
      <table className={'mt-6 min-w-full table-auto'}>
        <thead>
          <tr>
            <th>Team</th>
            <th>Real Points</th>
            <th>Real Points %</th>
            <th>Hypothetical Points</th>
            <th>Hypothetical Points %</th>
          </tr>
        </thead>
        <tbody className={'divide-y divide-gray-300 dark:divide-gray-600'}>
          {sortedStandings.map(({ teamStandings, team }, index) => (
            <tr key={team.teamId} className={'divide-x divide-gray-300 dark:divide-gray-600'}>
              <td className={'p-2 text-base font-medium'}>
                {index + 1}.
                <Image
                  src={team.logo.url}
                  alt={`${team.name} Logo`}
                  width={36}
                  height={24}
                  className="inline-block dark:hidden"
                />
                <Image
                  src={team.darkLogo.url}
                  alt={`${team.name} Logo`}
                  width={42}
                  height={28}
                  className="hidden dark:inline"
                />
                <span className={'ml-0 hidden md:ml-3 md:inline'}>{team.name}</span>
                <div className={'ml-0 md:ml-3 md:hidden'}>{team.abbreviation.toUpperCase()}</div>
              </td>
              <td className="text-center text-sm">
                {teamStandings.realPoints} / {teamStandings.realPossiblePoints}
              </td>
              <td className="text-center text-sm">
                {formatPointsPercentage(teamStandings.realPointsPercentage)}
              </td>
              <td className="text-center text-sm">
                {teamStandings.hypotheticalPoints} / {teamStandings.hypotheticalPossiblePoints}
              </td>
              <td className="text-center text-sm">
                {formatPointsPercentage(teamStandings.hypotheticalPointsPercentage)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
