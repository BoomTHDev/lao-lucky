import HistoryHouy from '@/components/HistoryHouy'
import LastHouy from '@/components/LastHouy'
import MainHouy from '@/components/MainHouy'
import React from 'react'
import ImageAds from '@/components/ImageAds'
type Props = {}

export default async function Home({ }: Props) {

  return (
    <>
      <div className='max-w-3xl mx-auto md:py-10 h-screen text-center space-y-10'>
        <ImageAds>
          <div className="w-full bg-white shadow-lg rounded-lg p-4">
            <MainHouy />

            <LastHouy />
          </div>
          <HistoryHouy />
        </ImageAds>
        {/* <Footer /> */}
      </div>
    </>
  )
}
