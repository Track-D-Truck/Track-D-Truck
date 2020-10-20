import React from 'react';
import logo from './logo.svg';
import { withScriptjs } from "react-google-maps";
import  Map from '../components/Map';

export default function MapPage() {

  const MapLoader = withScriptjs(Map);

  return (

<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />

  </header>
  <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=Key"
      loadingElement={<div style={{ height: `100%` }} />}
  />
</div>
  );
}