'use client'

import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function MobileButton({ open }: { open: boolean }): React.ReactElement {
  const Icon = open ? XMarkIcon : Bars3Icon

  return (
    <Disclosure.Button
      className={'focusable inline-flex items-center justify-center rounded-md p-2'}
    >
      <span className={'sr-only'}>Open main menu</span>
      <Icon aria-hidden={'true'} className={'block h-6 w-6'} />
    </Disclosure.Button>
  )
}
