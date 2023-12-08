import Image from 'next/image'
interface Props {
  size: number
}

export default function Logo ({ size }: Props): React.ReactElement {
  return (
    <Image
      alt={'NHL Logo'}
      height={size}
      src={'/img/logos/nhl.svg'}
      width={size}
    />
  )
}
