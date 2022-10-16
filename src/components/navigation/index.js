import Image from 'next/image'
import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import { MobileButton } from './mobile-button'
import { MobileDropdown } from './mobile-dropdown'
import { NavContent } from './nav-content'

const Navigation = () => {
  return (
    <Disclosure as={'nav'}>
      {({ open }) => (
        <>
          <div className={'max-w-7xl mx-auto sm:px-6 lg:px-8'}>
            <div className={'flex items-center justify-between h-16 px-4 sm:px-0'}>
              <div className={'flex items-center'}>
                <div className={'flex-shrink-0'}>
                  <Link href={'/'}>
                    <a><Image height={40} src={'/img/logos/nhl.svg'} width={40} /></a>
                  </Link>
                </div>
              </div>
              <div>
                <div className={'hidden md:block'}>
                  <NavContent />
                </div>
                <MobileButton open={open} />
              </div>
            </div>
          </div>

          <MobileDropdown />
        </>
      )}
    </Disclosure>
  )
}

export { Navigation }
