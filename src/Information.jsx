import React, { useState } from 'react';

function Information({ weather }) {
	const [unitCelcius, setUnitCelcius] = useState(true);
	const changeScale = () => {
		setUnitCelcius(!unitCelcius);
	};
	return (
		<div>
			<h2>
				{weather.name},<span>{weather.country}</span>
			</h2>
			{unitCelcius && <h1>{weather.temp}°C</h1>}
			{!unitCelcius && <h1>{weather.tempFahrenheit}°F</h1>}
			<h3>{weather.description}</h3>
			<h3>Velocidad de viento: {weather.wind} m/s</h3>
			<h3>Nubes: {weather.clouds}%</h3>
			<h3>Presión: {weather.pressure} hPa</h3>
			{unitCelcius && <button onClick={changeScale}>Change Fahrenheit</button>}
			{!unitCelcius && <button onClick={changeScale}>Change Celcious</button>}
		</div>
	);
}

export default Information;
