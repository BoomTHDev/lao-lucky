'use client'
import React, { useRef } from 'react'
import { signin } from '../app/actions/signin-action'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

type Props = {}

export default function FormSignIn({ }: Props) {

    const ref = useRef<HTMLFormElement>(null)
    const router = useRouter()
    return (
        <form
            ref={ref}
            action={async (formData: FormData) => {
                const result = await signin(formData)
                if (result.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'สำเร็จ',
                        text: result.message,
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'ผิดพลาด',
                        text: result?.message,
                    })
                }
                ref.current?.reset()
                router.push('/dashboard')
            }}
            className="space-y-6">
            <div>
                <label htmlFor="username" className="block text-lg font-medium">ชื่อยูสเซอร์ <span className='text-md text-red-500'>{'*'}</span></label>
                <input name='username' type="text" className="w-full p-2 mt-1 bg-inherit border-b border-slate-400 focus:outline-none focus:border-b focus:border-b-gray-900" />
            </div>
            <div>
                <label htmlFor="password" className="block text-lg font-medium">รหัสผ่าน <span className='text-md text-red-500'>{'*'}</span></label>
                <input name='password' type="password" className="w-full p-2 mt-1 bg-inherit border-b border-slate-400 focus:outline-none focus:border-b focus:border-b-gray-900" />
            </div>
            <button type="submit" className="w-full py-2 border border-gray-600 bg-inherit hover:bg-gray-600 hover:text-gray-50 rounded-lg font-semibold text-lg mt-4 transition duration-200">
                เข้าสู่ระบบ
            </button>
        </form>
    )
}