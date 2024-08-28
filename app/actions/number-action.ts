'use server'

import axios from 'axios'

export async function getMainNumber() {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/number')
        return { success: true, number: response.data.number }
    } catch (error: any) {
        console.log(error)
        return { success: false }
    }
}

export async function getLastNumbers() {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/last-numbers')
        return { success: true, number: response.data.numbers }
    } catch (error: any) {
        console.log(error)
        return { success: false }
    }
}

export async function getHistoryNumbers() {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/history')
        return { result: response.data.numbers }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}