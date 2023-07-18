import Image from 'next/image'

export const NhlLogo = ({ size}) => {
  return (
    <Image
      alt={'NHL Logo'}
      height={size}
      src={'/img/logos/nhl.svg'}
      width={size}
    />
  )
}
