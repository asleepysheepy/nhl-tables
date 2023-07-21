import type { Game } from '@/models'

import { isHomeTeam, wasOvertime, wasShootout, wasWinFor } from '@/game-service'
import { formatGameDate, formatGameScore } from '@/formatters'

type Props = {
  /**
   * The game to be represented by this cell
   */
  game: Game

  /**
   * The "row team", aka the team represented by this row in the table
   */
  teamName: string
}

export default function GameCell({ game, teamName }: Props) {
  // Return an empty cell if there is no game
  if (!game) {
    return <td className={'text-center text-sm'}> - </td>
  }

  /**
   * teamName represents the row team, if they are not the home team,
   * then the page team must be
   */
  const wasPageTeamHome = !isHomeTeam(game, teamName)
  const pageTeam = wasPageTeamHome ? game.homeTeam : game.awayTeam

  let cellClass, gameOutcome
  if(game.isFinal) {
    if (wasWinFor(game, pageTeam.name)) {
      cellClass = 'bg-green-100 text-green-900'
      gameOutcome = 'Win'
    } else if (wasOvertime(game) || wasShootout(game)) {
      cellClass = 'bg-yellow-100 text-yellow-900'
      gameOutcome = 'OTL'
    } else {
      cellClass = 'bg-red-100 text-red-900'
      gameOutcome = 'Loss'
    }
  }
  

  return (
    <td className={`${cellClass} text-center text-xs`}>
      <div className={'py-0'}>{wasPageTeamHome ? 'Home' : 'Away'}</div>
      <div>{gameOutcome}</div>
      <div className={'py-0'}>{game.isFinal ? formatGameScore(game) : formatGameDate(game)}</div>
    </td>
  )
}