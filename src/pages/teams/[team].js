import Head from 'next/head'
import { ScheduleTable, SelectInput } from '../../components'
import { useSchedule, useTeam } from '../../hooks'
import { useState } from 'react'

const seasons = [
  {key: '20232024', name: '2023 - 2024'},
  {key: '20222023', name: '2022 - 2023'},
  {key: '20212022', name: '2021 - 2022'},
]

const TeamViewPage = () => {
  const [season, setSeason] = useState(seasons[1])
  const { team } = useTeam()
  const gamesByTeam = useSchedule(season.key)

  if (!gamesByTeam) { return null }

  return (
    <>
      <Head>
        <title>{team.getName()} Table</title>
      </Head>
      <div className={'flex flex-col md:flex-row justify-between'}>
        <div className={'w-48 mb-5'}>
          <SelectInput onChange={setSeason} options={seasons} selected={season} />
        </div>
      </div>
      <ScheduleTable gamesByTeam={gamesByTeam} />
    </>
  )
}

export default TeamViewPage
