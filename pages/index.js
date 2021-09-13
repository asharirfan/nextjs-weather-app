import Container from '@/components/common/Container'
import Weather from '@/components/Weather'
import { useEffect, useState } from 'react'

export default function Home() {

	const [ip, setIp] = useState({});

	const success = (position) => {
		setIp({ lat: position.coords.latitude, long: position.coords.longitude });
	};

	const error = () => {
		// On error, set default coordinates.
		setIp({ lat: 31.3729722, long: 74.1743067 });
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(success, error);
	}, []);

	// console.log( ip );
	return (
		<Container>
			{
			ip.length !== 0 ?
			<Weather ip={ ip } /> :
			'Getting the weather of your city...'
			}
		</Container>
	)
}

// export const getStaticProps = async () => {

// 	const ipRequest = await fetch( 'http://ip-api.com/json' );
// 	const ip = await ipRequest.json();

// 	if ( !ip ) {
// 		return {
// 			notFound: true,
// 		}
// 	}

// 	return {
// 		props: { ip }
// 	};
// }
