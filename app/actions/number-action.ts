'use server'

import { prisma } from '@/lib/prisma'
import moment from 'moment-timezone'

export async function getMainNumber() {
  try {
    const response = await prisma.result.findFirst({
      orderBy: { Date: "desc" }
    });
    return { result: response, success: true }
  } catch (error: any) {
    console.log(error);
    return { error: error.message, success: false }
  }
}

export async function getPrevMainNumber() {
  try {
    const response = await prisma.result.findFirst({
      orderBy: { Date: "desc" },
      skip: 1
    })
    return { result: response, success: true }
  } catch (error: any) {
    console.log(error);
    return { error: error.message, success: false }
  }
}

export async function getLastNumbers() {
  try {
    const response = await prisma.result.findFirst({
      orderBy: { Date: "desc" },
    });
    return { numbers: response, success: true }
  } catch (error: any) {
    console.log(error);
    return { error: error.message, success: false }
  }
}

export async function getPrevLastNumbers() {
  try {
    const response = await prisma.result.findFirst({
      orderBy: { Date: "desc" },
      skip: 1
    })
    return { numbers: response, success: true }
  } catch (error: any) {
    console.log(error);
    return { error: error.message, success: false }
  }
}

export async function getHistoryNumbers() {
  try {
    const response = await prisma.result.findMany({
      take: 14,
      orderBy: { Date: "desc" },
    });
    return { numbers: response, success: true }
  } catch (error: any) {
    console.log(error);
    return { error: error.message, success: false }
  }
}

export async function getPrevHistoryNumbers() {
  try {
    const response = await prisma.result.findMany({
      orderBy: { Date: "desc" },
      take: 14,
      skip: 1
    })
    return { numbers: response, success: true }
  } catch (error: any) {
    console.log(error);
    return { error: error.message, success: false }
  }
}

export async function addNumber(formData: FormData) {
    const number5 = formData.get('number5') as string
    const number4 = formData.get('number4') as string
    const number3 = formData.get('number3') as string
    const number2top = formData.get('number2top') as string
    const number2 = formData.get('number2') as string 
    const bangkokTime = moment().tz("Asia/Bangkok");
    const currentDateTime = bangkokTime.utc().toDate();  // แปลงเป็นเวลา UTC
    const currentDate = bangkokTime.startOf('day').utc().toDate();  // แปลงวันที่เป็น UTC
    const updateTime = moment().tz("Asia/Bangkok").set({ hour: 15, minute: 45, second: 0, millisecond: 0 }).utc().toDate();  // เวลา 15:45 ของวันนี้ใน UTC
  
    const existingResult = await prisma.result.findFirst({
      where: {
        Date: {
          gte: currentDate,
          lt: moment(currentDate).add(1, 'day').toDate()
        }
      }
    });
    try {
      if (existingResult && currentDateTime < updateTime) {
        await prisma.result.update({
          where: {
            id: existingResult.id
          },
          data: {
            number5,
            number4,
            number3,
            number2top,
            number2,
            Date: currentDateTime
          }
        });
        return { message: 'อัพเดทเลขหวยสำเร็จ', type: 'success' };
      } else if (existingResult && currentDateTime >= updateTime) {
        return { message: 'กรุณาแก้ไขข้อมูลใหม่ในวันพรุ่งนี้อีกครั้งก่อนเวลา 15.45 ครับ', type: 'error' }
      } else if (!existingResult && currentDateTime >= updateTime) {
        return { message: 'กรุณาแก้ไขข้อมูลใหม่ในวันพรุ่งนี้อีกครั้งก่อนเวลา 15.45 ครับ', type: 'error' }
      } else if (!existingResult && currentDateTime < updateTime) {
        await prisma.result.create({
          data: {
            number5,
            number4,
            number3,
            number2top,
            number2,
            Date: currentDateTime
          }
        });
        return { message: 'สร้างเลขหวยใหม่สำเร็จ', type: 'success' };
      }
    } catch (error: any) {
      return { message: 'เกิดข้อผิดพลาดในการอัพเดทข้อมูล' };
    }
  }