import useAlgorithm from "../store/useAlgorithm";
import usePerformance from "../store/usePerformance";


const Stats = () => {
	const algorithm = useAlgorithm(state => state.algorithm);
	const duration = usePerformance(state => state.duration);

	return (
		<>
			{duration ? (
				<div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
					<p className="text-sm text-green-800">
						<span className="font-semibold">{algorithm}</span> completed
						in <span className="font-semibold">{duration} ms</span>
					</p>
				</div>
			) : null}
		</>
	);
};

export default Stats;
