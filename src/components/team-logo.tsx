import Image from 'next/image'
import { type Team } from '@/models'

export default function TeamLogo({ team, height }: { team: Team; height: number }) {
  return (
    <>
      <Image
        src={team.logo.url}
        alt={`${team.name} Logo`}
        width={height * 1.5}
        height={height}
        className="inline-block dark:hidden"
      />
      <Image
        src={team.darkLogo.url}
        alt={`${team.name} Logo`}
        width={height * 1.5}
        height={height}
        className="hidden dark:inline-block"
      />
    </>
  )
}
