import { findUpNode, jsonFetcher } from 'utils';
import betApi from 'services/races/betApiClient';

const getSingleRace = async (id) => {
  const race = await jsonFetcher(`${betApi.endpointUrl}/races/${id}`);
  return race;
};

const setDisableUnchecedInputs = (radios) => {
  Array.from(radios).forEach((radio) => {
    if (!radio?.checked) {
      radio.disabled = true;
    }
  });
};

const resetCheckboxes = (inputs) => {
  Array.from(inputs).forEach((input) => (input.disabled = false));
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

const setFormPayload = (form, winner, second, third, race) => {
  const parentWinner = findUpNode(winner, `TR`);
  const parentSecond = findUpNode(second, `TR`);
  const parentThird = findUpNode(third, `TR`);
  const findParticipants = (person) => person.querySelector(`.person-name`).innerText;

  const payload = {
    race,
    account: `${form.get(`bet-amount`)} PLN`,
    winner: findParticipants(parentWinner),
    second: findParticipants(parentSecond),
    third: findParticipants(parentThird)
  };

  return payload;
};

export { setCheckedInputs, setFormPayload, getSingleRace };
