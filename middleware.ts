import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  if (host.toLowerCase() === 'www.letter-law.ru') {
    const url = req.nextUrl.clone()
    url.hostname = 'letter-law.ru'
    url.protocol = 'https:'
    return NextResponse.redirect(url, 301)
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
