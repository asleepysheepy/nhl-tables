import type { Game, Team } from '@/models'

import { formatTeamSlug } from '@/formatters'

export async function fetchTeamsData (): Promise<Team[]> {
  // Fetch team data from NHL API
  const response = await fetch('https://statsapi.web.nhl.com/api/v1/teams?expand=team.stats')
  const data = await response.json()
  const teamsData = data.teams

  /**
   * Transform the object from the API in to a Team.
   *
   * We only need minimal data about the team compared to what we are given
   * so we can throw the rest away.
   */
  const teams: Team[] = teamsData.map((t: any) => {
    const stats = t.teamStats[0].splits[0].stat

    const team: Team = {
      id: t.id,
      name: t.name,
      slug: formatTeamSlug(t.name),
      division: {
        name: t.division.name,
        id: t.division.id
      },
      stats: {
        gamesPlayed: stats.gamesPlayed,
        wins: stats.wins,
        losses: stats.losses,
        otLosses: stats.ot,
        points: stats.pts,
        pointsPercentage: stats.ptPctg
      }
    }

    return team
  })

  // Sort teams alphabetically by full name
  teams.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    } else if (a.name > b.name) {
      return 1
    } else {
      return 0
    }
  })

  return teams
}

export async function fetchGameData (teamId: number, season: string): Promise<Game[]> {
  const baseUrl = 'https://statsapi.web.nhl.com/api/v1/schedule'
  const teamParam = `teamId=${teamId}`
  const seasonParam = `season=${season}`
  const expandParam = 'expand=schedule.linescore'
  const typeParam = 'gameType=R'

  const response = await fetch(`${baseUrl}?${teamParam}&${seasonParam}&${expandParam}&${typeParam}`)
  const data = await response.json()
  const gameData = data.dates.map((date: any) => date.games[0])

  const games: Game[] = gameData.map((data: any) => ({
    gameId: data.gamePk,
    gameDate: data.gameDate,
    homeTeam: {
      id: data.teams.home.team.id,
      name: data.teams.home.team.name,
      slug: formatTeamSlug(data.teams.home.team.name)
    },
    awayTeam: {
      id: data.teams.away.team.id,
      name: data.teams.away.team.name,
      slug: formatTeamSlug(data.teams.away.team.name)
    },
    homeTeamScore: data.linescore.teams.home.goals,
    awayTeamScore: data.linescore.teams.away.goals,
    currentPeriod: data.linescore.currentPeriod,
    isFinal: data.linescore.currentPeriodTimeRemaining === 'Final'
  }))

  return games
}
