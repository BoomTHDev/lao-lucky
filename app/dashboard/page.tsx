import React from 'react'
import FormUpdateNumber from '../../components/FormUpdateNumber'

type Props = {}

export default function Dashboard({}: Props) {

  return (
    <div className="bg-gradient-to-r from-slate-500 via-gray-500 to-black-500 h-screen flex justify-center items-center text-slate-500">
      <div className="bg-gray-200 p-10 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-center mb-8">กรอกหมายเลขที่นี่</h1>
        <FormUpdateNumber />
      </div>
    </div>
  )
}
