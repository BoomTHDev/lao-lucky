import { create } from 'zustand'

interface MainNumberState {
    number: number | null
    isLoading: boolean
    error: string | null
    setNumber: (number: number) => void
    setIsLoading: (isLoading: boolean) => void
    setError: (error: string | null) => void
}

export const useMainNumber = create<MainNumberState>()((set) => ({
    number: null,
    isLoading: true,
    error: null,
    setNumber: (number: number) => set({ number }),
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    setError: (error: string | null) => set({ error }),
}))