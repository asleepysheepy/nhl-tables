import { defaultSeason } from '@/constants'
import { type Game, type Season, type Team, type TeamStats } from '@/models'

function teamsUrl(): string {
  return (
    'https://records.nhl.com/site/api/franchise' +
    '?include=teams.id&include=teams.active' +
    '&include=teams.triCode&include=teams.fullName' +
    '&include=teams.conference.name&include=teams.division.name' +
    '&include=teams.logos' +
    '&sort=fullName'
  )
}

function teamStatsUrl(franchiseId: number, seasonId: string): string {
  return (
    'https://api.nhle.com/stats/rest/en/team/summary' +
    '?isAggregate=false&isGame=false' +
    '&factCayenneExp=gamesPlayed%3E=1' +
    `&cayenneExp=franchiseId%3D${franchiseId}%20and%20gameTypeId=2%20and%20` +
    `seasonId%3C=${seasonId}%20and%20seasonId%3E=${seasonId}`
  )
}

function teamScheduleUrl(teamAbbreviation: string, seasonId: string): string {
  return `https://api-web.nhle.com/v1/club-schedule-season/${teamAbbreviation}/${seasonId}`
}

export async function fetchTeams(): Promise<Team[]> {
  const response = await fetch(teamsUrl())
  const franchiseData = (await response.json()).data

  const teams: Team[] = franchiseData
    .filter((franchise: RawFranchiseData) => franchise.lastSeasonId === null)
    .map(
      (franchise: RawFranchiseData) =>
        franchise.teams
          .filter((t) => t.active === 'Y')
          .map((t): Team => {
            const currentLogos = t.logos.filter(
              (logo) => logo.endSeason === parseInt(defaultSeason.key),
            )
            const lightLogo = currentLogos.find((l) => l.background === 'light')
            const darkLogo = currentLogos.find((l) => l.background === 'dark')

            return {
              teamId: t.id,
              franchiseId: franchise.id,
              name: t.fullName,
              conferenceName: t.conference.name,
              divisionName: t.division.name,
              abbreviation: t.triCode.toLowerCase(),
              logo: {
                id: lightLogo!.id,
                url: lightLogo!.url,
              },
              darkLogo: {
                id: darkLogo!.id,
                url: darkLogo!.url,
              },
            }
          })[0],
    )

  return teams
}

export async function fetchTeamStats(team: Team, season: Season): Promise<TeamStats> {
  const response = await fetch(teamStatsUrl(team.franchiseId, season.key))
  const teamStatsData = (await response.json()).data[0]

  return {
    gamesPlayed: teamStatsData.gamesPlayed,
    wins: teamStatsData.wins,
    losses: teamStatsData.losses,
    otLosses: teamStatsData.otLosses,
    points: teamStatsData.points,
    pointsPercentage: teamStatsData.pointPct,
  }
}

export async function fetchGames(team: Team, season: Season): Promise<Game[]> {
  const teams = await fetchTeams()

  const response = await fetch(teamScheduleUrl(team.abbreviation, season.key))
  const rawScheduleData = (await response.json()).games

  const games: Game[] = rawScheduleData
    .map((gameData: RawGameData): Game => {
      const endedIn = gameData.gameOutcome?.lastPeriodType
      const isFinal = gameData.gameState === 'OFF'

      const homeTeam = teams.find((team) => team.teamId === gameData.homeTeam.id)!
      const homeTeamScore = gameData.homeTeam.score ?? 0
      const awayTeam = teams.find((team) => team.teamId === gameData.awayTeam.id)!
      const awayTeamScore = gameData.awayTeam.score ?? 0

      return {
        gameId: gameData.id,
        gameDate: new Date(gameData.gameDate),
        gameType: gameData.gameType,
        isRegulation: isFinal && endedIn === 'REG',
        isOvertime: isFinal && endedIn === 'OT',
        isShootout: isFinal && endedIn === 'SO',
        homeTeam,
        awayTeam,
        homeTeamScore,
        awayTeamScore,
        endedIn,
        isFinal,
        getWinningTeam: () => {
          if (homeTeamScore > awayTeamScore) {
            return homeTeam
          } else if (awayTeamScore > homeTeamScore) {
            return awayTeam
          }
        },
      }
    })
    .filter((game: Game) => game.gameType === 2)

  return games
}

type RawFranchiseData = {
  id: number
  lastSeasonId?: number
  teams: {
    id: number
    fullName: string
    triCode: string
    active: 'Y' | 'N'
    conference: {
      name: string
    }
    division: {
      name: string
    }
    logos: {
      id: number
      endSeason: number
      background: 'light' | 'dark'
      url: string
    }[]
  }[]
}

type RawGameData = {
  id: number
  season: 20232024
  gameType: 1 | 2 | 3
  gameDate: string
  gameState: string
  awayTeam: {
    id: number
    score?: number
  }
  homeTeam: {
    id: number
    score?: number
  }
  gameOutcome?: {
    lastPeriodType: 'REG' | 'OT' | 'SO'
  }
}
