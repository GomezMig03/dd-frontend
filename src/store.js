import { create } from 'zustand'

export const useDDstore = create((set) => ({
    input: '',
    output: '',
    setInput: (v) => set({ input: v }),
    setOutput: (v) => set({ output: v }),
}))