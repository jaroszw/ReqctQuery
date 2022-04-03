import React, { useState } from 'react';
import Planet from './Planet';
import { useQuery, usePaginatedQuery } from 'react-query';

const fetchPlanets = async ({ queryKey }) => {
  const [key, page] = queryKey;

  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  const data = await res.json();

  return data;
};

const Planets = () => {
  const [page, setPage] = useState(1);

  const { data, isError, isLoading, status } = useQuery(
    ['projects', page],
    fetchPlanets,
    {
      keepPreviousData: true,
    }
  );

  return (
    <div>
      <h2>Planets</h2>

      {isLoading && <div>Data fetching in progress</div>}
      {isError && <div>Error fetching data</div>}
      {status === 'success' && (
        <React.Fragment>
          <button
            onClick={() => {
              setPage((old) => (!data.previous ? old : old - 1));
            }}
            disabled={page === 1}
          >
            Previous Page
          </button>
          {[...Array(data.count / 10).keys()].map((element) => (
            <button
              key={element}
              onClick={() => setPage(element + 1)}
              className={page - 1 === element ? 'active' : ''}
            >
              {element + 1}
            </button>
          ))}
          <button
            onClick={() => {
              setPage((old) => (!data.next ? old : old + 1));
            }}
            disabled={!data.next}
          >
            Next Page
          </button>
          <div>
            {data.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Planets;
