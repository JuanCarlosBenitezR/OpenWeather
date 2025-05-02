import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
	const [weather, setWeather] = useState();
	const [city, setCity] = useState('Mexico City');
	const [coords, setCoords] = useState({
		lat: 0,
		lon: 0,
	});
	const [value, setValue] = useState('');
	const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
	const apiKey = '57b50aa588f1941b5edb929b846304e3';
	const query = 'q={city name}';
	const cordsx = 'lat={lat}&lon={lon}';
	const options = '&units=metric&lang=es';
	useEffect(() => {
		getWeatherByCity();
	}, [city]);

	const getWeatherByCity = async () => {
		const { lat, lon } = coords;
		axios
			.get(
				`${BASE_URL}${
					lat !== 0 && lon !== 0 ? `lat=${lat}&lon=${lon}` : `q=${city}`
				}&appid=${apiKey}${options}`,
			)
			.then((res) => {
				const timeOptions = {
					hour: '2-digit',
					minute: '2-digit',
					hour12: true,
				};
				setWeather({
					name: res.data.name,
					country: res.data.sys.country,
					temp: Math.ceil(res.data.main.temp),
					sunrise: new Date(res.data.sys.sunrise * 1000).toLocaleTimeString(
						[],
						timeOptions,
					),
					sunset: new Date(res.data.sys.sunset * 1000).toLocaleTimeString(
						[],
						timeOptions,
					),
					description: res.data.weather[0].description,
				});
			});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setCity(value);
		setValue('');
	};
	return (
		<>
			<h1>App</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			</form>
			{weather && (
				<>
					<h2>
						{weather.name},<span>{weather.country}</span>
					</h2>
					<h1>{weather.temp}°C</h1>
					<h3>{weather.sunrise}</h3>
					<h3>{weather.sunset}</h3>
					<h3>{weather.description}</h3>
				</>
			)}
		</>
	);
}

export default App;
