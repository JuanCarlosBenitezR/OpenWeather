import React, { useState } from 'react';

function Information({ weather }) {
	const [unitCelcius, setUnitCelcius] = useState(true);
	const changeScale = () => {
		setUnitCelcius(!unitCelcius);
	};
	return (
		<div className="text-base sm:text-base md:text-lg lg:text-2xl xl:text-5xl bg-gray-200 rounded-lg shadow-md flex flex-col items-center justify-center gap-10 w-5/6 h-auto  py-10 2xl:h-5/6 ">
			<h2 className="font-semibold">
				{weather.name},<span>{weather.country}</span>
			</h2>
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
