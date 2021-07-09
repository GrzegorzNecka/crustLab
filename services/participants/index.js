import { jsonFetcher } from 'utils';
import betApi from 'services/races/betApiClient';

const getAllParticipants = async () => {
  const allParticipants = await jsonFetcher(`${betApi.endpointUrl}/participants`);
  return allParticipants;
};

export { getAllParticipants };
