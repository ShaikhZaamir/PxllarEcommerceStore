"use client"

import { cn } from "lib/utils"

interface LoaderProps {
    size?: "sm" | "md" | "lg" | "xl"
    variant?: "default" | "dots" | "spinner" | "pulse" | "bars"
    text?: string
    className?: string
}

export function Loader({ size = "md", variant = "default", text, className }: LoaderProps) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12",
        xl: "w-16 h-16",
    }

    const textSizeClasses = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
    }

    if (variant === "dots") {
        return (
            <div className={cn("flex flex-col items-center gap-4", className)}>
                <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={cn(
                                "bg-black rounded-full animate-bounce",
                                size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : size === "lg" ? "w-4 h-4" : "w-5 h-5",
                            )}
                            style={{ animationDelay: `${i * 0.1}s` }}
                        />
                    ))}
                </div>
                {text && <p className={cn("text-gray-600", textSizeClasses[size])}>{text}</p>}
            </div>
        )
    }

    if (variant === "spinner") {
        return (
            <div className={cn("flex flex-col items-center gap-4", className)}>
                <div className={cn("border-2 border-gray-200 border-t-black rounded-full animate-spin", sizeClasses[size])} />
                {text && <p className={cn("text-gray-600", textSizeClasses[size])}>{text}</p>}
            </div>
        )
    }

    if (variant === "pulse") {
        return (
            <div className={cn("flex flex-col items-center gap-4", className)}>
                <div className={cn("bg-black rounded-full animate-pulse", sizeClasses[size])} />
                {text && <p className={cn("text-gray-600", textSizeClasses[size])}>{text}</p>}
            </div>
        )
    }

    if (variant === "bars") {
        return (
            <div className={cn("flex flex-col items-center gap-4", className)}>
                <div className="flex space-x-1">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={cn(
                                "bg-black animate-pulse",
                                size === "sm" ? "w-1 h-4" : size === "md" ? "w-1 h-6" : size === "lg" ? "w-2 h-8" : "w-2 h-10",
                            )}
                            style={{
                                animationDelay: `${i * 0.1}s`,
                                animationDuration: "1s",
                            }}
                        />
                    ))}
                </div>
                {text && <p className={cn("text-gray-600", textSizeClasses[size])}>{text}</p>}
            </div>
        )
    }

    // Default Shopify-style rotating squares
    return (
        <div className={cn("flex flex-col items-center gap-4", className)}>
            <div className={cn("relative", sizeClasses[size])}>
                <div className="absolute inset-0 border-2 border-black border-opacity-20 rounded-sm animate-spin" />
                <div
                    className="absolute inset-1 border-2 border-black border-opacity-40 rounded-sm animate-spin"
                    style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
                />
                <div className="absolute inset-2 bg-black rounded-sm animate-pulse" />
            </div>
            {text && <p className={cn("text-gray-600", textSizeClasses[size])}>{text}</p>}
        </div>
    )
}

// Page loader for full page loading states
export function PageLoader({ text = "Loading..." }: { text?: string }) {
    return (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <Loader size="lg" text={text} />
        </div>
    )
}

// Button loader for inline loading states
export function ButtonLoader({ size = "sm" }: { size?: "sm" | "md" }) {
    return <Loader size={size} variant="spinner" className="inline-flex" />
}

// Card skeleton for product cards
export function CardSkeleton() {
    return (
        <div className="border border-gray-200 rounded-lg p-4 animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4" />
            <div className="bg-gray-200 h-4 rounded mb-2" />
            <div className="bg-gray-200 h-4 rounded w-3/4 mb-4" />
            <div className="bg-gray-200 h-8 rounded" />
        </div>
    )
}

// Product grid skeleton
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    )
}
