'use client'

import type React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DoctorCard } from '@/components/doctor-card'
import { api } from '@/http'

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    gender: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSpecializationChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      setIsLoading(true)

      const response = await api.post('/auth/register', formData)
      console.log(response)
      console.log('Registration successful')
      router.push('/feed')
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex min-h-screen items-center justify-center py-8">
      <div className="grid w-full gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-2 text-center md:text-left">
            <h1
              className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              Join MedConnect
            </h1>
            <p className="text-gray-500">
              Create your account and connect with medical professionals worldwide.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Dr. Jane Smith"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="doctor@hospital.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Hospital/Clinic</Label>
              <Input
                id="company"
                name="company"
                placeholder="General Hospital"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Select onValueChange={handleSpecializationChange} value={formData.role}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="oncology">Oncology</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="psychiatry">Psychiatry</SelectItem>
                  <SelectItem value="general">General Practice</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={handleGenderChange} value={formData.gender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-violet-500"
                    disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-pink-500 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <DoctorCard
            name={formData.name || 'Your Name'}
            specialization={formData.role || 'Your Specialization'}
            company={formData.company || 'Your Hospital/Clinic'}
            email={formData.email || 'your.email@example.com'}
            gender={formData.gender || ''}
          />
        </div>
      </div>
    </div>
  )
}
