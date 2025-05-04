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
	useEffect(() => {
		getWeatherByCity();
	}, [city, coords]);
	const [error, setError] = useState(null);

	const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
	const apiKey = '57b50aa588f1941b5edb929b846304e3';
	const query = 'q={city name}';
	const cordsx = 'lat={lat}&lon={lon}';
	const options = '&units=metric&lang=es';

	const getWeatherByCity = async () => {
		const { lat, lon } = coords;
		setError(null);
		console.log(coords);
		axios
			.get(
				`${BASE_URL}${
					lat !== 0 && lon !== 0 ? `lat=${lat}&lon=${lon}` : `q=${city}`
				}&appid=${apiKey}${options}`,
			)
			.then((res) => {
				// const timeOptions = {
				// 	hour: '2-digit',
				// 	minute: '2-digit',
				// 	hour12: true,
				// };
				setWeather({
					name: res.data.name,
					country: res.data.sys.country,
					wind: res.data.wind.speed,
					clouds: res.data.clouds.all,
					pressure: res.data.main.pressure,
					temp: Math.ceil(res.data.main.temp),
					// sunrise: new Date(res.data.sys.sunrise * 1000).toLocaleTimeString(
					// 	[],
					// 	timeOptions,
					// ),
					// sunset: new Date(res.data.sys.sunset * 1000).toLocaleTimeString(
					// 	[],
					// 	timeOptions,
					// ),
					description: res.data.weather[0].description,
				});
			})
			.catch((err) => {
				if (err.response?.status === 404) {
					setError('Ciudad no encontrada');
				}
				console.error(err.response?.data?.message || err.message);
			});
	};
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
		<>
			<h1>App</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder="Ingresa una ciudad"
				/>
			</form>
			<button onClick={handleLocation}>Ubicación</button>
			{error && <p className="error">{error}</p>}
			{weather && (
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
			)}
		</>
	);
}

export default App;
