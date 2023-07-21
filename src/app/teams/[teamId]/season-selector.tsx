'use client'

import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { seasons, defaultSeason } from '@/constants'

export default function SeasonSelector() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  // get the season from the URL Search Params, falling back to a default
  const seasonParam = searchParams.get('season') ?? defaultSeason.key
  const selectedSeason = seasons[seasonParam]

  // When a user changes the season, set the new season in the URL Search Params
  function onSelectionChange(newSelection: string): void {
    router.push(`${pathname}?season=${newSelection}`)
  }

  return (
    <Listbox onChange={onSelectionChange} value={selectedSeason.key}>
      {({ open }) => (
        <>
          <Listbox.Label className={'text-md font-medium text-center'}>Select season</Listbox.Label>
          <div className={'relative mt-1'}>
            <Listbox.Button className={'relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm sm:text-sm focusable'}>
              <span className={'block truncate'}>{selectedSeason.name}</span>
              <span className={'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'}>
                <ChevronUpDownIcon aria-hidden={'true'} className={'h-5 w-5 text-gray-900'} />
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
                {Object.values(seasons).map((season) => (
                  <Listbox.Option
                    className={'ui-active:bg-gray-200 hover:bg-gray-200 text-gray-900 group flex items-center relative select-none px-4 py-2'}
                    key={season.key}
                    value={season.key}
                  >
                    {({ selected: isSelected }) => (
                      <>
                        <span className={'ui-selected:font-semibold ui-not-selected:font-normal block truncate'}>
                          {season.name}
                        </span>

                        {isSelected && (
                          <span className={'absolute inset-y-0 right-0 flex items-center pr-4'}>
                            <CheckIcon aria-hidden={'true'} className={'h-5 w-5'} />
                          </span>
                        )}
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