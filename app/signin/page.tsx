import React from 'react'
import FormSignIn from '../../components/FormSignIn'

type Props = {}

export default function SignIn({}: Props) {

  return (
    <div className="bg-gradient-to-r from-slate-500 via-gray-500 to-black-500 h-screen flex justify-center items-center text-slate-500">
      <div className="bg-gray-200 p-10 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-center mb-8">เข้าสู่ระบบ</h1>
        <FormSignIn />
      </div>
    </div>
  )
}
