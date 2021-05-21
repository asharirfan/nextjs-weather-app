import { useState, useEffect } from 'react'
import Container from '@/components/common/Container'
import Weather from '@/components/Weather'
import styles from '../styles/Home.module.css'

export default function Home({ ip }) {

	const [geoDataInput, setGeoDataInput] = useState('');

	const getGeoData = ( event ) => {
		// Check for the enter key.
		// Bail early if it is not pressed.
		// Search the Geocoding API against the address.

		setTimeout(
			() => {
				setGeoDataInput( event.target.value );
			},
			1000
		);
	}

	useEffect( async () => {

		// Call the Geodata API here.
		const queryGeoData = async () => {
			const request = await fetch(
				`http://api.positionstack.com/v1/forward?access_key=${process.env.NEXT_PUBLIC_POSITION_STACK_KEY}&query=${geoDataInput}`
			);
			return request.json();
		}

		if ( '' !== geoDataInput ) {
			const getDataResponse = await queryGeoData();
			console.log('getDataResponse', getDataResponse);
		}

		// console.log( 'Call the geodata API here' );
		// console.log( 'geoDataInput', geoDataInput );

	}, [ geoDataInput ] );

	return (
		<Container>
			<h1 className={styles.title}>
				Weather App
			</h1>

			<div className={styles.searchContainer}>
				<input
					className={styles.searchInput}
					type="text"
					placeholder="Search for weather by your address"
					onChange={ getGeoData }
				/>
			</div>

			<Weather ip={ ip } />
		</Container>
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
