import { useTeam } from '../../hooks'

export const GameCell = ({ game }) => {
  const { team } = useTeam()

  if (!game) {
    return <td className={'text-center text-sm'}> - </td>
  }

  let cellClass, gameOutcome
  if (game.wasWinFor(team)) {
    cellClass = 'bg-green-100 text-green-900'
    gameOutcome = 'Win'
  } else if (game.wasOvertimeLossFor(team) || game.wasShootoutLossFor(team)) {
    cellClass = 'bg-yellow-100 text-yellow-900'
    gameOutcome = 'OTL'
  } else if (game.isFinal()) {
    cellClass = 'bg-red-100 text-red-900'
    gameOutcome = 'Loss'
  }

  return (
    <td className={`${cellClass} text-center text-xs`}>
      <div className={'py-0'}>{game.isHomeTeam(team) ? 'Home' : 'Away'}</div>
      <div>{gameOutcome}</div>
      <div className={'py-0'}>{game.isFinal() ? game.getFinalScore() : game.getFormattedDate()}</div>
    </td>
  )
}
