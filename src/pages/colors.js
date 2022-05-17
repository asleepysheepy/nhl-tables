import { teams } from '../data'

const Cell = ({ color, text }) => (
  <p className={`${color} w-16 text-center border-y border-neutral-400`}>
    {text}
  </p>
)

const ColorsPage = () => {
  return (
    <div className={'flex flex-wrap'}>
      {teams.all.map((team) => (
        <div className={'m-3'} key={team.nhlId}>
          <div>
            <span>{team.name}</span>
          </div>
          <div className={'flex flex-row'}>
            <Cell color={`${team.cssName}-primary border-l`} text={'win'} />
            <Cell color={`${team.cssName}-secondary border-x`} text={'otl'} />
            <Cell color={`${team.cssName}-tertiary border-r`} text={'loss'} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ColorsPage
