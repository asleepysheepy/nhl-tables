import Link from 'next/link'
import Logo from './logo'
import { fetchTeamsData } from '@/api'

export default async function HomePage (): Promise<React.ReactElement> {
  const teams = await fetchTeamsData()

  return (
    <div>
      <div className={'mb-6'}>
        <p className={'text-2xl'}>
          Select a team to see how they&apos;re doing against other teams.
        </p>

        <ul className={' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4'}>
          {teams.map((team) => (
            <li className={'m-3'} key={team.id}>
              <Link
                className={'flex flex-col items-center text-center text-lg font-semibold hover:bg-gray-100 p-4'}
                href={`/teams/${team.id}`}
              >
                <Logo size={100} teamName={team.name} />
                {team.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'NHL Schedule Tables'
}
