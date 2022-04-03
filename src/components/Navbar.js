import React from 'react';

const Navbar = ({ setPage }) => {
  return (
    <nav>
      Navbar
      <button onClick={() => setPage('planets')}>Planets</button>
      <button onClick={() => setPage('people')}>People</button>
    </nav>
  );
};

export default Navbar;
