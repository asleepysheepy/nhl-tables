export interface Season {
  key: string
  name: string
}

interface Logo {
  id: number
  url: string
}

export interface Team {
  teamId: number
  franchiseId: number
  conferenceName: string
  divisionName: string
  name: string
  abbreviation: string
  logo: Logo
  darkLogo: Logo
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
