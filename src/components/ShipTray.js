import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import '../styles/ShipTray.css';

const ShipTray = (props) => (
  <div className="ship-tray">
    <Tile type="ship" name="" player="1" x="1" y="1" />
  </div>
);

// ShipTray.propTypes = {

// };

export default ShipTray;
