import React from 'react';

function Information({ weather }) {
	return (
		<div>
			<>
				<h2>
					{weather.name},<span>{weather.country}</span>
				</h2>
				<h1>{weather.temp}°C</h1>
				<h3>{weather.description}</h3>
				<h3>Velocidad de viento: {weather.wind} m/s</h3>
				<h3>Nubes: {weather.clouds}%</h3>
				<h3>Presión: {weather.pressure} hPa</h3>
			</>
		</div>
	);
}

export default Information;
