import Image from 'next/image'
import { formatPointsPercentage } from '@/formatters'
import { type Game } from '@/models'
import GameCell from './game-cell'

export default function TableRow({ teamName, games }: Props): React.ReactElement {
  const rowTeam = games[0].homeTeam.name === teamName ? games[0].homeTeam : games[0].awayTeam
  const pageTeam = games[0].homeTeam.name === teamName ? games[0].awayTeam : games[0].homeTeam

  // Calculates the total points the "page team" has earned against the "row team"
  const totalPoints = games.reduce((points, game) => {
    if (game.getWinningTeam()?.teamId === pageTeam.teamId) {
      return points + 2
    } else if (game.isOvertime || game.isShootout) {
      return points + 1
    } else {
      return points
    }
  }, 0)

  // Calculates the total number of points possible, two points per completed game
  const possiblePoints = games.reduce((points, game) => {
    if (!game.isFinal) {
      return points
    }

    return points + 2
  }, 0)

  /**
   * Calculate the points percentage for the row, if the possible points are 0 (ie, the two
   * teams haven't played each other yet) then set the percentage to 0 rather than trying
   * to divide by 0.
   */
  const pointsPercentage =
    possiblePoints === 0 ? 0 : Math.round(100 * (totalPoints / possiblePoints))

  return (
    <tr className={'divide-x divide-gray-300 dark:divide-gray-600'}>
      <td className={'p-2 text-base font-medium'}>
        <Image
          src={rowTeam.logo.url}
          alt={`${rowTeam.name} Logo`}
          width={36}
          height={24}
          className="inline-block dark:hidden"
        />
        <Image
          src={rowTeam.darkLogo.url}
          alt={`${rowTeam.name} Logo`}
          width={42}
          height={28}
          className="hidden dark:inline"
        />
        <span className={'ml-0 hidden md:ml-3 md:inline'}>{rowTeam.name}</span>
        <div className={'ml-0 md:ml-3 md:hidden'}>{rowTeam.abbreviation.toUpperCase()}</div>
      </td>
      {/* For the sake of the table, we alway want to render the same number of
       * cells regardless of the number of games. */}
      <GameCell game={games[0]} rowTeam={rowTeam} />
      <GameCell game={games[1]} rowTeam={rowTeam} />
      <GameCell game={games[2]} rowTeam={rowTeam} />
      <GameCell game={games[3]} rowTeam={rowTeam} />
      <td className={'p-2 text-center text-sm'}>
        <div>{`${totalPoints} / ${possiblePoints}`}</div>
        <div>{formatPointsPercentage(pointsPercentage)}</div>
      </td>
    </tr>
  )
}

type Props = {
  teamName: string
  games: Game[]
}
