"use server";

import { PrismaClient } from "@prisma/client";
import * as jose from "jose";
import bcrypt from "bcrypt";
import { cookies } from 'next/headers'

const prisma = new PrismaClient();

export async function signin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // find user
  if (username && password) {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    // check user
    if (!user) {
      return { message: "ไม่พบผู้ใช้", type: 'error' };
    }

    // compare password
    const correctPass = await bcrypt.compare(password, user.password);
    if (!correctPass) {
      return { message: "รหัสผ่านไม่ถูกต้อง", type: 'error' };
    }

    // create jwt token
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_TOKEN);
    const alg = "HS256";
    const jwt = await new jose.SignJWT({
      username: user.username,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("350h")
      .setSubject(user.id.toString())
      .sign(secret);

      // set cookies
      cookies().set("token_user", jwt, {
        secure: true,
        httpOnly: true,
        expires: Date.now() + 24 * 60 * 60 * 1000 * 13,
        path: '/',
        sameSite: 'strict'
    })

    return { message: 'เข้าสู่ระบบสำเร็จ', type: 'success' }
  }
}