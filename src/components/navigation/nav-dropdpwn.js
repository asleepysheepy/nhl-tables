import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

const NavDropdown = ({ teams}) => {
  return (
    <Transition
      as={Fragment}
      enter={'transition ease-out duration-100'}
      enterFrom={'transform opacity-0 scale-95'}
      enterTo={'transform opacity-100 scale-100'}
      leave={'transition ease-in duration-75'}
      leaveFrom={'transform opacity-100 scale-100'}
      leaveTo={'transform opacity-0 scale-95'}
    >
      <Menu.Items className={'origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'}>
        {teams.map(({ name, Logo }) => (
          <Menu.Item key={name}>
            {({ active }) => (
              <a
                className={`${active ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-700'} group flex items-center px-4 py-2`}
                href={'/'}
              >
                <Logo height={30} width={30} />
                <span className={'ml-3'}>{name}</span>
              </a>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Transition>
  )
}

export { NavDropdown }
