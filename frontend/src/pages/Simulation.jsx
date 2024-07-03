import React, { useState, useEffect, useContext } from 'react';
import { Button, Container, Card, DropdownButton, Dropdown } from 'react-bootstrap'
import useFetch from '../useFetch';
import axios from 'axios';

import NavBar from '../components/NavBar';
import MapComponent from '../components/MapView';

const Simulation = () => {
  const [dropdownName, setDropdownName] = useState("Map View");
  
  
  return (
    <div style={{ height: "100%", width: "100%" }}>
      < NavBar />
      <MapComponent />
    </div>
  )
}

export default Simulation;
