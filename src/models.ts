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
  gameDate: Date
  gameType: number
  homeTeam: Team
  awayTeam: Team
  homeTeamScore: number
  awayTeamScore: number
  isRegulation: boolean
  isOvertime: boolean
  isShootout: boolean
  endedIn?: 'REG' | 'OT' | 'SO'
  isFinal: boolean
  getWinningTeam: () => Team | undefined
}

export interface TeamStandings {
  realPoints: number
  realPossiblePoints: number
  realPointsPercentage: number
  hypoPoints: number
  hypoPossiblePoints: number
  hypoPointsPercentage: number
}
