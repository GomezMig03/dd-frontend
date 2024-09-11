import { create } from 'zustand'

export const useDDstore = create((set) => ({
    input: '',
    output: '',
    setInput: (v) => set({ input: v }),
    setOutput: (v) => set({ output: v }),
    sudo: false,
    setSudo: (v) => set({ sudo: v}),
    disk: false,
    setDisk: (v) => set({ disk: v})
}))