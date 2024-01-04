import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchGames, fetchTeams } from '@/api'
import { ScheduleTable } from '@/components'
import { defaultSeason } from '@/constants'

export default async function Page({ params }: Props) {
  const teams = await fetchTeams()

  const activeTeamId = params.teamId as string
  const activeTeam = teams.find((team) => team.teamId === parseInt(activeTeamId))
  if (activeTeam == null) {
    notFound()
  }

  const games = await fetchGames(activeTeam, defaultSeason)

  return (
    <div className="mx-auto mb-6 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <ScheduleTable activeTeam={activeTeam} games={games} />
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const teams = await fetchTeams()

  const activeTeamId = params.teamId as string
  const activeTeam = teams.find((team) => team.teamId === parseInt(activeTeamId))

  return {
    title: activeTeam?.name != null ? `${activeTeam?.name} Tables` : 'Team Not Found',
  }
}

type Props = {
  params: {
    teamId: string
  }
}
