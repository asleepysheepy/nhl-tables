export type Team = {
  id: number
  name: string
  abbreviation: string
  slug: string
  division: Division
  stats: TeamStats
}

export type Division = {
  name: string
  id: number
}

export type TeamStats = {
  gamesPlayed: number
  wins: number
  losses: number
  otLosses: number
  points: number
  pointsPercentage: number
}

export type Game = {
  gameId: number
  gameDate: string
  homeTeam: {
    id: number,
    name: string,
    slug: string,
  }
  awayTeam: {
    id: number,
    name: string,
    slug: string,
  }
  homeTeamScore: number
  awayTeamScore: number
  currentPeriod: number
  isFinal: boolean
}

export type Season = {
  key: string
  name: string
}
