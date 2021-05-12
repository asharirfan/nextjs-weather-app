import Container from '@/components/common/Container'
import Weather from '@/components/Weather'

export default function Home({ ip }) {

	return (
		<Container>
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
