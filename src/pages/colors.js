import Head from 'next/head'
import { Team } from '../models'
import { TeamColorKey } from '../components'

const ColorsPage = () => {
  return (
    <>
      <Head>
        <title>Team colors index</title>
      </Head>
      <div className={'flex flex-wrap'}>
        {Team.getTeams().map((team) => (
          <div className={'m-3'} key={team.getId()}>
            <TeamColorKey labelText={team.getName()} teamClassName={team.getSlug()} />
          </div>
        ))}
      </div>
    </>
  )
}

export default ColorsPage
