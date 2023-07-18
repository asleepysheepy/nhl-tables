import Head from 'next/head'
import Link from 'next/link'
import { Team } from '../models'
import { TeamLogo } from '../components'

const Home = () => {
  return (
    <>
      <Head>
        <title>Help! idk what to put here.</title>
      </Head>
      <div className={'mb-6'}>
        <p className={'text-2xl'}>
          Select a team to see how they&apos;re doing against every other team.
        </p>
      </div>
      <div className={' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4'}>
        {Team.getTeams().map((team) => (
          <div className={'m-3'} key={team.getId()}>
            <Link className={'flex flex-col items-center text-center text-lg font-semibold hover:bg-gray-100 p-4'} href={`/teams/${team.getSlug()}`}>
              <TeamLogo size={150} team={team} />
              {team.getName()}
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
