import { type Team, type Game } from '@/models'
import { groupGamesByTeam } from '@/utils'
import TableRow from './table-row'

export default function ScheduleTable({ activeTeam, games }: Props): React.ReactElement {
  const groupedGames = groupGamesByTeam(games, activeTeam)

  return (
    <table className={'min-w-full table-auto'}>
      <thead>
        <tr>
          <th>Against</th>
          <th colSpan={4}>Games</th>
          <th>Points %</th>
        </tr>
      </thead>
      <tbody className={'divide-y divide-gray-300 dark:divide-gray-600'}>
        {Object.entries(groupedGames).map(([teamName, games]) => (
          <TableRow teamName={teamName} games={games} key={teamName} />
        ))}
      </tbody>
    </table>
  )
}

type Props = {
  activeTeam: Team
  games: Game[]
}
