import useMode from "../store/useMode";
import ControlButton from "./ControlButton";

const Controls = () => {
	const setStartMode = useMode((state) => state.setStartMode);
	const setTargetMode = useMode((state) => state.setTargetMode);
	const setWallMode = useMode((state) => state.setWallMode);

	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-2">
				Draw Mode
			</label>
			<div className="flex gap-2">
				<ControlButton
					mode="start"
					setMode={setStartMode}
					activeColor="bg-green-500"
				>
					Start
				</ControlButton>
				<ControlButton mode="target" setMode={setTargetMode} activeColor="bg-red-500">
					Target
				</ControlButton>
				<ControlButton
					mode="wall"
					setMode={setWallMode}
					activeColor="bg-gray-800"
				>
					Wall
				</ControlButton>
			</div>
		</div>
	);
};

export default Controls;
