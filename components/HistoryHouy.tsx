'use client'
import React, { useEffect } from 'react'
import { getHistoryNumbers, getPrevHistoryNumbers } from '@/app/actions/number-action'
import dayjs from 'dayjs'
import { useRecoilState } from 'recoil'
import { loadingState, errorState, numbersState } from '@/lib/store/numbers'

type Props = {}

export default function HistoryHouy({ }: Props) {

    const [numbers, setNumbers] = useRecoilState(numbersState)
    const [loading, setLoading] = useRecoilState(loadingState)
    const [error, setError] = useRecoilState(errorState)


    useEffect(() => {

        // เรียก fetchNumber ทันทีที่ component ถูก mount เพื่อแสดงข้อมูลเก่า
        fetchNumbers();

        // ตั้ง interval เพื่อเช็คเวลาและ fetch ข้อมูลใหม่เมื่อถึง 15:45
        const intervalId = setInterval(fetchNumbers, 60000); // 60 วินาที

        // Clear interval เมื่อ component ถูก unmount
        return () => clearInterval(intervalId);
    }, [setNumbers, setError, setLoading])
    const fetchNumbers = async () => {
        const now = dayjs();
        const targetTime = dayjs().hour(15).minute(44).second(0);
        const midnight = dayjs().endOf('day');
    
        try {
            setLoading(true);

            const result = await getHistoryNumbers()
            console.log('result', result)
            const result2 = await getPrevHistoryNumbers()
            console.log('result2', result2)

            if (now.isBefore(targetTime)) {
                // ถ้าเวลาก่อน 15:45 ให้แสดงผลลัพธ์ของเมื่อวาน
                setNumbers(result2.numbers as any);
            } else {
                // ถ้าเวลาอยู่ระหว่าง 15:45 ถึงเที่ยงคืน ให้แสดงผลลัพธ์ของวันนี้
                setNumbers(result.numbers as any);
            }
            
            
        } catch (error) {
            setError("An error occurred while fetching the number.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col gap-2'>

            <h2 className='text-center text-2xl font-bold '>ຜົນການອອກເລກລາງວັນ</h2>
            <table className='border border-gray-400'>
                <thead className=''>
                    <tr>
                        <th className='border border-gray-400 p-2'>ງວດວັນທີ່</th>
                        <th className='border border-gray-400 p-2'>ເລກ 5 ໂຕ</th>
                        <th className='border border-gray-400 p-2'>ເລກ 4 ໂຕ</th>
                        <th className='border border-gray-400 p-2'>ເລກ 3 ໂຕ</th>
                        <th className='border border-gray-400 p-2'>ເລກ 2 ໂຕເທິ່ງ</th>
                        <th className='border border-gray-400 p-2'>ເລກ 2 ໂຕລຸ່ມ</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={6} className='border border-gray-400 p-2 text-center'>
                                กำลังโหลดข้อมูล...
                            </td>
                        </tr>
                    ) : (
                        numbers.map((number, index) => {
                            return (
                                <tr key={index}>
                                    <td className='border border-gray-400 p-2'>{dayjs(number.Date).format('DD/MM/YYYY')}</td>
                                    <td className='border border-gray-400 p-2'>{number.number5}</td>
                                    <td className='border border-gray-400 p-2'>{number.number4}</td>
                                    <td className='border border-gray-400 p-2'>{number.number3}</td>
                                    <td className='border border-gray-400 p-2'>{number.number2top}</td>
                                    <td className='border border-gray-400 p-2'>{number.number2}</td>
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </table>
        </div>
    )
}