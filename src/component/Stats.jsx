const Stats = () => {
	const stats = {
		algorithm: "bfs",
		time: 30000,
	};

	return (
		<>
			{stats ? (
				<div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
					<p className="text-sm text-green-800">
						<span className="font-semibold">{stats.algorithm}</span> completed
						in <span className="font-semibold">{stats.time}ms</span>
					</p>
				</div>
			) : null}
		</>
	);
};

export default Stats;
