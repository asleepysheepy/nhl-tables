import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const SelectInput = ({ onChange, selected, options }) => {
  return (
    <Listbox onChange={onChange} value={selected}>
      {({ open }) => (
        <>
          <Listbox.Label className={'text-md font-medium text-center'}>Select season</Listbox.Label>
          <div className={'relative mt-1'}>
            <Listbox.Button className={'relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'}>
              <span className={'block truncate'}>{selected.name}</span>
              <span className={'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'}>
                <ChevronUpDownIcon aria-hidden={'true'} className={'h-5 w-5 text-gray-400'} />
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave={'transition ease-in duration-100'}
              leaveFrom={'opacity-100'}
              leaveTo={'opacity-0'}
              show={open}
            >
              <Listbox.Options className={'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'}>
                {options.map((o) => (
                  <Listbox.Option
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      )
                    }
                    key={o.key}
                    value={o}
                  >
                    {({ selected: isSelected, active }) => (
                      <>
                        <span className={classNames(isSelected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {o.name}
                        </span>

                        {isSelected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon aria-hidden={'true'} className={'h-5 w-5'} />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
