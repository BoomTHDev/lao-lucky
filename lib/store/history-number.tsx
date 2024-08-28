import { create } from 'zustand'

type Numbers = {
    id: number
    Date: Date
    number5: string
    number4: string
    number3: string
    number2top: string
    number2: string
}

interface HistoryNumberState {
    numbers: Numbers[]
    isLoading: boolean
    error: string | null
    setNumbers: (numbers: Numbers[]) => void
    setIsLoading: (isLoading: boolean) => void
    setError: (error: string | null) => void
}

export const useHistoryNumber = create<HistoryNumberState>()((set) => ({
    numbers: [],
    isLoading: true,
    error: null,
    setNumbers: (numbers) => set({ numbers }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}))