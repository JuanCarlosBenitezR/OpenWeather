import React from 'react';

function Error({ error }) {
	return (
		<div className="flex flex-col items-center justify-center h-screen backdrop-blur-md bg-white/10 rounded-xl">
			<h1 className="text-2xl font-bold text-red-500">
				Ocurrió un error al buscar
			</h1>
			<p className="text-lg text-gray-700">{error}</p>
		</div>
	);
}

export default Error;
