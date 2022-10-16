import { ScheduleTable } from '../../components/schedule-table'
import { SelectInput } from '../../components/select-input'
import { useSchedule, useTeam } from '../../hooks'
import { useState } from 'react'

const seasons = [
  {key: '20222023', name: '2022 - 2023'},
  {key: '20212022', name: '2021 - 2022'},
]

const TeamViewPage = () => {
  const [season, setSeason] = useState(seasons[0])
  const team = useTeam()
  const gamesByTeam = useSchedule(team, season.key)

  if (!gamesByTeam) { return null }

  return (
    <>
      <div className={'flex flex-col md:flex-row justify-between'}>
        <div className={'w-48 mb-5 md:mb-0'}>
          <SelectInput onChange={setSeason} options={seasons} selected={season} />
        </div>
        <div className={'flex flex-col justify-center mb-5 md:mb-10'}>
          <div className={'w-48 text-md font-medium text-center mb-2'}>Key:</div>
          <div className={'flex'}>
            <p className={`${team.getSlug()}-primary border-l w-16 text-sm text-center border-y border-neutral-400`}>
              Win
            </p>
            <p className={`${team.getSlug()}-secondary border-x w-16 text-sm text-center border-y border-neutral-400`}>
              OTL
            </p>
            <p className={`${team.getSlug()}-tertiary border-r w-16 text-sm text-center border-y border-neutral-400`}>
              Loss
            </p>
          </div>
        </div>
      </div>
      <ScheduleTable gamesByTeam={gamesByTeam} />
    </>
  )
}

export default TeamViewPage
