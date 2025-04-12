"use client"

import type React from "react"
import {useState} from "react"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {MainNav} from "@/components/main-nav"

export default function ProfilePage() {
    const [profileData, setProfileData] = useState({
        name: "Dr. Jane Smith",
        email: "jane.smith@hospital.com",
        company: "General Hospital",
        specialization: "cardiology",
        gender: "female",
        bio: "Cardiologist with 10+ years of experience specializing in interventional procedures and cardiac imaging.",
        phone: "+1 (555) 123-4567",
        location: "New York, NY",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setProfileData((prev) => ({...prev, [name]: value}))
    }

    const handleSpecializationChange = (value: string) => {
        setProfileData((prev) => ({...prev, specialization: value}))
    }

    const handleGenderChange = (value: string) => {
        setProfileData((prev) => ({...prev, gender: value}))
    }

    const handleSave = () => {
        // In a real app, you would save the profile data to a backend
        console.log("Saving profile data:", profileData)
        // Show success message or redirect
    }

    return (
        <div className="flex min-h-screen flex-col">
            <MainNav/>
            <main className="flex-1 container py-6">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                        <p className="text-gray-500">Manage your account settings and profile information.</p>
                    </div>
                    <Tabs defaultValue="general" className="space-y-6">
                        <TabsList>
                            <TabsTrigger value="general">General</TabsTrigger>
                            <TabsTrigger value="professional">Professional</TabsTrigger>
                            <TabsTrigger value="account">Account</TabsTrigger>
                        </TabsList>
                        <TabsContent value="general" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile</CardTitle>
                                    <CardDescription>Update your personal information.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex flex-col items-center space-y-2">
                                            <Avatar className="h-24 w-24 border-2 border-pink-200">
                                                <AvatarFallback
                                                    className="bg-gradient-to-br from-pink-400 to-violet-500 text-white text-xl">
                                                    {profileData.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <Button variant="outline" size="sm">
                                                Change Avatar
                                            </Button>
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="name">Full Name</Label>
                                                <Input id="name" name="name" value={profileData.name}
                                                       onChange={handleChange}/>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input id="email" name="email" type="email" value={profileData.email}
                                                       onChange={handleChange}/>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="phone">Phone</Label>
                                                <Input id="phone" name="phone" value={profileData.phone}
                                                       onChange={handleChange}/>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="location">Location</Label>
                                                <Input id="location" name="location" value={profileData.location}
                                                       onChange={handleChange}/>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="gender">Gender</Label>
                                                <Select onValueChange={handleGenderChange} value={profileData.gender}>
                                                    <SelectTrigger id="gender">
                                                        <SelectValue placeholder="Select gender"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="male">Male</SelectItem>
                                                        <SelectItem value="female">Female</SelectItem>
                                                        <SelectItem value="non-binary">Non-binary</SelectItem>
                                                        <SelectItem value="prefer-not-to-say">Prefer not to
                                                            say</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Textarea id="bio" name="bio" rows={4} value={profileData.bio}
                                                  onChange={handleChange}/>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button className="bg-gradient-to-r from-pink-500 to-violet-500"
                                            onClick={handleSave}>
                                        Save Changes
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="professional" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Professional Information</CardTitle>
                                    <CardDescription>Update your professional details and
                                        specialization.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="company">Hospital/Clinic</Label>
                                        <Input id="company" name="company" value={profileData.company}
                                               onChange={handleChange}/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="specialization">Specialization</Label>
                                        <Select onValueChange={handleSpecializationChange}
                                                value={profileData.specialization}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select specialization"/>
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
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button className="bg-gradient-to-r from-pink-500 to-violet-500"
                                            onClick={handleSave}>
                                        Save Changes
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="account" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Password</CardTitle>
                                    <CardDescription>Change your password.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="current-password">Current Password</Label>
                                        <Input id="current-password" type="password"/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input id="new-password" type="password"/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="confirm-password">Confirm Password</Label>
                                        <Input id="confirm-password" type="password"/>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button className="bg-gradient-to-r from-pink-500 to-violet-500">Update
                                        Password</Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Delete Account</CardTitle>
                                    <CardDescription>Permanently delete your account and all of your
                                        data.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-500">
                                        Once you delete your account, there is no going back. Please be certain.
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="destructive">Delete Account</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}
