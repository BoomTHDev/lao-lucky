import React from 'react'
import Image from "next/image";

type Props = {
    children: React.ReactNode
}

export default function ImageAds({ children }: Props) {
    return (
        <div className="flex flex-col items-center w-full px-4">
      <div className="w-full max-w-screen-lg">
        <Image
          src="/images/picmain4.png"
          width={1280}
          height={300}
          alt="Picture of the author"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mt-4 w-full max-w-screen-lg">
        <div className="flex-grow">{children}</div>
        <div className="flex flex-wrap lg:flex-col lg:ml-4 lg:w-1/3 mt-4 lg:mt-0 gap-2 justify-center">
          <div className="w-1/2 lg:w-full">
            <Image
              src="/images/pic1.png"
              width={200}
              height={200}
              alt="Picture of the author"
              className="w-full h-auto"
            />
          </div>
          <div className="w-1/2 lg:w-full">
            <Image
              src="/images/pic2.png"
              width={200}
              height={200}
              alt="Picture of the author"
              className="w-full h-auto"
            />
          </div>
          <div className="w-1/2 lg:w-full">
            <Image
              src="/images/pic3.png"
              width={200}
              height={200}
              alt="Picture of the author"
              className="w-full h-auto"
            />
          </div>
          <div className="w-1/2 lg:w-full">
            <Image
              src="/images/pic4.png"
              width={200}
              height={200}
              alt="Picture of the author"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
    )
}