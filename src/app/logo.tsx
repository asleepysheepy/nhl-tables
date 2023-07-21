import Image from 'next/image'
import { formatTeamSlug } from '@/formatters'

type Props = {
  size: number
  teamName?: string,
}

export default function Logo ({ teamName, size}: Props) {
  if(teamName) {
    return (
      <Image
        alt={`${teamName} Logo`}
        height={size}
        src={`/img/logos/${formatTeamSlug(teamName)}.svg`}
        width={size}
      />
    )
  }
  
  return (
    <Image
      alt={'NHL Logo'}
      height={size}
      src={'/img/logos/nhl.svg'}
      width={size}
    />
  )
}