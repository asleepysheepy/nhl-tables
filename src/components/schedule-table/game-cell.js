export const GameCell = ({ game, team }) => {
  if (!game) {
    return <td className={'text-center text-sm'}> - </td>
  }

  const pageTeam = game.getOpposingTeam(team)

  const teamClassPrefix = pageTeam.getSlug()
  let cellClass, gameOutcome
  if (game.wasWinFor(pageTeam)) {
    cellClass = `${teamClassPrefix}-primary`
    gameOutcome = 'Win'
  } else if (game.wasOvertimeLossFor(pageTeam) || game.wasShootoutLossFor(pageTeam)) {
    cellClass = `${teamClassPrefix}-secondary`
    gameOutcome = 'OTL'
  } else if (game.isFinal()) {
    cellClass = `${teamClassPrefix}-tertiary`
    gameOutcome = 'Loss'
  }

  return (
    <td className={`${cellClass} text-center text-xs`}>
      <div className={'py-0'}>{game.isHomeTeam(pageTeam) ? 'Home' : 'Away'}</div>
      <div>{gameOutcome}</div>
      <div className={'py-0'}>{game.isFinal() ? game.getFinalScore() : game.getFormattedDate()}</div>
    </td>
  )
}
