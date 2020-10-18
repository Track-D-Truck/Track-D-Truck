import React from 'react'
import { withScriptjs, DirectionsRenderer, withGoogleMap, GoogleMap } from "react-google-maps"
import { compose, withProps, lifecycle } from "recompose"

export const Maps = compose(
	withProps({
	  googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAK0QXUj4Jet4cJnWWV9nE1e62CbXPAcsc&v=3.exp&libraries=geometry,drawing,places",
	  loadingElement: <div style={{ height: `100%` }} />,
	  containerElement: <div style={{ height: `400px` }} />,
	  mapElement: <div style={{ height: `100%` }} />,
	}),
	withScriptjs,
	withGoogleMap,
	lifecycle({
	  componentDidMount() {
		const DirectionsService = new window.google.maps.DirectionsService();
  
		DirectionsService.route({
		  origin: new window.google.maps.LatLng(-6.568547, 106.855339),
		  destination: new window.google.maps.LatLng(-6.583503,  106.817120),
		  waypoints: [
			{
				location: new window.google.maps.LatLng( -6.243962, 106.873797)
			},
			{
				location: new window.google.maps.LatLng(-6.265696, 106.767345)
			},
			{
				location: new window.google.maps.LatLng( -6.424015, 106.732453)
			}
	   ],
		//   destination: new window.google.maps.LatLng( -6.560559,  106.769020), 
		  travelMode: window.google.maps.TravelMode.DRIVING,
		}, (result, status) => {
		  if (status === window.google.maps.DirectionsStatus.OK) {
			  console.log(result,'<<<<<<<<<<<<<<<');
			this.setState({
			  directions: result,
			});
		  } else {
			console.error(`error fetching directions ${result}`);
		  }
		});
	  }
	})
  )(props =>
	<GoogleMap
	  defaultZoom={7}
	  defaultCenter={new window.google.maps.LatLng( -6.260786, 106.781563)}
	>
	  {props.directions && <DirectionsRenderer directions={props.directions}/> }
	</GoogleMap>
  );