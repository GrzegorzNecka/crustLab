import BaseLayout from 'components/BaseLayout';
import { getAllRaces } from 'services/races';
import { getAllParticipants } from 'services/participants';
import { useEffect, useState, useRef } from 'react';
import { setCheckedInputs, getSingleRace } from 'services/races/singleRace';

export const getStaticPaths = async () => {
  const races = await getAllRaces();

  return {
    paths: races.map((race) => ({ params: { id: JSON.stringify(race.id) } })),
    fallback: false
  };
};

export const getStaticProps = async (req) => {
  const { id } = req.params;
  const allParticipants = await getAllParticipants();
  const race = await getSingleRace(id);

  return {
    revalidate: 30,
    props: { race, allParticipants }
  };
};

export default function RacePage({ race, allParticipants }) {
  const [winner, setWinner] = useState(null);
  const [second, setSecond] = useState(null);
  const [third, setThird] = useState(null);
  const tbodyRef = useRef(null);
  const offerForm = useRef(null);

  useEffect(() => {
    const tbody = tbodyRef.current.childNodes;
    setCheckedInputs(tbody, winner, second, third);
  }, [winner, second, third]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendingSmpleVerification = winner && second && third;
    if (sendingSmpleVerification === null) {
      return;
    }

    const form = new FormData(offerForm.current);

    // const payload = setFormPayload(form, winner, second, third, race.name);
    const payload = {
      race: race.name,
      account: `${form.get(`bet-amount`)} PLN`,
      winner: form.get(`winner`),
      second: form.get(`second`),
      third: form.get(`third`)
    };

    alert(JSON.stringify(payload));
  };

  return (
    <BaseLayout name={race.name} status={race.active}>
      <section className="p-4  bg-blue-200">
        <form onSubmit={handleSubmit} ref={offerForm}>
          <label className="p-4 flex items-center justify-start" htmlFor="bet-amount">
            bet amount:
            <input
              className="m-4 w-1/6  rounded-md bg-white text-black"
              type="number"
              name="bet-amount"
            />
          </label>

          <table className="table-fixed">
            <thead>
              <tr className="bg-emerald-200">
                <th className="w-2/4 p-4">Participation</th>
                <th className="w-auto p-4">first place</th>
                <th className="w-auto p-4">second place</th>
                <th className="w-auto p-4">third place</th>
              </tr>
            </thead>
            <tbody ref={tbodyRef}>
              {allParticipants.map((person, i) => (
                <tr key={person.id} className="p-4">
                  <td className="w-2/4 text-center person-name">{person.body}</td>
                  <td className="w-auto text-center">
                    <label htmlFor={`winner_${i}`}>
                      winner
                      <input
                        onClick={(e) => setWinner(e.target)}
                        type="radio"
                        id={`winner_${i}`}
                        name="winner"
                        value={person.body}
                      />
                    </label>
                  </td>
                  <td className="w-auto text-center ">
                    <label htmlFor={`second_${i}`}>
                      second
                      <input
                        onClick={(e) => setSecond(e.target)}
                        type="radio"
                        id={`second_${i}`}
                        name="second"
                        value={person.body}
                      />
                    </label>
                  </td>
                  <td className="w-auto text-center">
                    <label htmlFor={`third_${i}`}>
                      third
                      <input
                        onClick={(e) => setThird(e.target)}
                        type="radio"
                        id={`third_${i}`}
                        name="third"
                        value={person.body}
                      />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-end ">
            <button
              className="m-4 w-1/6 flex  items-center justify-center rounded-md bg-black text-white"
              type="submit">
              place the bet
            </button>
          </div>
        </form>
      </section>
    </BaseLayout>
  );
}
