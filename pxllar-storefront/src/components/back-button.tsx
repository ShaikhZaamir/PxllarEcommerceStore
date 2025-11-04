"use client"

import { useRouter } from "next/navigation"

const BackButton = () => {
    const router = useRouter()
    return (
        <button
            onClick={() => router.back()}
            className="text-sm text-gray-600 hover:text-black mb-3"
        >
            ← Back
        </button>
    )
}

export default BackButton
