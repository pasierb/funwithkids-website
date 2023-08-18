import { $spotFilters } from '~/stores/spotFilters.store';

export function SpotsQuickSearch() {
  function handleChange(query: string) {
    $spotFilters.setKey('query', query);
  }

  return (
    <div>
      {/* <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900">
        Quick search
      </label> */}
      <div className="relative mt-2 flex items-center">
        <input
          type="search"
          name="search"
          onChange={event => handleChange(event.target.value)}
          id="search"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  )
}
