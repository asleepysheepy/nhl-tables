'use client'

import { Disclosure } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'

export default function LogoButton({ open }: { open: boolean }): React.ReactElement {
  if (open) {
    return (
      <Disclosure.Button as={Link} href={'/'}>
        <Image alt={'NHL Logo'} height={40} src={'/images/nhl.svg'} width={40} />
      </Disclosure.Button>
    )
  }

  return (
    <Link href={'/'}>
      <Image alt={'NHL Logo'} height={40} src={'/images/nhl.svg'} width={40} />
    </Link>
  )
}
