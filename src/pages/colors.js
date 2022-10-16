import { Team } from '../models'

const Cell = ({ color, text }) => (
  <p className={`${color} w-16 text-center border-y border-neutral-400`}>
    {text}
  </p>
)

const ColorsPage = () => {
  return (
    <div className={'flex flex-wrap'}>
      {Team.getTeams().map((team) => (
        <div className={'m-3'} key={team.getId()}>
          <div>
            <span>{team.getName()}</span>
          </div>
          <div className={'flex flex-row'}>
            <Cell color={`${team.getSlug()}-primary border-l`} text={'win'} />
            <Cell color={`${team.getSlug()}-secondary border-x`} text={'otl'} />
            <Cell color={`${team.getSlug()}-tertiary border-r`} text={'loss'} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ColorsPage
