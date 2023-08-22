import { useEffect, useState } from 'react';
import { supabaseClient } from '~/services/supabase';
import { SpotProposalData, SpotProposal } from '~/types/spot';
import { SpotProposalList } from './SpotProposalList';

export function SpotProposals() {
  const [spotProposals, setSpotProposals] = useState<SpotProposal[]>([]);

  useEffect(() => {
    supabaseClient
      .from('spot_proposals')
      .select('*')
      .then(({ data: spotProposals, error }) => {
        if (error) {
          console.error(error);
          return;
        }

        setSpotProposals(spotProposals);
      });
  }, []);

  return <SpotProposalList proposals={spotProposals} />;
}
