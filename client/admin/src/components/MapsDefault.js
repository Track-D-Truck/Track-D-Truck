import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

export const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={11}
    defaultCenter={{ lat: -6.9175, lng: 107.6191 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -6.9175, lng: 107.6191 }} />}
  </GoogleMap>
))

