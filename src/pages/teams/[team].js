import { ScheduleTable } from '../../components/schedule-table'
import { useSchedule, useTeam } from '../../hooks'

const Cell = ({ color, text }) => (
  <p className={`${color} w-16 text-sm text-center border-y border-neutral-400`}>
    {text}
  </p>
)

const TeamViewPage = () => {
  const team = useTeam()
  const gamesByTeam = useSchedule(team)

  if (!gamesByTeam) { return null }

  return (
    <div>
      <div className={'float-right flex flex-col justify-center mb-10'}>
        <div className={'text-md font-medium text-center mb-2'}>Key:</div>
        <div className={'flex flex-row float-right'}>
          <Cell color={`${team.getSlug()}-primary border-l`} text={'Win'} />
          <Cell color={`${team.getSlug()}-secondary border-x`} text={'OTL'} />
          <Cell color={`${team.getSlug()}-tertiary border-r`} text={'Loss'} />
        </div>
      </div>
      <ScheduleTable gamesByTeam={gamesByTeam} />
    </div>
  )
}

export default TeamViewPage
