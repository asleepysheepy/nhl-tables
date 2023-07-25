import type { Game } from '@/models'

import GameCell from './game-cell'
import Logo from '@/app/logo'
import { formatTeamSlug, formatPointsPercentage } from '@/formatters'
import { wasWinFor, wasOvertime, wasShootout } from '@/game-service'

interface Props {
  /**
   * The game to be represented by this cell
   */
  games: Game[]

  /**
   * The "row team", aka the team represented by this row in the table
   */
  teamName: string
}

export default function TableRow ({ teamName, games }: Props): React.ReactElement {
  // Calculates the total points the "page team" has earned against the "row team"
  const totalPoints = games.reduce((points, game) => {
    // No points for a game that isn't over yet
    if (!game.isFinal) { return points }

    /**
     * If the game wasn't a win for the "row team", it was a win for the page tame, two points
     * If it wasn't a win for the page team, but did go to a shootout or OT, one point
     * Otherwise it was a regulation loss, no points
     */
    if (!wasWinFor(game, teamName)) {
      return points + 2
    } else if (wasOvertime(game) || wasShootout(game)) {
      return points + 1
    } else {
      return points
    }
  }, 0)

  // Calculates the total number of points possible, two points per completed game
  const possiblePoints = games.reduce((points, game) => {
    if (!game.isFinal) { return points }

    return points + 2
  }, 0)

  /**
    * Calculate the points percentage for the row, if the possible points are 0 (ie, the two
    * teams haven't played each other yet) then set the percentage to 0 rather than trying
    * to divide by 0.
    */
  const pointsPercentage = possiblePoints === 0 ? 0 : Math.round(100 * (totalPoints / possiblePoints))

  return (
    <tr className={'divide-x divide-gray-300'} key={formatTeamSlug(teamName)}>
      <td className={'text-sm font-medium text-gray-900 group flex items-center py-2'}>
        <div className={'hidden md:block'}>
          <Logo size={30} teamName={teamName} />
        </div>
        <span className={'ml-0 md:ml-3'}>{teamName}</span>
      </td>
      {/* For the sake of the table, we alway want to render the same number of
        * cells regardless of the number of games.
       */}
      <GameCell game={games[0]} teamName={teamName} />
      <GameCell game={games[1]} teamName={teamName} />
      <GameCell game={games[2]} teamName={teamName} />
      <GameCell game={games[3]} teamName={teamName} />
      <td className={'text-center text-sm'}>{totalPoints}</td>
      <td className={'text-center text-sm'}>{formatPointsPercentage(pointsPercentage)}</td>
    </tr>
  )
}
