import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment, ChangeEvent, useState, useEffect } from 'react';
import { $spotFilters } from '~/stores/spotFilters.store';

interface CheckboxDisclosureFilterProps {
  name: string;
  id: string;
  options: {
    label: string;
    value: string;
  }[];
  onChange: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function CheckboxDisclosureFilter({ name, id, options, onChange }: CheckboxDisclosureFilterProps) {
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    $spotFilters.subscribe((spotFilters) => {
      setValues(spotFilters[id] || []);
    });
  }, [$spotFilters]);

  return (
    <Disclosure as="div" key={name} className="px-4 py-6">
      {({ open }) => (
        <>
          <h3 className="-mx-2 -my-3 flow-root">
            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
              <span className="font-medium text-gray-900">{name}</span>
              <span className="ml-6 flex items-center">
                <ChevronDownIcon
                  className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                  aria-hidden="true"
                />
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="pt-6">
            <div className="space-y-6">
              {options.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={`filter-mobile-${id}-${optionIdx}`}
                    name={`${id}[]`}
                    value={option.value}
                    checked={values.includes(option.value)}
                    onChange={(event) => onChange(event, id)}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`filter-mobile-${id}-${optionIdx}`} className="ml-3 text-sm text-gray-500">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
