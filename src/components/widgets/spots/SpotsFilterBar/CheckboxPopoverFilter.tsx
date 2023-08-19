import { Popover, Transition } from '@headlessui/react';
import { Fragment, ChangeEvent, useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { $spotFilters } from '~/stores/spotFilters.store';

interface CheckboxPopoverFilterProps {
  name: string;
  id: string;
  options: {
    label: string;
    value: string;
  }[];
  onChange: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
}

export function CheckboxPopoverFilter({ name, id, options, onChange }: CheckboxPopoverFilterProps) {
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    $spotFilters.subscribe((spotFilters) => {
      setValues(spotFilters[id] || []);
    });
  }, [$spotFilters]);

  return (
    <Popover as="div" key={name} id={`desktop-menu-${id}`} className="relative inline-block text-left">
      <div>
        <Popover.Button className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
          <span>{name}</span>
          {values.length > 0 ? (
            <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
              {values.length}
            </span>
          ) : null}
          <ChevronDownIcon
            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </Popover.Button>
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
        <Popover.Panel className="absolute right-0 z-[600] mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <form className="space-y-4">
            {options.map((option, optionIdx) => (
              <div key={option.value} className="flex items-center">
                <input
                  id={`filter-${id}-${optionIdx}`}
                  name={`${id}[]`}
                  value={option.value}
                  checked={values.includes(option.value)}
                  onChange={(event) => onChange(event, id)}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`filter-${id}-${optionIdx}`}
                  className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </form>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
