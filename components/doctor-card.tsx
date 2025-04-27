import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge"

interface DoctorCardProps {
    name: string
    specialization: string
    company: string
    email: string
    gender?: string
    avatarUrl?: string
}

export function DoctorCard({name, specialization, company, email, gender, avatarUrl}: DoctorCardProps) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()

    const specializationColors: Record<string, string> = {
        cardiology: "bg-red-100 text-red-800",
        neurology: "bg-purple-100 text-purple-800",
        pediatrics: "bg-blue-100 text-blue-800",
        oncology: "bg-amber-100 text-amber-800",
        dermatology: "bg-green-100 text-green-800",
        psychiatry: "bg-indigo-100 text-indigo-800",
        general: "bg-gray-100 text-gray-800",
    }

    const badgeClass = specializationColors[specialization.toLowerCase()] || "bg-teal-100 text-teal-800"

    return (
        <Card className="w-full max-w-md transform transition-all duration-300 hover:shadow-lg">
            <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2">
                        <AvatarImage src={avatarUrl} alt={name}/>
                        <AvatarFallback className="bg-[#1E7F6E] text-white">
                            {initials || "MD"}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-xl font-bold">{name || "Doctor Name"}</h3>
                        {specialization && <Badge className={badgeClass}>{specialization}</Badge>}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {company && (
                        <div className="flex items-center gap-2 text-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-teal-800"
                            >
                                <path d="M3 21h18"></path>
                                <path d="M5 21V7l8-4v18"></path>
                                <path d="M19 21V11l-6-4"></path>
                                <path d="M9 9h1"></path>
                                <path d="M9 13h1"></path>
                                <path d="M9 17h1"></path>
                            </svg>
                            <span>{company}</span>
                        </div>
                    )}
                    {gender && (
                        <div className="flex items-center gap-2 text-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-teal-800"
                            >
                                <circle cx="12" cy="8" r="5"></circle>
                                <path d="M20 21a8 8 0 0 0-16 0"></path>
                            </svg>
                            <span>{gender.charAt(0).toUpperCase() + gender.slice(1)}</span>
                        </div>
                    )}
                    {email && (
                        <div className="flex items-center gap-2 text-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-teal-800"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </svg>
                            <span>{email}</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
