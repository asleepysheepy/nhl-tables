import { type Game, type Team } from '@/models'

/**
 * Gets a css class which sets the background color to either the given
 * team's color or black if no team is given.
 *
 * Used for page headers and the navbar
 *
 * @param activeTeam The team whose page the user is on
 * @returns the css class to set the background color
 */
export function getHeaderColorClass(activeTeam?: Team): string {
  return activeTeam != null
    ? `bg-[--color-${activeTeam.abbreviation}]`
    : 'bg-black dark:bg-gray-900'
}

export function calculatePointsPercentage(earnedPoints: number, possiblePoints: number): number {
  return possiblePoints === 0 ? 0 : Math.round(100 * (earnedPoints / possiblePoints))
}

/**
 * Given a Team in a Game, returns the opposing team
 *
 * @param game The Game to get the opponent from
 * @param team The teamName to get the opponent of
 * @returns The  team playing against the given team.
 */
export function getOpposingTeam(game: Game, teamName: string): Team {
  if (game.awayTeam.name === teamName) {
    return game.homeTeam
  }

  return game.awayTeam
}

/**
 * Takes a like of full season games for a team, and maps them by the
 * opposing team in each game. Games are sorted by team, alphabetically
 *
 * Simplified example:
 *
 * input: [{ homeTeam: 'Anaheim Ducks', awayTeam: 'San Jose Sharks'}, { homeTeam: 'Los Angeles Kings', awayTeam: 'Anaheim Ducks'}]
 * output: {
 *   'Los Angeles Kings': [{ homeTeam: 'Los Angeles Kings', awayTeam: 'Anaheim Ducks'}],
 *   'San Jose Sharks': [{ homeTeam: 'Anaheim Ducks', awayTeam: 'San Jose Sharks'}]
 * }
 *
 * @param games The list of games
 * @param team the team who page we're on, needed to know which teams to group by
 * @returns the games, mapped to teams
 */
export function groupGamesByTeam(games: Game[], team: Team): Record<string, Game[]> {
  const groupedGames = games.reduce<Record<string, Game[]>>((gamesObject, game) => {
    const opposingTeamName = getOpposingTeam(game, team.name).name

    if (gamesObject[opposingTeamName] != null) {
      gamesObject[opposingTeamName].push(game)
    } else {
      gamesObject[opposingTeamName] = [game]
    }

    return gamesObject
  }, {})

  const sortedGroupedGames = Object.entries(groupedGames).sort((a, b) => {
    if (a[0] < b[0]) {
      return -1
    } else if (a[0] > b[0]) {
      return 1
    } else {
      return 0
    }
  })

  return Object.fromEntries(sortedGroupedGames)
}

type TeamStandings = {
  realPoints: number
  realPossiblePoints: number
  realPointsPercentage: number
  hypotheticalPoints: number
  hypotheticalPossiblePoints: number
  hypotheticalPointsPercentage: number
}

export function calculateTeamStandings(games: Game[], team: Team): TeamStandings {
  const initialTeamStandings = {
    realPoints: 0,
    realPossiblePoints: 0,
    realPointsPercentage: 0,
    hypotheticalPoints: 0,
    hypotheticalPossiblePoints: 0,
    hypotheticalPointsPercentage: 0,
  }

  return games.reduce((standings, game) => {
    let { realPoints, realPossiblePoints, hypotheticalPoints, hypotheticalPossiblePoints } =
      standings

    if (!game.isFinal) {
      return standings
    }

    realPossiblePoints += 2
    hypotheticalPossiblePoints += 3

    const winningTeam = game.getWinningTeam()!

    if (winningTeam.teamId === team.teamId) {
      realPoints += 2

      if (game.isOvertime || game.isShootout) {
        hypotheticalPoints += 2
      } else {
        hypotheticalPoints += 3
      }
    } else {
      if (game.isOvertime || game.isShootout) {
        realPoints += 1
        hypotheticalPoints += 1
      } else {
        realPoints += 0
        hypotheticalPoints += 0
      }
    }

    return {
      realPoints,
      realPossiblePoints,
      realPointsPercentage: calculatePointsPercentage(realPoints, realPossiblePoints),
      hypotheticalPoints,
      hypotheticalPossiblePoints,
      hypotheticalPointsPercentage: calculatePointsPercentage(
        hypotheticalPoints,
        hypotheticalPossiblePoints,
      ),
    }
  }, initialTeamStandings)
}
