import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as jose from 'jose'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'

// GET
export async function GET(
  request: NextRequest,
  context: {
    params: {
      route: string;
    };
  }
): Promise<any> {
  const route = context.params.route;

  if (route === "number") {
    return getMainNumber();
  } else if (route === "last-numbers") {
    return getLastNumbers();
  } else if (route === "history") {
    return getTenLastNumberDate();
  }
  return NextResponse.json({ route });
}

// POST
export async function POST(
  request: NextRequest,
  context: {
    params: {
      route: string;
    };
  }
): Promise<any> {
  const route = context.params.route;

  if (route === 'numbers') {
    return addNumbers(request);
  } else if (route === 'signin') {
    return signin(request);
  }

  return NextResponse.json({ route });
}

// PUT
export async function PUT(
  request: NextRequest,
  context: {
    params: {
      route: string;
    };
  }
): Promise<any> {
  const route = context.params.route;

  return NextResponse.json({ route });
}

async function getMainNumber() {
  try {
    const response = await prisma.result.findFirst({});
    return NextResponse.json({ number: response?.number5 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}

async function getLastNumbers() {
  try {
    const response = await prisma.result.findFirst({});
    return NextResponse.json({ numbers: response });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}

async function getTenLastNumberDate() {
  try {
    const response = await prisma.result.findMany({
      take: 14,
      orderBy: { Date: "desc" },
    });
    return NextResponse.json({ numbers: response });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}

async function addNumbers(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await prisma.result.create({
      data: {
        number5: body.number5,
        number4: body.number4,
        number3: body.number3,
        number2top: body.number2top,
        number2: body.number2,
      }
    })

    return NextResponse.json({ numbers: response, success: true });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message, success: false });
  }
}

async function signin(req: NextRequest) {

  const { username, password } = await req.json();
  if (username && password) {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'ไม่พบผู้ใช้' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'รหัสผ่านไม่ถูกต้อง' });
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

    return NextResponse.json({ success: true, token: jwt });
  }
}

// async function signup(req: NextRequest) {

//   const { username, password } = await req.json();
//   if (username && password) {

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await prisma.user.create({
//       data: {
//         username,
//         password: hashedPassword
//       },
//     });
//     return NextResponse.json({ success: true });
//   }
// }