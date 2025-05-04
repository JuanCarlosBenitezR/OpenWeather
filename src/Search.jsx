import React from 'react';
import { useState } from 'react';

function Search({ setCity, setCoords, setError }) {
	const [value, setValue] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		setCoords({ lat: 0, lon: 0 });
		if (value.trim()) {
			console.log('entraaqui');
			setCity(value);
			setValue('');
		} else {
			setError('Debes ingresar una ciudad');
			console.log('no ciudad');
			console.log(value);
		}
	};
	const handleLocation = () => {
		if (navigator.geolocation) {
			function success({ coords }) {
				setCoords({ lat: coords.latitude, lon: coords.longitude });
			}
			function error() {
				setError('Debes permitir la geolocalización');
			}
			navigator.geolocation.getCurrentPosition(success, error);
		} else {
			setError('Navegador no soporta geolocalización');
		}
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder="Ingresa una ciudad"
				/>
			</form>
			<button onClick={handleLocation}>Ubicación</button>
		</div>
	);
}

export default Search;
