// @ts-nocheck

'use client'

import React, { useEffect } from 'react'
import { getLastNumbers } from '@/app/actions/number-action'
import { useLastNumber } from '@/lib/store/last-number'
import dayjs from 'dayjs'

type Props = {}

export default function LastHouy({ }: Props) {
    const numbers = useLastNumber((state) => state.numbers)
    const isLoading = useLastNumber((state) => state.isLoading)
    const error = useLastNumber((state) => state.error)
    const setNumbers = useLastNumber((state) => state.setNumbers)
    const setIsLoading = useLastNumber((state) => state.setIsLoading)
    const setError = useLastNumber((state) => state.setError)

    useEffect(() => {
        // เรียก fetchNumber ทันทีที่ component ถูก mount เพื่อแสดงข้อมูลเก่า
        fetchNumbers();

        // ตั้ง interval เพื่อเช็คเวลาและ fetch ข้อมูลใหม่เมื่อถึง 15:45
        const intervalId = setInterval(fetchNumbers, 60000); // 60 วินาที

        // Clear interval เมื่อ component ถูก unmount
        return () => clearInterval(intervalId);
    }, [setNumbers, setIsLoading, setError])

    const fetchNumbers = async () => {
        const now = dayjs();
        const targetTime = dayjs().hour(15).minute(44).second(0);
        if (now.isAfter(targetTime)) {
            try {
                setIsLoading(true)
                const result = await getLastNumbers()
                if (result.success) {
                    setNumbers(result.number)
                } else {
                    setError("Failed to fetch the number.")
                }
            } catch (error) {
                setError("An error occurred while fetching the number.")
            } finally {
                setIsLoading(false)
            }
        }
    }

    return (
        <div className='grid grid-cols-2 border-2 border-gray-400'>
            <div className='border-b-2 border-r-2 border-gray-400 h-10 flex justify-center items-center'>
                <span>ເລກ 5 ໂຕ</span>
            </div>
            <div className='border-b-2 border-gray-400 h-10 flex justify-center items-center'>

                {isLoading ? (
                    <div className='flex justify-center'>
                        <span>กำลังโหลดข้อมูล...</span>
                    </div>
                ) : error ? (
                    <div className='text-red-500'>{error}</div>
                ) : (
                    <span>{numbers.number5}</span>
                )}
            </div>
            <div className='border-b-2 border-r-2 border-gray-400 h-10 flex justify-center items-center'>
                <span>ເລກ 4 ໂຕ</span>
            </div>
            <div className='border-b-2 border-gray-400 h-10 flex justify-center items-center'>
                {isLoading ? (
                    <div className='flex justify-center'>
                        <span>กำลังโหลดข้อมูล...</span>
                    </div>
                ) : error ? (
                    <div className='text-red-500'>{error}</div>
                ) : (
                    <span>{numbers.number4}</span>
                )}
            </div>
            <div className='border-b-2 border-r-2 border-gray-400 h-10 flex justify-center items-center'>
                <span>ເລກ 3 ໂຕ</span>
            </div>
            <div className='border-b-2 border-gray-400 h-10 flex justify-center items-center'>
                {isLoading ? (
                    <div className='flex justify-center'>
                        <span>กำลังโหลดข้อมูล...</span>
                    </div>
                ) : error ? (
                    <div className='text-red-500'>{error}</div>
                ) : (
                    <span>{numbers.number3}</span>
                )}
            </div>

            <div className='border-b-2 border-r-2 border-gray-400 h-10 flex justify-center items-center'>
                <span>2 ໂຕບົນ</span>
            </div>
            <div className='border-b-2 border-gray-400 h-10 flex justify-center items-center'>
                {isLoading ? (
                    <div className='flex justify-center'>
                        <span>กำลังโหลดข้อมูล...</span>
                    </div>
                ) : error ? (
                    <div className='text-red-500'>{error}</div>
                ) : (
                    <span>{numbers.number2top}</span>
                )}
            </div>
            <div className='border-r-2 border-gray-400 h-10 flex justify-center items-center'>
                <span>ເລກ 2 ໂຕລ່າງ</span>
            </div>
            <div className='h-10 flex justify-center items-center'>
                {isLoading ? (
                    <div className='flex justify-center'>
                        <span>กำลังโหลดข้อมูล...</span>
                    </div>
                ) : error ? (
                    <div className='text-red-500'>{error}</div>
                ) : (
                    <span>{numbers.number2}</span>
                )}
            </div>
        </div>
    )
}