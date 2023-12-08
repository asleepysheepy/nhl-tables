import type { Game, Season, Team, TeamStats } from '@/models'
import { formatTeamSlug } from '@/formatters'
import { defaultSeason } from '@/constants'

function teamsUrl (): string {
  return 'https://records.nhl.com/site/api/franchise' +
    '?include=teams.id&include=teams.active' +
    '&include=teams.triCode&include=teams.fullName' +
    '&include=teams.conference.name&include=teams.division.name' +
    '&include=teams.logos' +
    '&sort=fullName'
}

function teamStatsUrl (franchiseId: number, seasonId: string): string {
  return 'https://api.nhle.com/stats/rest/en/team/summary' +
    '?isAggregate=false&isGame=false' +
    '&factCayenneExp=gamesPlayed%3E=1' +
    `&cayenneExp=franchiseId%3D${franchiseId}%20and%20gameTypeId=2%20and%20` +
    `seasonId%3C=${seasonId}%20and%20seasonId%3E=${seasonId}`
}

export async function fetchTeams (): Promise<Team[]> {
  const response = await fetch(teamsUrl())
  const franchiseData = (await response.json()).data

  const teams: Team[] = franchiseData
    .filter((franchise: any) => franchise.lastSeasonId === null)
    .map(
      (franchise: any) =>
        franchise.teams
          .filter((t: any) => t.active === 'Y')
          .map((t: any): Team => {
            const currentLogos = t.logos.filter(
              (logo: any) => logo.endSeason === parseInt(defaultSeason.key)
            )
            const lightLogo = currentLogos.find(
              (l: any) => l.background === 'light'
            )
            const darkLogo = currentLogos.find(
              (l: any) => l.background === 'dark'
            )

            return {
              teamId: t.id,
              franchiseId: franchise.id,
              name: t.fullName,
              conferenceName: t.conference.name,
              divisionName: t.division.name,
              abbreviation: t.triCode.toLowerCase(),
              logo: {
                id: lightLogo.id,
                url: lightLogo.url
              },
              darkLogo: {
                id: darkLogo.id,
                url: darkLogo.url
              }
            }
          })[0]
    )

  return teams
}

export async function fetchTeamStats (team: Team, season: Season): Promise<TeamStats> {
  const response = await fetch(teamStatsUrl(team.franchiseId, season.key))
  const teamStatsData = (await response.json()).data[0]

  return {
    gamesPlayed: teamStatsData.gamesPlayed,
    wins: teamStatsData.wins,
    losses: teamStatsData.losses,
    otLosses: teamStatsData.otLosses,
    points: teamStatsData.points,
    pointsPercentage: teamStatsData.pointPct
  }
}

export async function fetchGameData (
  teamId: number,
  season: string
): Promise<Game[]> {
  const baseUrl = 'https://statsapi.web.nhl.com/api/v1/schedule'
  const teamParam = `teamId=${teamId}`
  const seasonParam = `season=${season}`
  const expandParam = 'expand=schedule.linescore'
  const typeParam = 'gameType=R'

  const response = await fetch(
    `${baseUrl}?${teamParam}&${seasonParam}&${expandParam}&${typeParam}`
  )
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
