
/**
 * Queries geo data of an address from a third party API.
 *
 * @param {string} geoLocation Address like city name or country.
 * @return {object}
 */
const queryGeoLocationData = async ( geoLocation ) => {

	const request = await fetch(
		`http://api.positionstack.com/v1/forward?access_key=${process.env.NEXT_PUBLIC_POSITION_STACK_KEY}&query=${geoLocation}`
	);
	return request.json();
}

export default queryGeoLocationData;
