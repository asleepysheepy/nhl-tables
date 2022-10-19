import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'

export const MobileButton = ({ open }) => {
  const Icon = open ? XMarkIcon : Bars3Icon

  return (
    <div className={'-mr-2 flex md:hidden'}>
      <Disclosure.Button className={'inline-flex items-center justify-center p-2 rounded-md focusable'}>
        <span className={'sr-only'}>Open main menu</span>
        <Icon aria-hidden={'true'} className={'block h-6 w-6'} />
      </Disclosure.Button>
    </div>
  )
}

