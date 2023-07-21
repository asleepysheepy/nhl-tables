import type { Game, Team } from '@/models'

import { wasOvertime, wasShootout } from '@/game-service'

/**
 * Formats a teams record as:
 * W - L - OTL
 * 
 * @param team the Team to format the record of
 * @returns the formatted record
 */
export function formatTeamRecord(team: Team): string {
  return `${team.stats.wins} - ${team.stats.losses} - ${team.stats.otLosses}`
}

/**
 * Formats a points percentage as either 1.000 or .XXX
 * 
 * @param pointsPercentage THe points percentage to format
 * @returns the formatted points percentage
 */
export function formatPointsPercentage(pointsPercentage: number): string {
  const formattedPointsPercentage = (pointsPercentage / 100).toFixed(3)

  if (formattedPointsPercentage.startsWith('0')) {
    return formattedPointsPercentage.replace('0', '')
  }

  return formattedPointsPercentage
}

/**
 * The slug is determined by kebab-casing the teams full name.
 * Some additional replacements are needed to account for special characters
 *  - Remove the . in St. Louis
 *  - Replace the é in Montréal with e
 * 
 * Example:
 * Anaheim Ducks -> anaheim-ducks
 * 
 * @param teamName The full name of the Team
 * @returns the kebab-cased team name
 */
export function formatTeamSlug(teamName: string): string {
  return teamName.toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll('.', '')
    .replaceAll('é', 'e')
}
/**
 * Formats a games score as:
 * home - away (modifier)
 * 
 * Examples:
 * 5 - 4 (OT)
 * 2 - 3 (SO)
 * 12 - 0
 * 
 * @param game The game to format the score of
 * @returns the formatted game score
 */
export function formatGameScore(game: Game): string {
  let otSuffix = ''
  if(wasShootout(game)) {
    otSuffix = ' (SO)'
  } else if (wasOvertime(game)) {
    otSuffix = ' (OT)'
  }

  return `${game.homeTeamScore} - ${game.awayTeamScore}${otSuffix}`
}

/**
 * Formats a game's date as a three digit and a day
 * 
 * Examples:
 * May 14
 * Nov 09
 * 
 * @param game The game to format the date of
 * @returns the formatted date
 */
export function formatGameDate(game: Game): string {
  const date = new Date(game.gameDate)

  return date.toLocaleDateString('en-CA', {
    month: 'short',
    day: '2-digit',
  })
}