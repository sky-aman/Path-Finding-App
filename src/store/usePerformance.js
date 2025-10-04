import { create } from "zustand";

const usePerformance = create((set) => ({
	duration: null,
	setDuration: (duration) => set({ duration }),
	resetDuration: () => set({ duration: null }),
}));

export default usePerformance;
