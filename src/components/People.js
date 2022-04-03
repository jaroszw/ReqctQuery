import React from 'react';
import Person from './Person';
import { useQuery } from 'react-query';

const fetchPeople = async () => {
  const res = await fetch('https://swapi.dev/api/people');
  return res.json();
};

const People = () => {
  const { data, status } = useQuery('people', fetchPeople);

  return (
    <div>
      <h2>People</h2>
      {status === 'loading' && <div>Data fetching in progress</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <div>
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
