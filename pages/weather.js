import Container from '@/components/common/Container';
import getLocaleDate from '@/functions/getLocaleDate';
import getWeather from '@/functions/getWeather';
import getWeatherIconUrl from '@/functions/getWeatherIconUrl';
import styles from '@/styles/Home.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import queryGeoLocationData from '@/functions/queryGeoLocationData';

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

		if ( undefined !== geoLocationResult ) {
			weather = await getWeather( geoLocationResult.latitude, geoLocationResult.longitude );
			const [ weatherData ] = weather?.data;
			setWeatherData( weatherData );
			setLoading(false);
		}

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
			<div className={styles.weatherApp}>
				<p className={styles.location}>
					{
						loading ?
						'Loading...' :
						weatherData.city_name
					}
				</p>
				<p className={styles.temperature}>
					{
						loading ?
						'Loading...' :
						`${weatherData.temp}°C`
					}
				</p>
				<div className="weather-icon">
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

				<div className="weather-search">
					<input
						type="text"
						className={styles.searchInput}
						placeholder="Another Location"
						onChange={handleGeolocationSearch}
					/>
				</div>
			</div>
		</Container>
	);

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
