import Image from 'next/image'
import Link from 'next/link'
import { fetchTeams } from '@/api'
import { getHeaderColorClass } from '@/utils'

export default async function HomePage(): Promise<React.ReactElement> {
  const teams = await fetchTeams()

  return (
    <>
      <header className={`${getHeaderColorClass()} shadow dark:shadow-none`}>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white">
            NHL Schedule Tables
          </h1>
        </div>
      </header>

      <div className={'mx-auto mb-6 max-w-7xl px-4 py-6 sm:px-6 lg:px-8'}>
        <p className={'text-2xl'}>
          Select a team to see how they&apos;re doing against other teams.
        </p>

        <ul className={' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4'}>
          {teams.map((team) => (
            <li className={'m-3'} key={team.teamId}>
              <Link
                className="flex flex-col items-center p-4 text-center text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700"
                href={`/teams/${team.teamId}`}
              >
                <Image
                  src={team.logo.url}
                  alt={`${team.name} Logo`}
                  width={150}
                  height={100}
                  className="mb-2 dark:hidden"
                />
                <Image
                  src={team.darkLogo.url}
                  alt={`${team.name} Logo`}
                  width={150}
                  height={100}
                  className="mb-2 hidden dark:inline"
                />
                {team.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export const metadata = {
  title: 'NHL Schedule Tables',
}
