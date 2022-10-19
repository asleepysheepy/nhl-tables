import Head from 'next/head'
import { ScheduleTable, SelectInput, TeamColorKey } from '../../components'
import { useSchedule, useTeam } from '../../hooks'
import { useState } from 'react'

const seasons = [
  {key: '20222023', name: '2022 - 2023'},
  {key: '20212022', name: '2021 - 2022'},
]

const TeamViewPage = () => {
  const [season, setSeason] = useState(seasons[0])
  const { team, teamClassName } = useTeam()
  const gamesByTeam = useSchedule(season.key)

  if (!gamesByTeam) { return null }

  return (
    <>
      <Head>
        <title>{team.getName()} Table</title>
      </Head>
      <div className={'flex flex-col md:flex-row justify-between'}>
        <div className={'w-48 mb-5 md:mb-0'}>
          <SelectInput onChange={setSeason} options={seasons} selected={season} />
        </div>
        <div className={'mb-5 md:mb-10'}>
          <TeamColorKey labelText={'Key:'} teamClassName={teamClassName} />
        </div>
      </div>
      <ScheduleTable gamesByTeam={gamesByTeam} />
    </>
  )
}

export default TeamViewPage
