export function authHeader(auth = null) {
	if (auth) {
		const token = localStorage.getItem('jwtToken');
		console.log('token', token);
		return {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token
		};
	} else {
		return {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			redirect: 'follow'
		};
	}
}
