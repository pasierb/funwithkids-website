import { TextInput } from './TextInput';

export enum AttractionType {
  playground = 'playground',
  trampolinePark = 'trampoline_park',
  parkour = 'parkour',
}

interface SpotAttractionFieldsetProps {
  idx: number;
}

export function SpotAttractionFieldset({ idx }: SpotAttractionFieldsetProps) {
  return (
    <fieldset>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <TextInput label="Name" inputName={`spot_attraction[${idx}]name`} size="sm" required />
        <div className="sm:col-span-3">
          <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
            Attraction type
          </label>
          <div className="mt-2">
            <select
              id="type"
              name={`spot_attraction[${idx}]type`}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value={AttractionType.playground}>Playground</option>
              <option value={AttractionType.trampolinePark}>Trampoline park</option>
              <option value={AttractionType.parkour}>Parkour</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <TextInput
          label="Age from"
          inputType="number"
          defaultValue={0}
          inputName={`spot_attraction[${idx}]age_from`}
          size="sm"
        />
        <TextInput
          label="Age to"
          inputType="number"
          defaultValue={99}
          inputName={`spot_attraction[${idx}]age_to`}
          size="sm"
        />
      </div>
    </fieldset>
  );
}
