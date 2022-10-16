import { ScheduleTable } from '../../components/schedule-table'
import { useSchedule, useTeam } from '../../hooks'

const TeamViewPage = () => {
  const team = useTeam()
  const gamesByTeam = useSchedule(team)

  if (!gamesByTeam) { return null }

  return (
    <>
      <div className={'md:float-right flex flex-col justify-center mb-5 md:mb-10'}>
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
      <ScheduleTable gamesByTeam={gamesByTeam} />
    </>
  )
}

export default TeamViewPage
