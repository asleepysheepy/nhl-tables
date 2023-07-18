import Image from 'next/image'

export const TeamLogo = ({ team, size}) => {
  return (
    <Image
      alt={`${team.getName()} Logo`}
      height={size}
      src={`/img/logos/${team.getSlug()}.svg`}
      width={size}
    />
  )
}
