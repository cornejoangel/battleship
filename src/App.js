import React, { useState } from 'react';
import Grid from './components/Grid';
import './styles/normalize.css';
import './styles/App.css';

const App = () => {
  const x = 1;
  return (
    <main>
      <Grid player={1} name="enemy" />
      <Grid player={1} name="friendly" />
      <Grid player={2} name="enemy" />
      <Grid player={2} name="friendly" />
    </main>
  );
};

export default App;
