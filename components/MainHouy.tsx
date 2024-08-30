"use client"

import { getMainNumber, getPrevMainNumber } from '@/app/actions/number-action'
import { useMainNumber } from '@/lib/store/main-number'
import React, { useEffect } from 'react'
import dayjs from 'dayjs'

type Props = {}

export default function MainHouy({ }: Props) {
    const number = useMainNumber((state) => state.number)
    const isLoading = useMainNumber((state) => state.isLoading)
    const error = useMainNumber((state) => state.error)
    const setNumber = useMainNumber((state) => state.setNumber)
    const setIsLoading = useMainNumber((state) => state.setIsLoading)
    const setError = useMainNumber((state) => state.setError)

    const todayNow = dayjs().format('DD/MM/YYYY')

    useEffect(() => {
        // เรียก fetchNumber ทันทีที่ component ถูก mount เพื่อแสดงข้อมูลเก่า
        fetchNumber();

        // ตั้ง interval เพื่อเช็คเวลาและ fetch ข้อมูลใหม่เมื่อถึง 15:45
        const intervalId = setInterval(fetchNumber, 60000); // 60 วินาที

        // Clear interval เมื่อ component ถูก unmount
        return () => clearInterval(intervalId);
    }, [setNumber, setIsLoading, setError])

    const fetchNumber = async () => {
        const now = dayjs();
        const targetTime = dayjs().hour(15).minute(44).second(0);
        const midnight = dayjs().hour(0).minute(0).second(0);
    
        try {
            setIsLoading(true);

            const result = await getMainNumber()
            const result2 = await getPrevMainNumber()
            
            if (now.isSame(midnight) || now.isAfter(midnight)) {
                setNumber(result2.result?.number5 as any)
            } else if (now.isAfter(targetTime)) {
                setNumber(result.result?.number5 as any)
            }
            
        } catch (error) {
            setError("An error occurred while fetching the number.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex flex-col gap-2'>
            <div className='font-bold text-lg'>ງວດປະຈຳວັນທີ່ {todayNow}</div>
            <h1 className='text-7xl font-bold'>
                {isLoading ? (
                    <div className='flex justify-center'>
                        <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900'></div>
                    </div>
                ) : error ? (
                    <div className='text-red-500'>{error}</div>
                ) : (
                    number
                )}
            </h1>
            <div className='text-md'>ອອກຜົນລາງວັນ 15:45</div>
        </div>
    )
}
