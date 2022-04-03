import React from 'react';
import Planet from './Planet';
import { useQuery } from 'react-query';

const fetchPlanets = async () => {
  const res = await fetch('https://swapi.dev/api/planets');
  return res.json();
};

const Planets = () => {
  const { data, status } = useQuery('planets', fetchPlanets);

  return (
    <div>
      <h2>Planets</h2>
      {status === 'loading' && <div>Data fetching in progress</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <div>
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
