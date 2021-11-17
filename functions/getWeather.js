import axios from 'axios';

export default async function getWeather (lat, long) {

	const request = {
		method: 'GET',
		url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
		params: { lon: long, lat: lat },
		headers: {
			'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
			'x-rapidapi-key': '81d4b5315fmshe3aab8d5a756f5ep1f9e54jsn69a66effba45'
		},
	};

	let weather = [];

	try {
		const response = await axios( request );

		if ( response.status === 200 ) {
			weather = response?.data?.data[0];
		}
	} catch (error) {
		console.error( 'Weather API error', error );
	}

	return weather;
 }
