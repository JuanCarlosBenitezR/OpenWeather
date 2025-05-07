import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import Search from './Search';
import Information from './Information';
import { rain, clear, clouds, mist, snow, thunderstorm } from './assets/images';
import Loadings from './assets/components/Loadings';
import Error from './assets/components/Error';
const images = [rain, clear, clouds, mist, snow, thunderstorm];

function App() {
	const [img, setImg] = useState(images[1]);
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
	const [loading, setloading] = useState(false);

	const getWeatherByCity = async () => {
		const { lat, lon } = coords;
		setError(null);
		setloading(true);
		console.log(city);
		console.log(error);
		if (city === '') {
			setError('Debes ingresar una ciudad');
		}

		axios
			.get(
				`${BASE_URL}${
					lat !== 0 && lon !== 0 ? `lat=${lat}&lon=${lon}` : `q=${city}`
				}&appid=${apiKey}${options}`,
			)
			.then((res) => {
				setWeather({
					name: res.data.name,
					country: res.data.sys.country,
					wind: res.data.wind.speed,
					clouds: res.data.clouds.all,
					pressure: res.data.main.pressure,
					temp: Math.ceil(res.data.main.temp),
					tempFahrenheit: Math.ceil((res.data.main.temp * 9) / 5 + 32),
					// sunrise: new Date(res.data.sys.sunrise * 1000).toLocaleTimeString(
					// 	[],
					// 	timeOptions,
					// ),
					// sunset: new Date(res.data.sys.sunset * 1000).toLocaleTimeString(
					// 	[],
					// 	timeOptions,
					// ),
					description: res.data.weather[0].description,
					icons: res.data.weather[0].icon,
				});
				let weatherType;
				switch (res.data.weather[0].main.toLowerCase()) {
					case 'rain':
						weatherType = images[0];
						break;
					case 'clear':
						weatherType = images[1];
						break;
					case 'clouds':
						weatherType = images[2];
						break;
					case 'mist':
						weatherType = images[3];
						break;
					case 'snow':
						weatherType = images[4];
						break;
					case 'thunderstorm':
						weatherType = images[5];
						break;
					default:
						weatherType = images[1];
						break;
				}
				setImg(weatherType);
				setloading(false);
			})
			.catch((err) => {
				if (err.response?.status === 404) {
					setError('Ciudad no encontrada');
				} else if (err.response?.status === 400) {
					setError('Error en la solicitud');
				} else if (err.response?.status === 401) {
					setError('Error de autenticación');
				} else if (err.response?.status === 500) {
					setError('Error interno del servidor');
				} else if (err.response?.status === 429) {
					setError('Demasiadas solicitudes, reintente más tarde');
				} else {
					setError('Error desconocido');
				}
				setloading(false);
				console.error(err.response?.data?.message || err.message);
			});
	};
	const imgURL = `url(${img})`;

	return (
		<div
			className=" w-full flex flex-col  items-center  m-0 h-full  "
			style={{ backgroundImage: imgURL }}
		>
			<h1 className=" font-bold pb-10 text-lg md:text-2xl lg:text-3xl  xl:text-6xl">
				Weather App
			</h1>
			<Search setCity={setCity} setCoords={setCoords} setError={setError} />

			{loading && <Loadings></Loadings>}
			{error && <Error error={error} />}
			{weather && !loading && !error && <Information weather={weather} />}
		</div>
	);
}

export default App;
