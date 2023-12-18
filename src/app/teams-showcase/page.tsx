import Image from 'next/image'
import { fetchTeams } from '@/api'

export default async function TeamsShowcasePage() {
  const teams = await fetchTeams()

  return (
    <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <ul className="divide-y-2 divide-gray-200 dark:divide-gray-700">
        {teams.map((team) => (
          <li key={team.teamId} className="py-3">
            <h2 className="text-2xl font-medium">
              {team.name} - {team.abbreviation.toUpperCase()}
            </h2>
            <div className="text-sm">
              <span className="font-semibold">Conference: </span>
              {team.conferenceName} | <span className="font-semibold">Division: </span>
              {team.divisionName}
            </div>
            <div className="my-4 flex gap-4">
              <Image
                src={team.logo.url}
                alt={`${team.name} Light Logo`}
                width={150}
                height={100}
                className="border-2 border-black bg-white p-2"
              />
              <Image
                src={team.darkLogo.url}
                alt={`${team.name} Dark Logo`}
                width={150}
                height={100}
                className={`border-2 border-black bg-[--color-${team.abbreviation}] p-2`}
              />
            </div>
            <details>
              <summary>
                <h3 className="text-md inline font-medium">Raw Data:</h3>
              </summary>
              <pre className="rounded-lg border-2 border-gray-200 bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-700">
                {JSON.stringify(team, undefined, 2)}
              </pre>
            </details>
          </li>
        ))}
      </ul>

      {/*
       * Tailwind doesn't include classes it doesn't see being used in the css build.
       *
       * This is a lazy hack to get bg color classes for each team included in the build since
       * these classes are built with template strings.
       */}
      <span className="bg-[--color-ana]" />
      <span className="bg-[--color-ari]" />
      <span className="bg-[--color-bos]" />
      <span className="bg-[--color-buf]" />
      <span className="bg-[--color-cgy]" />
      <span className="bg-[--color-car]" />
      <span className="bg-[--color-chi]" />
      <span className="bg-[--color-col]" />
      <span className="bg-[--color-cbj]" />
      <span className="bg-[--color-dal]" />
      <span className="bg-[--color-det]" />
      <span className="bg-[--color-edm]" />
      <span className="bg-[--color-fla]" />
      <span className="bg-[--color-lak]" />
      <span className="bg-[--color-min]" />
      <span className="bg-[--color-mtl]" />
      <span className="bg-[--color-nsh]" />
      <span className="bg-[--color-njd]" />
      <span className="bg-[--color-nyi]" />
      <span className="bg-[--color-nyr]" />
      <span className="bg-[--color-ott]" />
      <span className="bg-[--color-phi]" />
      <span className="bg-[--color-pit]" />
      <span className="bg-[--color-sjs]" />
      <span className="bg-[--color-sea]" />
      <span className="bg-[--color-stl]" />
      <span className="bg-[--color-tbl]" />
      <span className="bg-[--color-tor]" />
      <span className="bg-[--color-van]" />
      <span className="bg-[--color-vgk]" />
      <span className="bg-[--color-wsh]" />
      <span className="bg-[--color-wpg]" />
    </main>
  )
}
