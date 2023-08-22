import { FormEvent, useState } from 'react';
import { TextInput } from './TextInput';
import { SpotAttractionFieldset, AttractionType } from './SpotAttractionFieldset';
import { supabaseClient } from '~/services/supabase';
import { SpotProposalData } from '~/types/spot';
import { TrashIcon } from '@heroicons/react/20/solid';
import { getPermalink } from '~/utils/permalinks';

const amenities = [
  {
    id: 'has_toilet',
    label: 'Toilet',
  },
  {
    id: 'has_restaurant',
    label: 'Restaurant',
  },
];

async function createSpotProposal(data: SpotProposalData) {
  const response = await supabaseClient.from('spot_proposals').insert({ data: JSON.stringify(data) });

  return response;
}

interface SpotProposalFormProps {
  onSubmit?: (result: SpotProposalData) => void;
}

function numberOrUndefined(value?: string): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = parseInt(value, 10);

  if (isNaN(parsed)) {
    return undefined;
  }

  return parsed;
}

// Credits: https://tailwindui.com/components/application-ui/forms/form-layouts
export function SpotProposalForm({ onSubmit }: SpotProposalFormProps) {
  const [attractionItems, setAttractionItems] = useState<number[]>([0]);

  function handleAddAttraction() {
    setAttractionItems([...attractionItems, attractionItems.length]);
  }

  function handleRemoveAttraction(idx: number) {
    setAttractionItems((attractionItems) => {
      const newValue = attractionItems.filter((item) => item !== idx);
      if (newValue.length === 0) {
        return [idx + 1];
      }

      return newValue;
    });

  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result: ProposalFormResult = {
      name: formData.get('name') as string,
      website_url: formData.get('website_url') as string,
      about: formData.get('about') as string,
      google_maps_url: formData.get('google_maps_url') as string,
      has_toilet: formData.getAll('amenities[]').includes('has_toilet'),
      has_restaurant: formData.getAll('amenities[]').includes('has_restaurant'),
      spot_attractions: attractionItems.map((idx) => ({
        type: formData.get(`spot_attraction[${idx}]type`) as AttractionType,
        name: formData.get(`spot_attraction[${idx}]name`)?.toString() as string,
        age_from: numberOrUndefined(formData.get(`spot_attraction[${idx}]age_from`)?.toString()),
        age_to: numberOrUndefined(formData.get(`spot_attraction[${idx}]age_to`)?.toString()),
      })),
    };

    createSpotProposal(result).then(({ data, error }) => {
      if (error) {
        console.error(error);
        return;
      }

      window.location.href = '/spot-proposals#thanks';
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <TextInput label="Name" inputName="name" size="md" required />

            <TextInput label="Google Maps url" inputName="google_maps_url" size="md" required>
              <p className="mt-3 text-sm leading-6 text-gray-600 prose">
                Learn how to share a Google Maps location on{' '}
                <a href="https://support.google.com/maps/answer/144361?hl=en">Google Maps help</a>.
              </p>
            </TextInput>

            <TextInput label="Website" inputName="website_url" size="md" />

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the spot.</p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Amenities</h2>
          {/* <p className="mt-1 text-sm leading-6 text-gray-600">
            We'll always let you know about important changes, but you pick what else you want to hear about.
          </p> */}

          <div className="mt-10 space-y-10">
            <fieldset>
              <div className="mt-6 space-y-6">
                {amenities.map((amenity) => (
                  <div className="relative flex gap-x-3" key={amenity.id}>
                    <div className="flex h-6 items-center">
                      <input
                        id={amenity.id}
                        name="amenities[]"
                        value={amenity.id}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor={amenity.id} className="font-medium text-gray-900">
                        {amenity.label}
                      </label>
                      <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Attractions</h2>
          <div className="mt-10 space-y-10">
            {attractionItems.map((idx) => (
              <div className="overflow-hidden rounded-lg bg-white shadow" key={idx}>
                <div className="px-4 py-5 sm:p-6">
                  <button
                    onClick={() => handleRemoveAttraction(idx)}
                    type="button"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>

                  <SpotAttractionFieldset key={idx} idx={idx} />
                </div>
              </div>
            ))}

            <button
              onClick={handleAddAttraction}
              type="button"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Add attraction
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
