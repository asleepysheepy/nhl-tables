import { useTeam } from '../../hooks'

export const GameCell = ({ game }) => {
  const { team, teamClassName } = useTeam()

  if (!game) {
    return <td className={'text-center text-sm'}> - </td>
  }

  let cellClass, gameOutcome
  if (game.wasWinFor(team)) {
    cellClass = `${teamClassName}-primary`
    gameOutcome = 'Win'
  } else if (game.wasOvertimeLossFor(team) || game.wasShootoutLossFor(team)) {
    cellClass = `${teamClassName}-secondary`
    gameOutcome = 'OTL'
  } else if (game.isFinal()) {
    cellClass = `${teamClassName}-tertiary`
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
