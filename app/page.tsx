import Link from "next/link"
import {Button} from "@/components/ui/button"

export default function Home() {
    return (
      <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center">
                  <div className="mr-4 flex">
                      <Link href="/" className="mr-6 flex items-center space-x-2">
              <span
                className="font-bold text-xl bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
                MedConnect
              </span>
                      </Link>
                  </div>
                  <div className="flex flex-1 items-center justify-end space-x-4">
                      <nav className="flex items-center space-x-2">
                          <Link href="/auth/login" passHref>
                              <Button variant="outline">Login</Button>
                          </Link>
                          <Link href="/auth/register" passHref>
                              <Button
                                className="bg-gradient-to-r from-teal-500 to-teal-700 text-white">Register</Button>
                          </Link>
                      </nav>
                  </div>
              </div>
          </header>
          <main className="flex-1">
              <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-teal-50">
                  <div className="container px-4 md:px-6">
                      <div className="flex flex-col items-center justify-center space-y-4 text-center">
                          <div className="space-y-2">
                              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
                                  Connect with Medical Professionals
                              </h1>
                              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                                  Join our community of healthcare specialists to share knowledge, collaborate, and
                                  grow your network.
                              </p>
                          </div>
                          <div className="flex flex-col gap-2 min-[400px]:flex-row">
                              <Link href="/auth/register" passHref>
                                  <Button className="bg-gradient-to-r from-teal-500 to-teal-700 text-white">
                                      Get Started
                                  </Button>
                              </Link>
                              <Link href="/auth/login" passHref>
                                  <Button variant="outline">Sign In</Button>
                              </Link>
                          </div>
                      </div>
                  </div>
              </section>
              <section className="w-full py-12 md:py-24 lg:py-32">
                  <div className="container px-4 md:px-6">
                      <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                          <div className="flex flex-col justify-center space-y-4">
                              <div className="inline-block rounded-lg bg-teal-100 p-3 text-teal-500">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-6 w-6"
                                  >
                                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                      <circle cx="9" cy="7" r="4"></circle>
                                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                  </svg>
                              </div>
                              <h3 className="text-xl font-bold">Connect with Peers</h3>
                              <p className="text-gray-500 dark:text-gray-400">
                                  Build your professional network with specialists from around the world.
                              </p>
                          </div>
                          <div className="flex flex-col justify-center space-y-4">
                              <div className="inline-block rounded-lg bg-teal-100 p-3 text-teal-500">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-6 w-6"
                                  >
                                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                  </svg>
                              </div>
                              <h3 className="text-xl font-bold">Real-time Chat</h3>
                              <p className="text-gray-500 dark:text-gray-400">
                                  Communicate directly with colleagues through our secure messaging system.
                              </p>
                          </div>
                          <div className="flex flex-col justify-center space-y-4">
                              <div className="inline-block rounded-lg bg-teal-100 p-3 text-teal-500">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-6 w-6"
                                  >
                                      <path
                                        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                  </svg>
                              </div>
                              <h3 className="text-xl font-bold">Share Knowledge</h3>
                              <p className="text-gray-500 dark:text-gray-400">
                                  Post updates, articles, and insights to help the medical community.
                              </p>
                          </div>
                      </div>
                  </div>
              </section>
          </main>
          <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                  <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
                      © 2024 MedConnect. All rights reserved.
                  </p>
              </div>
          </footer>
      </div>
    )
}
