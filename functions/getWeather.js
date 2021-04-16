import useSWR from 'swr'
import fetcher from './fetcher'

export default function getWeather(lat, long) {

	const weatherAPI = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=0e39e6553cab44868b50b3c63ac3a781&include=minutely`;
	const { data, error } = useSWR(weatherAPI, fetcher)

	return {
		weather: data,
		isLoading: !error && !data,
		isError: error
	}
 }
