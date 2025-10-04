import { create } from "zustand";

const useIsRunning = create((set) => ({
	isRunning: false,
	setIsRunning: (isRunning) => set({ isRunning }),
	startRunning: (isRunning) => set({ isRunning: true }),
	stopRunning: (isRunning) => set({ isRunning: false }),
}));

export default useIsRunning;
