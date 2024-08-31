'use client'

import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import { getMainNumber, getPrevMainNumber } from '@/app/actions/number-action'
import { useRecoilState } from 'recoil'
import { numberState, loadingState, errorState } from '@/lib/store/numbers'

type Props = {}

export default function LastHouy({ }: Props) {
    const [numbers, setNumbers] = useRecoilState(numberState)
    const [loading, setLoading] = useRecoilState(loadingState)
    const [error, setError] = useRecoilState(errorState)

    // useEffect(() => {
    //     // เรียก fetchNumber ทันทีที่ component ถูก mount เพื่อแสดงข้อมูลเก่า
    //     fetchNumbers();

    //     // ตั้ง interval เพื่อเช็คเวลาและ fetch ข้อมูลใหม่เมื่อถึง 15:45
    //     const intervalId = setInterval(fetchNumbers, 60000); // 60 วินาที

    //     // Clear interval เมื่อ component ถูก unmount
    //     return () => clearInterval(intervalId);
    // }, [setNumbers, setLoading, setError])

    // const fetchNumbers = async () => {
    //     const now = dayjs();
    //     const targetTime = dayjs().hour(15).minute(45).second(0);
    //     const midnight = dayjs().endOf('day');
        
    //     try {
    //         setLoading(true);
    
    //         const result = await getMainNumber();
    //         const result2 = await getPrevMainNumber();
            
    //         if (now.isBefore(targetTime)) {
    //             // ถ้าเวลาก่อน 15:45 ให้แสดงผลลัพธ์ของเมื่อวาน
    //             setNumbers(result2.result as any);
    //         } else {
    //             // ถ้าเวลาอยู่ระหว่าง 15:45 ถึงเที่ยงคืน ให้แสดงผลลัพธ์ของวันนี้
    //             setNumbers(result.result as any);
    //         }
            
    //     } catch (error) {
    //         setError("An error occurred while fetching the number.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div className='grid grid-cols-2 border-2 border-gray-400'>
            <div className='border-b-2 border-r-2 border-gray-400 h-10 flex justify-center items-center'>
                <span>ເລກ 5 ໂຕ</span>
            </div>
            <div className='border-b-2 border-gray-400 h-10 flex justify-center items-center'>

                {loading ? (
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
                {loading ? (
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
                {loading ? (
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
                {loading ? (
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
                {loading ? (
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