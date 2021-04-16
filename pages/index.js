import Head from 'next/head'
import useSWR from 'swr'
import styles from '../styles/Home.module.css'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function getWeather(lat, long) {

  const weatherAPI = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=0e39e6553cab44868b50b3c63ac3a781&include=minutely`;
  const { data, error } = useSWR(weatherAPI, fetcher)

  return {
    weather: data,
    isLoading: !error && !data,
    isError: error
  }
}

const getLocaleDate = ( timestamp ) => {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format( timestamp * 1000 );
}

const getWeatherIconUrl = ( code ) => {
  return `https://www.weatherbit.io/static/img/icons/${code}.png`;
}

export default function Home({ ip }) {


  const {weather, isLoading, isError} = getWeather( ip.lat, ip.lon )

  if ( isError ) return <h1>Error occurred while loading weather data</h1>

  const [ weatherData ] = weather.data;

  return (
    <div className={styles.container}>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
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
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export const getStaticProps = async () => {

  const ipRequest = await fetch( 'http://ip-api.com/json' );
  const ip = await ipRequest.json();

  if ( !ip ) {
    return {
      notFound: true,
    }
  }

  return {
    props: { ip }
  };
}
