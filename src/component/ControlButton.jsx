import useIsRunning from "../store/useIsRunning";
import useMode from "../store/useMode";

const ControlButton = ({ mode, setMode, activeColor, children }) => {
	const currMode = useMode((state) => state.mode);
	const isRunning = useIsRunning(state => state.isRunning);

	return (
		<button
			onClick={setMode}
			disabled={isRunning}
			className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
				currMode === mode
					? `${activeColor} text-white shadow-lg`
					: "bg-gray-100 text-gray-700 hover:bg-gray-200"
			} disabled:opacity-50`}
		>
			{children}
		</button>
	);
};

export default ControlButton;
