import { formatGameDate, formatGameScore } from '@/formatters'
import { type Game, type Team } from '@/models'

export default function GameCell({ game, rowTeam }: Props): React.ReactElement {
  // Return an empty cell if there is no game
  if (game == null) {
    return <td className={'text-center text-sm'}> - </td>
  }

  const wasPageTeamHome = rowTeam.name === game.awayTeam.name
  const pageTeam = wasPageTeamHome ? game.homeTeam : game.awayTeam

  let cellClass = ''
  let gameOutcome = ''

  if (game.isFinal) {
    if (game.getWinningTeam()?.teamId === pageTeam.teamId) {
      cellClass = 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100'
      gameOutcome = 'Win'
    } else if (game.isOvertime || game.isShootout) {
      cellClass = 'bg-yellow-100 text-yellow-900 dark:bg-yellow-700 dark:text-yellow-100'
      gameOutcome = 'OTL'
    } else {
      cellClass = 'bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100'
      gameOutcome = 'Loss'
    }
  }

  return (
    <td className={`${cellClass} text-center text-xs`}>
      <div>{wasPageTeamHome ? 'Home' : 'Away'}</div>
      <div>{gameOutcome}</div>
      <div>{game.isFinal ? formatGameScore(game) : formatGameDate(game.gameDate)}</div>
    </td>
  )
}

type Props = {
  game: Game
  rowTeam: Team
}
