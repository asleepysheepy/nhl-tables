import { type Game, type TeamStats } from '@/models'

/**
 * Formats a teams record as:
 * W - L - OTL
 *
 * @param states the Team's stats to format the record from
 * @returns the formatted record
 */
export function formatTeamRecord(stats: TeamStats): string {
  return `${stats.wins} - ${stats.losses} - ${stats.otLosses}`
}

/**
 * Formats a points percentage as .XXX
 *
 * TODO FOrmatting for .000 and 1.000, need to see how those numbers come back
 * from the NHL's new API
 *
 * @param pointsPercentage THe points percentage to format
 * @returns the formatted points percentage
 */
export function formatPointsPercentage(pointsPercentage: number): string {
  const formattedPointsPercentage =
    pointsPercentage % 1 === 0 ? (pointsPercentage / 100).toFixed(3) : pointsPercentage.toFixed(3)

  if (formattedPointsPercentage.startsWith('0')) {
    return formattedPointsPercentage.replace('0', '')
  }

  return formattedPointsPercentage
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
  if (game.isShootout) {
    otSuffix = ' (SO)'
  } else if (game.isOvertime) {
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
export function formatGameDate(date: Date): string {
  return date.toLocaleDateString('en-CA', {
    timeZone: 'UTC',
    month: 'short',
    day: '2-digit',
  })
}
