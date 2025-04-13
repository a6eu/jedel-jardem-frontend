'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Home, MessageSquare, User } from 'lucide-react'

export function MainNav() {
  const pathname = usePathname()

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/feed" className="mr-6 flex items-center space-x-2">
            <span
              className="font-bold text-xl bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              MedConnect
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Link href="/feed">
              <Button variant={pathname === '/feed' ? 'default' : 'ghost'} size="icon">
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant={pathname.startsWith('/chat') ? 'default' : 'ghost'} size="icon">
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">Messages</span>
              </Button>
            </Link>
            {/*<Link href="/notifications">*/}
            {/*    <Button variant={pathname === "/notifications" ? "default" : "ghost"} size="icon">*/}
            {/*        <Bell className="h-5 w-5"/>*/}
            {/*        <span className="sr-only">Notifications</span>*/}
            {/*    </Button>*/}
            {/*</Link>*/}
            {/*<Link href="/profile">*/}
            {/*  <Button variant={pathname === '/profile' ? 'default' : 'ghost'} size="icon">*/}

            {/*  </Button>*/}
            {/*</Link>*/}
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={pathname === '/profile' ? 'default' : 'ghost'} size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              {/*<DropdownMenuItem asChild>*/}
              {/*    <Link href="/settings">Settings</Link>*/}
              {/*</DropdownMenuItem>*/}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/auth/login">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
