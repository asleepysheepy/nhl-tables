import { Disclosure } from '@headlessui/react'
import { MobileButton } from './mobile-button'
import { MobileDropdown } from './mobile-dropdown'
import { NavContent } from './nav-content'
import { NhlLogo } from '../logos'

const Navigation = () => {
  return (
    <Disclosure as={'nav'} className={'bg-neutral-900'}>
      {({ open }) => (
        <>
          <div className={'max-w-7xl mx-auto sm:px-6 lg:px-8'}>
            <div className={'border-b border-neutral-700'}>
              <div className={'flex items-center justify-between h-16 px-4 sm:px-0'}>
                <div className={'flex items-center'}>
                  <div className={'flex-shrink-0'}>
                    <NhlLogo height={40} width={40} />
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
          </div>

          <MobileDropdown />
        </>
      )}
    </Disclosure>
  )
}

export { Navigation }
