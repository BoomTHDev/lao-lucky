"use client"

import { getMainNumber, getPrevMainNumber } from '@/app/actions/number-action'
import { errorState, loadingState, numberState } from '@/lib/store/numbers'
import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import { useRecoilState } from 'recoil'

type Props = {}

export default function MainHouy({ }: Props) {

    const [number, setNumber] = useRecoilState(numberState)
    const [loading, setLoading] = useRecoilState(loadingState)
    const [error, setError] = useRecoilState(errorState)

    const now = dayjs();
    const targetTime = dayjs().hour(15).minute(45).second(0);

    useEffect(() => {
        // เรียก fetchNumber ทันทีที่ component ถูก mount เพื่อแสดงข้อมูลเก่า
        fetchNumber();

        // ตั้ง interval เพื่อเช็คเวลาและ fetch ข้อมูลใหม่เมื่อถึง 15:45
        const intervalId = setInterval(fetchNumber, 60000); // 60 วินาที

        // Clear interval เมื่อ component ถูก unmount
        return () => clearInterval(intervalId);
    }, [setNumber, setLoading, setError])

    const fetchNumber = async () => {
        const now = dayjs();
        const targetTime = dayjs().hour(15).minute(45).second(0);
        const midnight = dayjs().endOf('day');

        try {
            setLoading(true);

            const result = await getMainNumber();
            const result2 = await getPrevMainNumber();

            if (now.isBefore(targetTime)) {
                // ถ้าเวลาก่อน 15:45 ให้แสดงผลลัพธ์ของเมื่อวาน
                setNumber(result2.result as any);
            } else {
                // ถ้าเวลาอยู่ระหว่าง 15:45 ถึงเที่ยงคืน ให้แสดงผลลัพธ์ของวันนี้
                setNumber(result.result as any);
            }

        } catch (error) {
            setError("An error occurred while fetching the number.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='flex flex-col gap-2'>
            <div className='font-bold text-lg'>ງວດປະຈຳວັນທີ່ {now.isBefore(targetTime) ? dayjs(number.Date).format("DD/MM/YYYY") : dayjs().format("DD/MM/YYYY")}</div>
            <h1 className='text-7xl font-bold'>
                {loading ? (
                    <div className='flex justify-center'>
                        <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900'></div>
                    </div>
                ) : error ? (
                    <div className='text-red-500'>{error}</div>
                ) : (
                    <div>{number.number5}</div>
                )}
            </h1>
            <div className='text-md'>ອອກຜົນລາງວັນ 15:45</div>
        </div>
    )
}
