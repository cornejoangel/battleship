import React, { useState } from 'react';
import Grid from './components/Grid';
import './styles/normalize.css';
import './styles/App.css';

const App = () => {
  let tileSet = [];
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      tileSet = tileSet.concat({ x: j, y: i });
    }
  }
  return (
    <main>
      <Grid player={1} name="enemy" tileSet={tileSet} />
      <Grid player={1} name="friendly" tileSet={tileSet} />
      <Grid player={2} name="enemy" tileSet={tileSet} />
      <Grid player={2} name="friendly" tileSet={tileSet} />
    </main>
  );
};

export default App;
