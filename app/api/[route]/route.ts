import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
