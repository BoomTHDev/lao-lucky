'use client'
import React, { useEffect } from 'react'
import { useHistoryNumber } from '@/lib/store/history-number'
import { getHistoryNumbers } from '@/app/actions/number-action'
import dayjs from 'dayjs'

type Props = {}

export default function HistoryHouy({ }: Props) {
    const numbers = useHistoryNumber((state) => state.numbers)
    const isLoading = useHistoryNumber((state) => state.isLoading)
    const error = useHistoryNumber((state) => state.error)
    const setNumbers = useHistoryNumber((state) => state.setNumbers)
    const setIsLoading = useHistoryNumber((state) => state.setIsLoading)
    const setError = useHistoryNumber((state) => state.setError)

    useEffect(() => {

        // เรียก fetchNumber ทันทีที่ component ถูก mount เพื่อแสดงข้อมูลเก่า
        fetchNumbers();

        // ตั้ง interval เพื่อเช็คเวลาและ fetch ข้อมูลใหม่เมื่อถึง 15:45
        const intervalId = setInterval(fetchNumbers, 60000); // 60 วินาที

        // Clear interval เมื่อ component ถูก unmount
        return () => clearInterval(intervalId);
    }, [setNumbers, setError, setIsLoading])

    const fetchNumbers = async () => {
        const now = dayjs();
        const targetTime = dayjs().hour(15).minute(44).second(0);
        if (now.isAfter(targetTime)) {
            try {
                const result = await getHistoryNumbers()
                if (result.numbers) {
                    setNumbers(result.numbers)
                }
            } catch (error: any) {
                setError("An error occurred while fetching the number.")
            } finally {
                setIsLoading(false)
            }
        }
    }

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
                    {isLoading ? (
                        <tr>
                            <td colSpan={6} className='border border-gray-400 p-2 text-center'>
                                กำลังโหลดข้อมูล...
                            </td>
                        </tr>
                    ) : (
                        numbers.map((item, index) => (
                            <tr key={index}>
                                <td className='border border-gray-400 p-2'>{dayjs(item.Date).format('DD/MM/YYYY')}</td>
                                <td className='border border-gray-400 p-2'>{item.number5}</td>
                                <td className='border border-gray-400 p-2'>{item.number4}</td>
                                <td className='border border-gray-400 p-2'>{item.number3}</td>
                                <td className='border border-gray-400 p-2'>{item.number2top}</td>
                                <td className='border border-gray-400 p-2'>{item.number2}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}