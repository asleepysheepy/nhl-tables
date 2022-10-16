import { ScheduleTableRow } from './schedule-table-row'
import { Team } from '../../models'

const ScheduleTable = ({ gamesByTeam }) => {
  const sortedTeams = Object.keys(gamesByTeam).sort((a, b) => {
    const aTeam = Team.getTeamById(a)
    const bTeam = Team.getTeamById(b)

    if (aTeam.getName() < bTeam.getName()) {
      return -1
    } else if (aTeam.getName() > bTeam.getName()) {
      return 1
    } else {
      return 0
    }
  })

  return (
    <table className={'table-auto min-w-full'}>
      <thead>
        <tr>
          <th>Against</th>
          <th colSpan={4}>Games</th>
          <th>Total Points</th>
          <th>Points %</th>
        </tr>
      </thead>
      <tbody className={'divide-y divide-gray-300'}>
        {sortedTeams.map((teamId) => (
          <ScheduleTableRow
            games={gamesByTeam[teamId]}
            key={teamId}
            teamId={teamId}
          />
        ))}
      </tbody>
    </table>
  )
}

export { ScheduleTable }
