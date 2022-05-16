import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

const MobileButton = ({ open }) => (
  <div className={'-mr-2 flex md:hidden'}>
    <Disclosure.Button className={'bg-neutral-800 inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-white'}>
      <span className={'sr-only'}>Open main menu</span>
      {open ?
        <XIcon aria-hidden={'true'} className={'block h-6 w-6'} />
        :
        <MenuIcon aria-hidden={'true'} className={'block h-6 w-6'} />
      }
    </Disclosure.Button>
  </div>
)

export { MobileButton }
