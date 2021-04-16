export default function getLocaleDate( timestamp ) {
	return new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format( timestamp * 1000 );
}
