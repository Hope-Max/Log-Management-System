import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authHeader, handleResponse } from '../Services/fack.backend';

const PrivateRoute = () => {
	const login = useState(localStorage.getItem('jwtToken'));
	const [authenticated, setAuthenticated] = useState(false);
	const jwt_token = localStorage.getItem('token');

	useEffect(() => {
		console.log('HOLA', localStorage.getItem('jwtToken'));
	}, [localStorage.getItem('jwtToken')]);
	return login || authenticated || jwt_token ? <Outlet /> : <Navigate exact to={`${process.env.PUBLIC_URL}/login`} />;
};

export default PrivateRoute;
