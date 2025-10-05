const Legend = () => {
	return (
		<div className="w-full flex-end max-w-8xl mx-auto bg-white rounded-lg shadow-lg p-4 mt-6">
			<h3 className="font-semibold text-gray-800 mb-3">Legend</h3>
			<div className="flex flex-wrap gap-4">
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 bg-green-500 rounded"></div>
					<span className="text-sm text-gray-700">Start Point</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 bg-red-500 rounded"></div>
					<span className="text-sm text-gray-700">Target Point</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 bg-gray-800 rounded"></div>
					<span className="text-sm text-gray-700">Wall</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 bg-blue-200 rounded"></div>
					<span className="text-sm text-gray-700">Visited</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 bg-yellow-400 rounded"></div>
					<span className="text-sm text-gray-700">Path</span>
				</div>
			</div>
		</div>
	);
};

export default Legend;
