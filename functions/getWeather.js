import useSWR from 'swr'
import fetcher from './fetcher'

export default function getWeather(lat, long) {

	if ( lat === undefined || long === undefined ) {
		return {
			weather: {},
			isLoading: true,
			isError: false
		}
	}

	const weatherAPI = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&include=minutely`;
	const { data, error } = useSWR(weatherAPI, fetcher)

	return {
		weather: data,
		isLoading: !error && !data,
		isError: error
	}
 }
