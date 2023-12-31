'use client'

import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { formatPointsPercentage } from '@/formatters'
import { type Team, type TeamStandings } from '@/models'
import { TeamLogo } from '..'

enum SortOptions {
  points = 'points',
  pointsPtg = 'pointsPtg',
  hypoPoints = 'hypoPoints',
  hypoPointsPtg = 'hypoPointsPtg',
}

export default function StandingsTable({ standings }: Props) {
  const [sortBy, setSortBy] = useState(SortOptions.points)

  const sortedStandings = standings.sort((a, b) => {
    switch (sortBy) {
      case SortOptions.pointsPtg:
        return b.teamStandings.realPointsPercentage - a.teamStandings.realPointsPercentage
      case SortOptions.hypoPoints:
        return b.teamStandings.hypoPoints - a.teamStandings.hypoPoints
      case SortOptions.hypoPointsPtg:
        return b.teamStandings.hypoPointsPercentage - a.teamStandings.hypoPointsPercentage
      case SortOptions.points:
      default:
        return b.teamStandings.realPoints - a.teamStandings.realPoints
    }
  })

  function renderTableColumnHeading(label: string, sortOption: SortOptions) {
    return (
      <th className="w-2/12">
        <div className="flex flex-row items-center justify-center">
          <span>{label}</span>
          {sortOption !== sortBy && (
            <button onClick={() => setSortBy(sortOption)}>
              <ChevronUpDownIcon aria-hidden={'true'} className={'h-5 w-5'} />
              <div className="sr-only">Sort table by {label}</div>
            </button>
          )}
        </div>
      </th>
    )
  }

  return (
    <table className={'mt-6 min-w-full max-w-sm table-fixed'}>
      <thead>
        <tr>
          <th className="w-1/24">
            <span className="sr-only">Ranking</span>
          </th>
          <th className="w-7/24">Team</th>
          {renderTableColumnHeading('Pts', SortOptions.points)}
          {renderTableColumnHeading('Pts %', SortOptions.pointsPtg)}
          {renderTableColumnHeading('Hypo Pts', SortOptions.hypoPoints)}
          {renderTableColumnHeading('Hypo Pts %', SortOptions.hypoPointsPtg)}
        </tr>
      </thead>
      <tbody className={'divide-y divide-gray-300 dark:divide-gray-600'}>
        {sortedStandings.map(({ teamStandings, team }, index) => (
          <tr key={team.teamId} className={'divide-x divide-gray-300 dark:divide-gray-600'}>
            <td className="text-sm font-normal text-gray-500 dark:text-gray-400">{index + 1}.</td>
            <td
              className={
                'flex flex-col items-center justify-center p-2 text-sm font-medium md:flex-row md:justify-start'
              }
            >
              <TeamLogo team={team} height={28} />
              <div className={'ml-0 hidden md:ml-3 md:inline'}>{team.name}</div>
              <div className={'ml-0 md:ml-3 md:hidden'}>{team.abbreviation.toUpperCase()}</div>
            </td>
            <td className="text-center text-sm">
              {teamStandings.realPoints} / {teamStandings.realPossiblePoints}
            </td>
            <td className="text-center text-sm">
              {formatPointsPercentage(teamStandings.realPointsPercentage)}
            </td>
            <td className="text-center text-sm">
              {teamStandings.hypoPoints} / {teamStandings.hypoPossiblePoints}
            </td>
            <td className="text-center text-sm">
              {formatPointsPercentage(teamStandings.hypoPointsPercentage)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

type Props = {
  standings: {
    team: Team
    teamStandings: TeamStandings
  }[]
}
