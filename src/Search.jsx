import { Locate } from 'lucide-react';
import React from 'react';
import { useState } from 'react';

function Search({ setCity, setCoords, setError }) {
	const [value, setValue] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		setCoords({ lat: 0, lon: 0 });
		if (value.trim() === '') {
			setCity('');
			setError('Debes ingresar una ciudad');
		} else {
			setCity(value);
			setError('');
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
		<div className="flex justify-center items-center gap-2 mb-4 sm:text-base md:text-lg lg:text-2xl xl:text-5xl">
			<form className="pr-5" onSubmit={handleSubmit}>
				<input
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					required
					placeholder="Ingresa una ciudad"
					className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 hover:placeholder:text-green-500 transition-all duration-300 invalid:placeholder: invalid:border-red-500 invalid:ring-red-500"
				/>
			</form>
			<Locate
				onClick={handleLocation}
				className="bg-green-700 hover:bg-red-500 text-white rounded-full p-2 cursor-pointer w-8 h-8 md:w-10 md:h-10 xl:w-15 xl:h-15"
			/>
		</div>
	);
}

export default Search;
