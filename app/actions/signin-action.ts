'use server'

import axios from "axios"
import { cookies } from "next/headers"

export async function signin(formData: FormData) {
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/signin', {
            username,
            password
        })

        if (response.data.success) {
            // set cookies
            cookies().set("token_user", response.data.token, {
                secure: true,
                httpOnly: true,
                expires: Date.now() + 24 * 60 * 60 * 1000 * 13,
                path: '/',
                sameSite: 'strict'
            })
            return { success: true, message: 'เข้าสู่ระบบสำเร็จ' }
        } else {
            return { error: response.data.error.message }
        }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}