import { findUpNode, jsonFetcher } from 'utils';
import betApi from 'services/races/betApiClient';

const getSingleRace = async (id) => {
  const race = await jsonFetcher(`${betApi.endpointUrl}/races/${id}`);
  return race;
};

const setDisableUnchecedInputs = (radios) => {
  Array.from(radios).forEach((radio) => {
    const input = radio;
    if (!input.checked) {
      input.disabled = true;
    }
  });
};

const resetCheckboxes = (radios) => {
  Array.from(radios).forEach((radio) => {
    const input = radio;
    input.disabled = false;
  });
};

const setCheckedInputs = (tbody, winner, second, third) => {
  Array.from(tbody).forEach((tr) => {
    const inputs = tr.querySelectorAll(`input`);
    resetCheckboxes(inputs);
  });

  if (winner) {
    const parentWinner = findUpNode(winner, `TR`);
    const winnerRadios = parentWinner.querySelectorAll(`input`);
    setDisableUnchecedInputs(winnerRadios);
  }

  if (second) {
    const parentSecond = findUpNode(second, `TR`);
    const secondRadios = parentSecond.querySelectorAll(`input`);
    setDisableUnchecedInputs(secondRadios);
  }

  if (third) {
    const parentThird = findUpNode(third, `TR`);
    const thirdRadios = parentThird.querySelectorAll(`input`);
    setDisableUnchecedInputs(thirdRadios);
  }
};

export { setCheckedInputs, getSingleRace };
