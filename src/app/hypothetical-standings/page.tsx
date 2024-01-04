import { fetchGames, fetchTeams } from '@/api'
import { StandingsTable } from '@/components'
import { defaultSeason } from '@/constants'
import { getHeaderColorClass, calculateTeamStandings } from '@/utils'

export default async function HypotheticalStandingsPage(): Promise<React.ReactElement> {
  const teams = await fetchTeams()
  const schedules = await Promise.all(
    teams.map(async (team) => ({
      games: await fetchGames(team, defaultSeason),
      team: team,
    })),
  )

  const standings = schedules
    .map(({ games, team }) => ({
      team,
      teamStandings: calculateTeamStandings(games, team),
    }))
    .sort((a, b) => b.teamStandings.realPoints - a.teamStandings.realPoints)
    .map(({ teamStandings, team }, index) => ({
      teamStandings,
      team: {
        ...team,
        name: `${team.name} (${index + 1})`,
        abbreviation: `${team.abbreviation} (${index + 1})`,
      },
    }))

  return (
    <>
      <header className={`${getHeaderColorClass()} shadow dark:shadow-none`}>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="mb-6 text-3xl font-bold text-white">Hypothetical League Standings</h1>
          <p className="max-w-xl text-lg text-white">
            Hypothetical NHL standings table showing the league standings both as they currently are
            with the 2-1-0 point system and how they would look with the popular alternative 3-2-1-0
            point system
          </p>
        </div>
      </header>
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

        <StandingsTable standings={standings} />
      </main>
    </>
  )
}

export const metadata = {
  title: 'Hypothetical NHL Standings',
}
