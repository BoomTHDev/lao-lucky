'use client'
import React, { useRef } from 'react'
import { addNumber } from '../app/actions/number-action'
import Swal from 'sweetalert2'

type Props = {}

export default function FormUpdateNumber({ }: Props) {

    const ref = useRef<HTMLFormElement>(null)
    return (
        <form
            ref={ref}
            action={async (formData: FormData) => {
                const result = await addNumber(formData)
                if (result?.type === 'success') {
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
            }} className="space-y-6">
            <div>
                <label htmlFor="number5" className="block text-lg font-medium">5 ตัว</label>
                <input name='number5' type="text" className="w-full p-2 mt-1 bg-inherit border-b border-slate-400 focus:outline-none focus:border-b focus:border-b-gray-900" />
            </div>
            <div>
                <label htmlFor="number4" className="block text-lg font-medium">4 ตัว</label>
                <input name='number4' type="text" className="w-full p-2 mt-1 bg-inherit border-b border-slate-400 focus:outline-none focus:border-b focus:border-b-gray-900" />
            </div>
            <div>
                <label htmlFor="number3" className="block text-lg font-medium">3 ตัว</label>
                <input name='number3' type="text" className="w-full p-2 mt-1 bg-inherit border-b border-slate-400 focus:outline-none focus:border-b focus:border-b-gray-900" />
            </div>
            <div>
                <label htmlFor="number2top" className="block text-lg font-medium">2 ตัวบน</label>
                <input name='number2top' type="text" className="w-full p-2 mt-1 bg-inherit border-b border-slate-400 focus:outline-none focus:border-b focus:border-b-gray-900" />
            </div>
            <div>
                <label htmlFor="number2" className="block text-lg font-medium">2 ตัว</label>
                <input name='number2' type="text" className="w-full p-2 mt-1 bg-inherit border-b border-slate-400 focus:outline-none focus:border-b focus:border-b-gray-900" />
            </div>
            <button type="submit" className="w-full py-2 border border-gray-600 bg-inherit hover:bg-gray-600 hover:text-gray-50 rounded-lg font-semibold text-lg mt-4 transition duration-200">
                บันทึกการเปลี่ยนแปลง
            </button>
        </form>
    )
}