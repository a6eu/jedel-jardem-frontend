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
              {/* Hero Section */}
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

              {/* Features Section */}
              <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
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

              {/* Testimonials Section */}
              <section className="w-full py-12 md:py-24 lg:py-32 bg-teal-50">
                  <div className="container px-4 md:px-6">
                      <div className="flex flex-col items-center justify-center space-y-4 text-center">
                          <div className="space-y-2">
                              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
                                  Trusted by Medical Professionals
                              </h2>
                              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                                  Hear what our community members say about MedConnect
                              </p>
                          </div>
                      </div>
                      <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 mt-12">
                          <div className="flex flex-col p-6 bg-white rounded-lg shadow-md">
                              <div className="flex items-center space-x-2 mb-4">
                                  <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                                      <span className="text-teal-600 font-bold">JD</span>
                                  </div>
                                  <div>
                                      <h4 className="font-semibold">Dr. Jane Doe</h4>
                                      <p className="text-sm text-gray-500">Cardiologist</p>
                                  </div>
                              </div>
                              <p className="text-gray-600">
                                  &#34;MedConnect has transformed how I collaborate with colleagues. The case discussion
                                  forums are invaluable.&#34;
                              </p>
                              <div className="flex mt-4">
                                  {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                              </div>
                          </div>
                          <div className="flex flex-col p-6 bg-white rounded-lg shadow-md">
                              <div className="flex items-center space-x-2 mb-4">
                                  <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                                      <span className="text-teal-600 font-bold">RS</span>
                                  </div>
                                  <div>
                                      <h4 className="font-semibold">Dr. Robert Smith</h4>
                                      <p className="text-sm text-gray-500">Neurologist</p>
                                  </div>
                              </div>
                              <p className="text-gray-600">
                                  &#34;The secure messaging system allows me to consult with
                                  specialists across the country in real-time.&#34;
                              </p>
                              <div className="flex mt-4">
                                  {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                              </div>
                          </div>
                          <div className="flex flex-col p-6 bg-white rounded-lg shadow-md">
                              <div className="flex items-center space-x-2 mb-4">
                                  <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                                      <span className="text-teal-600 font-bold">MB</span>
                                  </div>
                                  <div>
                                      <h4 className="font-semibold">Dr. Maria Brown</h4>
                                      <p className="text-sm text-gray-500">Pediatrician</p>
                                  </div>
                              </div>
                              <p className="text-gray-600">
                                  &#34;As a rural practitioner, MedConnect gives me access to specialist opinions I wouldn&#39;t otherwise have.&#34;
                              </p>
                              <div className="flex mt-4">
                                  {[...Array(4)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                  <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* Pricing Section */}
              <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                  <div className="container px-4 md:px-6">
                      <div className="flex flex-col items-center justify-center space-y-4 text-center">
                          <div className="space-y-2">
                              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
                                  Simple, Transparent Pricing
                              </h2>
                              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                                  Choose the plan that fits your needs
                              </p>
                          </div>
                      </div>
                      <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 mt-12">
                          <div className="flex flex-col p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                              <h3 className="text-xl font-bold">Basic</h3>
                              <div className="my-4">
                                  <span className="text-4xl font-bold">$0</span>
                                  <span className="text-gray-500">/month</span>
                              </div>
                              <ul className="space-y-2 text-gray-600 my-4">
                                  <li className="flex items-center">
                                      <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                      </svg>
                                      Connect with 5 colleagues
                                  </li>
                                  <li className="flex items-center">
                                      <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                      </svg>
                                      Basic messaging
                                  </li>
                                  <li className="flex items-center">
                                      <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                      </svg>
                                      Access to public forums
                                  </li>
                              </ul>
                              <Button className="mt-auto" variant="outline">Get Started</Button>
                          </div>
                          <div className="flex flex-col p-6 bg-gradient-to-b from-teal-100 to-white rounded-lg border border-teal-200 shadow-md relative">
                              <div className="absolute top-0 right-0 bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                                  POPULAR
                              </div>
                              <h3 className="text-xl font-bold">Professional</h3>
                              <div className="my-4">
                                  <span className="text-4xl font-bold">$29</span>
                                  <span className="text-gray-500">/month</span>
                              </div>
                              <ul className="space-y-2 text-gray-600 my-4">
                                  <li className="flex items-center">
                                      <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                      </svg>
                                      Unlimited connections
                                  </li>
                                  <li className="flex items-center">
                                      <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                      </svg>
                                      Advanced messaging
                                  </li>
                                  <li className="flex items-center">
                                      <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                      </svg>
                                      Private groups
                                  </li>
                                  <li className="flex items-center">
                                      <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                      </svg>
                                      Case discussion boards
                                  </li>
                              </ul>
                              <Button className="mt-auto bg-gradient-to-r from-teal-500 to-teal-700 text-white">Upgrade Now</Button>
                          </div>
                          <div className="flex flex-col p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                              <h3 className="text-xl font-bold">Institution</h3>
                              <div className="my-4">
                                  <span className="text-4xl font-bold">$99</span>
                                  <span className="text-gray-500">/month</span>
                              </div>
                              <ul className="space-y-2 text-gray-600 my-4">
                                  <li className="flex items-center">
                                      <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                      </svg>
                                      Everything in Professional
                                  </li>
                                  <li className="flex items-center">
                                      <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                      </svg>
                                      Up to 50 team members
                                  </li>
                                  <li className="flex items-center">
                                      <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                      </svg>
                                      Admin dashboard
                                  </li>
                                  <li className="flex items-center">
                                      <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                      </svg>
                                      Priority support
                                  </li>
                              </ul>
                              <Button className="mt-auto" variant="outline">Contact Sales</Button>
                          </div>
                      </div>
                  </div>
              </section>

              {/* Download Section */}
              <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-teal-50 to-white">
                  <div className="container px-4 md:px-6">
                      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                          <div className="space-y-4 lg:w-1/2">
                              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
                                  Take MedConnect With You
                              </h2>
                              <p className="text-gray-600 max-w-[600px]">
                                  Download our mobile app to stay connected with your professional network wherever you go.
                              </p>
                              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                  <Button className="flex items-center gap-2 bg-black text-white hover:bg-gray-800">
                                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8.94-.14 1.69-.8 2.54-.87 1.07-.05 2.03.45 2.67 1.24-2.36 1.39-1.98 4.04.14 4.9-.9 1.22-2.01 2.41-3.45 2.43-1.41 0-1.85-.39-3.45-.24-.77.07-1.54.2-2.29.41-.39.1-.78.22-1.17.34-1.21.38-1.61 1.62-1.13 2.74 2.6 5.99 9.03 7.98 14.22 4.25.21-.15.41-.31.61-.47.48-.38.62-.97.42-1.52-.2-.55-.69-.9-1.23-.9h-.04zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                      </svg>
                                      App Store
                                  </Button>
                                  <Button className="flex items-center gap-2 bg-black text-white hover:bg-gray-800">
                                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                                      </svg>
                                      Google Play
                                  </Button>
                              </div>
                          </div>
                          <div className="lg:w-1/2 flex justify-center">
                              <div className="relative">
                                  <div className="absolute -inset-4 bg-teal-200 rounded-3xl blur-md opacity-75"></div>
                                  <div className="relative bg-white p-2 rounded-2xl shadow-xl border border-gray-100">
                                      <img
                                        src="/images/medconnect-app-screenshot.jpg"
                                        alt="MedConnect Mobile App"
                                        className="w-full max-w-xs rounded-xl"
                                        width={300}
                                        height={600}
                                      />
                                  </div>
                              </div>
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
