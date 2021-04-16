import getWeather from '../../functions/getWeather'
import getLocaleDate from '../../functions/getLocaleDate'
import getWeatherIconUrl from '../../functions/getWeatherIconUrl'
import styles from '../../styles/Home.module.css'

export default function Weather({ ip }) {

	const {weather, isLoading, isError} = getWeather( ip.lat, ip.lon )

	if ( isError ) return <h1>Error occurred while loading weather data</h1>
	if ( isLoading ) return <h1>Loading...</h1>

	const [ weatherData ] = weather?.data;

	return (
		<>
			<h1 className={styles.title}>
				Weather App
			</h1>

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
