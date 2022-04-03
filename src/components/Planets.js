import React, { useState } from 'react';
import Planet from './Planet';
import { useQuery } from 'react-query';

const fetchPlanets = async ({ queryKey }) => {
  const [key, page] = queryKey;

  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  const data = await res.json();

  return data;
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const obj = useQuery(['planets', page], fetchPlanets);

  return (
    <div>
      <h2>Planets</h2>
      <button onClick={() => setPage(1)}>page 1</button>
      <button onClick={() => setPage(2)}>page 2</button>
      <button onClick={() => setPage(3)}>page 3</button>
      {obj.status === 'loading' && <div>Data fetching in progress</div>}
      {obj.status === 'error' && <div>Error fetching data</div>}
      {obj.status === 'success' && (
        <div>
          {obj.data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
