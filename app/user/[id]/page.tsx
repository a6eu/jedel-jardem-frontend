'use client'

import { MainNav } from '@/components/main-nav'
import { useParams } from 'next/navigation'
import { useGetUserById } from '@/hooks/use-get-user-by-id'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type React from 'react'

export default function UserPage() {
  const params = useParams()
  const { user } = useGetUserById(params.id as string)

  if (!user) return null

  const isPatient = user.role === 'user'

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 container py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-gray-500">Manage your account settings and profile information.</p>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="professional">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Personal information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar className="h-24 w-24 border-2 border-pink-200">
                        <AvatarFallback
                          className="bg-gradient-to-br from-pink-400 to-violet-500 text-white text-xl"
                        >
                          {user.name
                            .split(' ')
                            .map((n: string) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Full Name</p>
                        <p className="text-lg">{user.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-lg">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Gender</p>
                        <p className="text-lg capitalize">{user.gender}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Bio</p>
                    <p className="text-lg">{user.bio || '-'}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="professional" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{isPatient ? 'Medical Information' : 'Professional Information'}</CardTitle>
                  <CardDescription>
                    {isPatient
                      ? 'Patient medical history and details.'
                      : 'Professional details and specialization.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isPatient ? (
                    <>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Blood Type</p>
                        <p className="text-lg">{user.patientData?.bloodType || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Weight</p>
                        <p className="text-lg">{user.patientData?.weight ? `${user.patientData.weight} kg` : '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Height</p>
                        <p className="text-lg">{user.patientData?.height ? `${user.patientData.height} cm` : '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Illness History</p>
                        <p className="text-lg">
                          {user.patientData?.illnessHistory?.length
                            ? user.patientData.illnessHistory.join(', ')
                            : '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Allergies</p>
                        <p className="text-lg">
                          {user.patientData?.allergies?.length
                            ? user.patientData.allergies.join(', ')
                            : '-'}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Hospital/Clinic</p>
                        <p className="text-lg">{user.company || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Specialization</p>
                        <p className="text-lg capitalize">{user.role || '-'}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
