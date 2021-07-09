import { jsonFetcher } from 'utils';
import betApi from 'services/races/betApiClient';

const getAllRaces = async () => {
  const allRaces = await jsonFetcher(`${betApi.endpointUrl}/races`);
  return allRaces;
};

const setStateOfAllRaces = (races, sortType) => {
  const initRaces = [...races];
  let allRaces = initRaces;
  switch (sortType) {
    case `actived`:
      allRaces = [...initRaces].sort((a, b) => a.active - b.active).reverse();
      break;
    case `inactive`:
      allRaces = [...initRaces].sort((a, b) => a.active - b.active);
      break;
    case ``:
    default:
      allRaces = [...initRaces];
  }

  return allRaces;
};

export { getAllRaces, setStateOfAllRaces };
