import React from 'react';
import Planet from './Planet';
import { useQuery } from 'react-query';

const fetchPlanets = async () => {
  const res = await fetch('https://swapi.dev/api/planets');
  return res.json();
};

const Planets = () => {
  const obj = useQuery('planets', fetchPlanets, {
    staleTime: 2000,
    onSuccess: () => console.log('data fetched with no problems'),
  });

  console.log(obj);

  return (
    <div>
      <h2>Planets</h2>
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
