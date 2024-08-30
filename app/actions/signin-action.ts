"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import * as jose from "jose";
import bcrypt from "bcrypt";

export async function signin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    if (username && password) {
      const user = await prisma.user.findFirst({
        where: {
          username,
        },
      });

      if (!user) {
        return { error: "ไม่พบผู้ใช้", success: false };
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return { error: "รหัสผ่านไม่ถูกต้อง", success: false };
      }

      // create jwt token
      const secret = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_SECRET_TOKEN
      );
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
        path: "/",
        sameSite: "strict",
      });
      return { success: true, message: "เข้าสู่ระบบสำเร็จ" };
    }
  } catch (error: any) {
    return { error: error.message, success: false };
  }
}
