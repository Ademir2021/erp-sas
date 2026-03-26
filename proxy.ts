import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {

  const token = request.cookies.get('token')

  const isAuthPage = request.nextUrl.pathname.startsWith('/login')
  
  // Se não estiver logado e tentar acessar rota privada
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se estiver logado e tentar acessar login
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/person/:path*',
    '/perfil/:path*',
    '/items/:path*',
    '/sales/:path*'
  ]
}