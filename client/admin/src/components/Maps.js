import React from 'react'
import {connect} from 'react-redux'
import { withScriptjs, DirectionsRenderer, withGoogleMap, GoogleMap } from "react-google-maps"
import { compose, withProps, lifecycle, withPropsOnChange, withState } from "recompose"

const mapStateToProps = state => ({
	chosenResult: state.ResultReducer.chosenResult,
});


export const Maps = compose(
	connect(
    mapStateToProps,
    {}
	),
	withState(
		'directions',
		'setDirections',
		[]
	),
	withProps({
	  googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAK0QXUj4Jet4cJnWWV9nE1e62CbXPAcsc&v=3.exp&libraries=geometry,drawing,places",
	  loadingElement: <div style={{ height: `100%` }} />,
	  containerElement: <div style={{ height: `370px` }} />,
	  mapElement: <div style={{ height: `100%` }} />,
	}),
	withScriptjs,
	withGoogleMap,
	withPropsOnChange(
		['chosenResult'], (props) => {
			let tpsLocations = []
			props.routes.forEach(route => {
				let [lat, lng] = route.location.split(',')
				tpsLocations.push(
					{
					location: new window.google.maps.LatLng(+lat,+lng)
					}
				)
			})
			
			const DirectionsService = new window.google.maps.DirectionsService();
		
			DirectionsService.route({
		  origin: new window.google.maps.LatLng(-6.86666, 107.60000),
		  destination: new window.google.maps.LatLng(-7.0015804, 107.9028182),
		  waypoints: tpsLocations,
		  travelMode: window.google.maps.TravelMode.DRIVING,
		}, (result, status) => {
			// console.log(result,'<<<<<<<<<<,');
		  if (status === window.google.maps.DirectionsStatus.OK) {

			props.setDirections(result);
		  } else {
				console.error(`error fetching directions ${result}`);
		  }
		});
		}
		
	), 
	lifecycle({
	  componentDidMount() {
			// console.log(this.props.chosenResult,'props di maps <<<<<<<<<<<<<<<<<<<<<<<<<<')

			// let tpsLocations = []

			// this.props.routes.forEach(route => {
			// 	route.location = route.location.split(',')
			// 	tpsLocations.push(
			// 		{
			// 		location: new window.google.maps.LatLng(+route.location[0], +route.location[1])
			// 		}
			// 	)
			// });
			// console.log(tpsLocations,'<<<<<<<<<<<<<')
			
		
	  }
	})
	)(props =>

		<div>
			{/* {JSON.stringify(props.chosenResult)} */}
			<GoogleMap
				defaultZoom={7}
				defaultCenter={new window.google.maps.LatLng( -6.260786, 106.781563)}
			>
				{props.directions && <DirectionsRenderer directions={props.directions}/> }
			</GoogleMap>
		</div>

  )