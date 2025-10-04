import { create } from 'zustand';

const useMode = create((set) => ({
    mode: "wall",
    setStartMode: () => set({mode: "start"}),
    setTargetMode: () => set({mode: "target"}),
    setWallMode: () => set({mode: "wall"}),
}));

export default useMode;