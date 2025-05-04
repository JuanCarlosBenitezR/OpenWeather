import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import Search from './Search';
import Information from './Information';

function App() {
	const [weather, setWeather] = useState();
	const [city, setCity] = useState('Mexico City');
	const [coords, setCoords] = useState({
		lat: 0,
		lon: 0,
	});

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

	return (
		<>
			<h1>App</h1>
			<Search setCity={setCity} setCoords={setCoords} setError={setError} />
			{error && <p className="error">{error}</p>}
			{weather && <Information weather={weather} />}
		</>
	);
}

export default App;
