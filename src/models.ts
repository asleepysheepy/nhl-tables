export interface Team {
  id: number
  name: string
  slug: string
  division?: Division
  stats?: TeamStats
}

export interface Division {
  name: string
  id: number
}

export interface TeamStats {
  gamesPlayed: number
  wins: number
  losses: number
  otLosses: number
  points: number
  pointsPercentage: number
}

export interface Game {
  gameId: number
  gameDate: string
  homeTeam: Team
  awayTeam: Team
  homeTeamScore: number
  awayTeamScore: number
  currentPeriod: number
  isFinal: boolean
}

export interface Season {
  key: string
  name: string
}
