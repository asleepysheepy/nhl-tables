import Image from 'next/image'
import { GameCell } from './game-cell'
import { Team } from '../../models'

export const ScheduleTableRow = ({ teamId, games }) => {
  const team = Team.getTeamById(teamId)

  const totalPoints = games.reduce((points, game) => {
    if (!game.isFinal()) {
      return points
    }

    if (game.wasWinFor(game.getOpposingTeam(team))) {
      return points + 2
    } else if (game.wasOvertimeLossFor(game.getOpposingTeam(team))) {
      return points + 1
    } else if (game.wasShootoutLossFor(game.getOpposingTeam(team))) {
      return points + 1
    } else {
      return points
    }
  }, 0)

  const possiblePoints = games.reduce((points, game) => {
    if (!game.isFinal()) {
      return points
    }

    return points + 2
  }, 0)

  let pointsPercentage
  if (possiblePoints === 0) {
    pointsPercentage = 0
  } else if (totalPoints / possiblePoints === 1) {
    pointsPercentage = 100
  } else if (totalPoints / possiblePoints === 0) {
    pointsPercentage = 0
  } else {
    pointsPercentage = Math.round(100 * (totalPoints / possiblePoints))
  }

  return (
    <tr className={'divide-x divide-gray-300'}>
      <td className={'text-sm font-medium text-gray-900 group flex items-center px-4 py-2'}>
        <Image height={30} src={`/img/logos/${team.getSlug()}.svg`} width={30} />
        <span className={'ml-3'}>{team.getName()}</span>
      </td>
      <GameCell game={games[0]} team={team} />
      <GameCell game={games[1]} team={team} />
      <GameCell game={games[2]} team={team} />
      <GameCell game={games[3]} team={team} />
      <td className={'text-center text-sm'}>{totalPoints}</td>
      <td className={'text-center text-sm'}>{pointsPercentage}%</td>
    </tr>
  )
}