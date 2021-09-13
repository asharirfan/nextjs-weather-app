import getWeather from '../../functions/getWeather'
import getLocaleDate from '../../functions/getLocaleDate'
import getWeatherIconUrl from '../../functions/getWeatherIconUrl'
import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react'

export default function Weather({ ip }) {

	const [geoLocation, setGeoLocation] = useState('');
	const {weather, isLoading, isError} = getWeather( ip.lat, ip.long )

	const handleGeolocationSearch = ( event ) => {
		// Check for the enter key.
		// Bail early if it is not pressed.
		// Search the Geocoding API against the address.

		setTimeout(
			() => {
				setGeoLocation( event.target.value );
			},
			1000
		);
	}

	// Call the Geodata API here.
	const queryGeoLocationData = async () => {
		const request = await fetch(
			`http://api.positionstack.com/v1/forward?access_key=${process.env.NEXT_PUBLIC_POSITION_STACK_KEY}&query=${geoLocation}`
		);
		return request.json();
	}

	useEffect( async () => {


		if ( '' !== geoLocation ) {
			const getDataResponse = await queryGeoLocationData();
			console.log('getDataResponse', getDataResponse);
		}

		// console.log( 'Call the geodata API here' );
		// console.log( 'geoLocation', geoLocation );

	}, [ geoLocation ] );

	if ( isError ) return <h1>Error occurred while loading weather data</h1>
	if ( weather?.error ) return <h1>{ weather.error }</h1>
	if ( isLoading ) return <h1>Loading...</h1>

	const [ weatherData ] = weather?.data;

	return (
		<>
			{/* <h1 className={styles.title}>
				Weather App
			</h1> */}

			<input
				type="text"
				className={styles.searchInput}
				placeholder="Search your city name here..."
				onChange={handleGeolocationSearch}
			/>

			<h2 className={styles.description}>
				{
				isLoading ?
				'Getting the weather of your city...' :
				`Today ${getLocaleDate( weatherData.ts )}`
				}
			</h2>

			<div>
				<img src={getWeatherIconUrl( weatherData.weather.icon )} alt={weatherData.weather.description}/>
			</div>

			<p className={styles.weatherDetails}>
				{weatherData.city_name} {weatherData.temp}°C {weatherData.weather.description}
			</p>
		</>
	)
}
