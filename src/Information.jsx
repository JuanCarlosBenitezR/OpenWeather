import React, { useState } from 'react';
import './information.css';

function Information({ weather }) {
	const [unitCelcius, setUnitCelcius] = useState(true);
	const changeScale = () => {
		setUnitCelcius(!unitCelcius);
	};
	return (
		<div className=" card text-base sm:text-base md:text-lg lg:text-2xl xl:text-5xl   shadow-md flex flex-col items-center justify-center gap-10 w-fit  h-dvh  py-10 px-5 backdrop-blur-md bg-white/10 rounded-xl ">
			<h2 className="font-semibold">
				{weather.name},<span>{weather.country}</span>
			</h2>
			<div className="grid grid-cols-2 gap-5 justify-center items-center">
				<img
					src={`http://openweathermap.org/img/wn/${weather.icons}@2x.png`}
					className="center w-15 h-15 md:w-15 md:h-15 lg:w-25 lg:h-25 xl:w-35 xl:h-35 mx-auto"
				/>
				{unitCelcius && (
					<h1 className=" font-bold text-5xl  md:text-7xl lg:text-9xl ">
						{weather.temp}°C
					</h1>
				)}
				{!unitCelcius && (
					<h1 className="font-bold text-5xl  md:text-7xl lg:text-9xl ">
						{weather.tempFahrenheit}°F
					</h1>
				)}
			</div>
			<h3 className="font-bold uppercase">{weather.description}</h3>
			<h3 className="">
				Velocidad de viento:{' '}
				<span className="font-bold">{weather.wind} m/s</span>
			</h3>
			<h3 className="">
				Nubes: <span className="font-bold">{weather.clouds}%</span>
			</h3>
			<h3 className="">
				Presión: <span className="font-bold">{weather.pressure} hPa</span>
			</h3>
			{unitCelcius && (
				<button
					className="px-4 py-2 bg-stone-70  rounded-md  hover:bg-blue-300 shadow-black shadow-lg transition-all "
					onClick={changeScale}
				>
					Change °F
				</button>
			)}
			{!unitCelcius && (
				<button
					className="px-4 py-2 bg-stone-70  rounded-md shadow-md hover:bg-blue-300 shadow-black shadow-lg transition-all "
					onClick={changeScale}
				>
					Change °C
				</button>
			)}
		</div>
	);
}

export default Information;
