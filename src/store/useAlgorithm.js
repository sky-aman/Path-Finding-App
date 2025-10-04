import { create } from 'zustand';

const useAlgorithm = create((set) => ({
    algorithm : "bfs",
    setAlgorithm: (value) => set({algorithm: value})
}))

export default useAlgorithm;