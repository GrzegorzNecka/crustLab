import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import jsonFetcher from 'utils';
import betApi from 'services/races/betApiClient';
import { getAllRaces, setStateOfAllRaces } from 'services/races';

export const getStaticProps = async () => {
  const races = await getAllRaces();

  return {
    props: {
      races
    }
  };
};

export default function Home({ races }) {
  const { data } = useSWR(`${betApi.endpointUrl}/races`, jsonFetcher, { initialData: races });

  const [sortType, setSortType] = useState(``);
  const [allRaces, setAllRaces] = useState([...data]);
  useEffect(() => {
    setAllRaces(setStateOfAllRaces([...data], sortType));
  }, [sortType, data]);

  const changeSortType = (e) => setSortType(e.target.value);

  return (
    <div>
      <Head>
        <title>Crust-lab task</title>
        <meta name="description" content="Crust-lab task for front-end developer position" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-screen-xl bg-gray-50 m-auto ">
        <div className="bg-purple-800 p-4 flex  justify-center items-center">
          <label htmlFor="race-select">
            sort by:
            <select onChange={changeSortType} name="pets" id="race-select">
              <option value="">default</option>
              <option value="actived">actived</option>
              <option value="inactive">inactive</option>
            </select>
          </label>
        </div>

        <ul className="p-4 flex flex-col justify-center items-center">
          {allRaces.map((race) => (
            <li key={race.id} className={`${race.active ? `bg-green-200` : `bg-pink-800`} `}>
              <div className="flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto">
                <Link href={`/races/${race.id}`}>
                  <a className="hover:underline">
                    <h2 className="text-1xl font-bold tracking-normal text-gray-800">
                      {race.name}
                    </h2>
                  </a>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
