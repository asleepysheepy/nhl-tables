import type { Game, Team } from '@/models'

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
  const groupedGames = games.reduce((gamesObject, game) => {
    const opposingTeamName = getOpposingTeam(game, team.name).name

    if(gamesObject[opposingTeamName]) {
      gamesObject[opposingTeamName].push(game)
    } else {
      gamesObject[opposingTeamName] = [game]
    }

    return gamesObject
  }, {} as Record<string, Game[]>)

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

/**
 * Given a Team in a Game, returns the opposing team
 * 
 * @param game The Game to get the opponent from
 * @param team The teamName to get the opponent of
 * @returns The  team playing against the given team.
 */
export function getOpposingTeam(game: Game, teamName: string) {
  if (game.awayTeam.name === teamName) {
    return game.homeTeam
  }

  return game.awayTeam
}

/**
 * Checks whether the game ended in over time for not.
 * 
 * @param game The game to check the status of
 * @returns True if the game ended in overtime
 */
export function wasOvertime(game: Game): boolean {
  return game.currentPeriod === 4
}

/**
 * Checks whether the game ended in a shootout for not.
 * 
 * @param game The game to check the status of
 * @returns True if the game ended in a shootout
 */
export function wasShootout(game: Game): boolean {
  return game.currentPeriod === 5
}

/**
 * Determines which team won the given game
 * 
 * @param game the game to check the winner for
 * @returns the winning team
 */
export function getWinningTeam(game: Game) {
  if(game.homeTeamScore > game.awayTeamScore) {
    return game.homeTeam
  }

  return game.awayTeam
}

/**
 * Checks if the given team won the given game
 * 
 * @param game the game to check the winning team for
 * @param teamName the team to check for
 * @returns true if the given team won
 */
export function wasWinFor(game: Game, teamName: string): boolean {
  const winningTeam = getWinningTeam(game)

  return winningTeam.name === teamName
}

export function isHomeTeam(game: Game, teamName: string): boolean {
  return game.homeTeam.name === teamName
}