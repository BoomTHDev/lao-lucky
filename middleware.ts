import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ระบุเส้นทางที่ต้องการให้ middleware ทำงาน
const PUBLIC_PATHS = ['/signin'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token_user')?.value;

  // ถ้ามี token และอยู่ในเส้นทาง /signin ให้ redirect ไปที่ /dashboard
  if (token && PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // ถ้าไม่มี token และพยายามเข้าถึง /dashboard ให้ redirect ไปที่ /signin
  if (!token && request.nextUrl.pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // ปล่อยผ่านสำหรับกรณีอื่นๆ
  return NextResponse.next();
}

// ระบุเส้นทางที่ต้องการใช้ middleware นี้
export const config = {
  matcher: ['/dashboard', '/signin'],
};
