import { Disclosure } from '@headlessui/react'
import { teams } from '../../data'

const MobileDropdown = () => {
  return (
    <Disclosure.Panel className={'border-b border-neutral-700 md:hidden'}>
      <div className={'px-2 py-3 space-y-1 sm:px-3'}>
        {teams.all.map(({ name, Logo }) => (
          <a className={'text-neutral-300 group flex items-center px-4 py-2'} href={'/'} key={name}>
            <Logo height={30} width={30} />
            <span className={'ml-3'}>{name}</span>
          </a>
        ))}
      </div>
    </Disclosure.Panel>
  )
}

export { MobileDropdown }
