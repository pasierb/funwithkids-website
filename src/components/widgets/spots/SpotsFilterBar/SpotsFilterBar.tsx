import { Fragment, useState, ChangeEvent } from 'react';
import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { $spotFilters, SpotFilters } from '~/stores/spotFilters.store';
import { SpotsQuickSearch } from '~/components/widgets/spots/SpotsQuickSearch';
import { CheckboxPopoverFilter } from './CheckboxPopoverFilter';
import { CheckboxDisclosureFilter } from './CheckboxDisclosureFilter';
import { AttractionType } from '~/stores/spots.store';

const sortOptions = [
  { name: 'Most Popular', href: '#' },
  { name: 'Best Rating', href: '#' },
  { name: 'Newest', href: '#' },
];
const filters: {
  id: keyof SpotFilters;
  name: string;
  options: { label: string; value: string }[];
}[] = [
  {
    id: 'attractionType',
    name: 'Attraction Type',
    options: [
      {
        label: 'Playground',
        value: 'playground',
      },
      {
        label: 'Trampoline Park',
        value: 'trampoline_park',
      },
      {
        label: 'Parkour',
        value: 'parkour',
      },
    ],
  },
  {
    id: 'amenities',
    name: 'Amenities',
    options: [
      { value: 'has_toilet', label: 'Toilets' },
      { value: 'has_restaurant', label: 'Restaurant nearby' },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function SpotsFilterBar() {
  const [open, setOpen] = useState(false);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>, key: keyof SpotFilters) => {
    const inputName = event.target.name;
    const formData = new FormData(event.target.form!);

    $spotFilters.setKey(
      key,
      formData.getAll(inputName).map((value) => value.toString())
    );
  };

  const handleClearAll = () => {
    $spotFilters.set({});
  };

  return (
    <div>
      {/* Mobile filter dialog */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[1000] sm:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  {filters.map((section, idx) => (
                    <CheckboxDisclosureFilter {...section} onChange={handleFilterChange} key={idx} />
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="mx-auto w-full text-center border-t border-gray-200 px-4">
        <section aria-labelledby="filter-heading" className="py-4">
          <div className="flex items-center justify-between">
            <Menu as="div" className="relative inline-block text-left">
              <div className="flex align-middle gap-4">
                <SpotsQuickSearch />
                <button type="button" className="text-gray-500" onClick={handleClearAll}>
                  Clear all
                </button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm font-medium text-gray-900'
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              onClick={() => setOpen(true)}
            >
              Filters
            </button>

            <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">
              {filters.map((section, sectionIdx) => (
                <CheckboxPopoverFilter
                  key={sectionIdx}
                  name={section.name}
                  id={section.id}
                  options={section.options}
                  onChange={handleFilterChange}
                />
              ))}
            </Popover.Group>
          </div>
        </section>
      </div>
    </div>
  );
}
