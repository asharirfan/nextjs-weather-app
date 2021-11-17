import axios from 'axios';

/**
 * Queries geo data of an address from a third party API.
 *
 * @param {string} geoLocation Address like city name or country.
 * @return {object}
 */
const queryGeoLocationData = async ( geoLocation ) => {

	const request = {
		method: 'GET',
		url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/search',
		params: {
			q: geoLocation,
			'accept-language': 'en',
			polygon_threshold: '0.0'
		},
		headers: {
			'x-rapidapi-host': 'forward-reverse-geocoding.p.rapidapi.com',
			'x-rapidapi-key': '81d4b5315fmshe3aab8d5a756f5ep1f9e54jsn69a66effba45'
		}
	};

	let locationData = null;

	try {
		const response = await axios( request );
		locationData = response.data;
	} catch (error) {
		console.error( 'Geo Location Data API Error', error );
	}

	return locationData;
}

export default queryGeoLocationData;
