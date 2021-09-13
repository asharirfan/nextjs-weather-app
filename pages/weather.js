import Container from '@/components/common/Container';
import getLocaleDate from '@/functions/getLocaleDate';
import getWeather from '@/functions/getWeather';
import getWeatherIconUrl from '@/functions/getWeatherIconUrl';
import styles from '@/styles/Home.module.css';
import { useState, useEffect } from 'react'

export default function Weather( { geoLocation } ) {

	const [ weatherData, setWeatherData ] = useState( {} );
	const [ loading, setLoading ] = useState( true );
	const [ geoLocationData, setGeoLocationData ] = useState( '' );

	useEffect( async () => {

		let weather;
		let geoLocationResult;

		if ( '' !== geoLocationData ) {
			geoLocationResult = await queryGeoLocationData( geoLocationData );
			geoLocationResult = geoLocationResult?.data[0];
		} else {
			geoLocationResult = geoLocation;
		}

		weather = await getWeather( geoLocationResult.latitude, geoLocationResult.longitude );

		const [ weatherData ] = weather?.data;
		setWeatherData( weatherData );
		setLoading(false);

	}, [ geoLocationData ] );

	const handleGeolocationSearch = ( event ) => {

		setTimeout(
			() => {
				setGeoLocationData( event.target.value );
			},
			1000
		);
	};

	return (
		<Container>
			<div id="weather-app">
				<p className="location">
					{
						loading ?
						'Loading...' :
						weatherData.city_name
					}
				</p>
				<p className="weather-temp">
					{
						loading ?
						'Loading...' :
						`${weatherData.temp}°C`
					}
				</p>
				<div>
					{
						!loading ?
						<img
							src={getWeatherIconUrl( weatherData.weather.icon )}
							alt={weatherData.weather.description}
						/>:
						<img
							src="https://www.weatherbit.io/static/img/icons/c01n.png"
							alt=""
						/>
					}
				</div>

				<p className={styles.weatherDetails}>
					{
						loading ?
						'Loading...' :
						weatherData.weather.description
					}
				</p>

				<h2 className={styles.description}>
					{
						loading ?
						'Loading...' :
						getLocaleDate( weatherData.ts )
					}
				</h2>
				<div>
					<input
						type="text"
						className={styles.searchInput}
						placeholder="Search your city name here..."
						onChange={handleGeolocationSearch}
					/>
				</div>
				<div>
					<ul className="location-suggestions">
						<li><a href="#">California</a></li>
						<li><a href="#">Islamabad</a></li>
						<li><a href="#">Istanbul</a></li>
						<li><a href="#">London</a></li>
					</ul>
				</div>
			</div>
		</Container>
	);

}

// Call the Geodata API here.
const queryGeoLocationData = async ( geoLocation ) => {
	const request = await fetch(
		`http://api.positionstack.com/v1/forward?access_key=${process.env.NEXT_PUBLIC_POSITION_STACK_KEY}&query=${geoLocation}`
	);
	return request.json();
}

export const getStaticProps = async () => {

	// Use SSR to show default city's weather.
	const geoLocation = await queryGeoLocationData( process.env.NEXT_PUBLIC_DEFAULT_CITY );

	if ( geoLocation.length < 0 ) {
		return {
			props: {
				geoLocation: {}
			}
		}
	}

	return {
		props: {
			geoLocation: geoLocation.data[0]
		}
	}
}
