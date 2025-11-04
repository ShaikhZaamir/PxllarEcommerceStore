"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, ThumbsUp, ThumbsDown, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample reviews data - in real app, this would come from Medusa API
const reviews = [
  {
    id: "1",
    customer: {
      name: "Priya Sharma",
      avatar: "/placeholder-user.jpg",
      verified: true,
    },
    rating: 5,
    title: "Excellent quality and fast delivery!",
    content:
      "I'm really impressed with this product. The quality is outstanding and it arrived much faster than expected. The packaging was also very secure. Highly recommended!",
    date: "2024-01-10T14:30:00Z",
    helpful: 12,
    notHelpful: 1,
    images: ["/placeholder.jpg"],
    verified_purchase: true,
  },
  {
    id: "2",
    customer: {
      name: "Rajesh Kumar",
      avatar: "/placeholder-user.jpg",
      verified: true,
    },
    rating: 4,
    title: "Good value for money",
    content:
      "The product is good overall. Quality is decent for the price point. Delivery was on time. Only minor issue is that the color is slightly different from what's shown in the photos.",
    date: "2024-01-08T09:15:00Z",
    helpful: 8,
    notHelpful: 2,
    images: [],
    verified_purchase: true,
  },
  {
    id: "3",
    customer: {
      name: "Anita Patel",
      avatar: "/placeholder-user.jpg",
      verified: false,
    },
    rating: 5,
    title: "Perfect for gifting!",
    content:
      "Bought this as a gift for my sister and she absolutely loved it! The presentation was beautiful and the quality exceeded expectations. Will definitely order again.",
    date: "2024-01-05T16:45:00Z",
    helpful: 15,
    notHelpful: 0,
    images: [],
    verified_purchase: true,
  },
  {
    id: "4",
    customer: {
      name: "Vikram Singh",
      avatar: "/placeholder-user.jpg",
      verified: true,
    },
    rating: 3,
    title: "Average product",
    content:
      "The product is okay but nothing special. It does what it's supposed to do but I expected better quality for this price. Customer service was helpful though.",
    date: "2024-01-03T11:20:00Z",
    helpful: 5,
    notHelpful: 3,
    images: [],
    verified_purchase: true,
  },
]

const ratingDistribution = [
  { stars: 5, count: 45, percentage: 60 },
  { stars: 4, count: 20, percentage: 27 },
  { stars: 3, count: 8, percentage: 11 },
  { stars: 2, count: 1, percentage: 1 },
  { stars: 1, count: 1, percentage: 1 },
]

const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div className="flex items-center space-x-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizeClasses[size],
            star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200",
          )}
        />
      ))}
    </div>
  )
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

interface ProductReviewsProps {
  productId: string
  className?: string
}

export function ProductReviews({ productId, className }: ProductReviewsProps) {
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: "",
    content: "",
  })

  const averageRating = 4.2
  const totalReviews = 75

  const handleSubmitReview = () => {
    // In real app, this would submit to Medusa API
    console.log("Submitting review:", newReview)
    setShowWriteReview(false)
    setNewReview({ rating: 0, title: "", content: "" })
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Customer Reviews</CardTitle>
            <CardDescription>
              {totalReviews} reviews with an average rating of {averageRating} out of 5
            </CardDescription>
          </div>
          <Button variant="outline" onClick={() => setShowWriteReview(!showWriteReview)}>
            Write a Review
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold">{averageRating}</span>
              <div className="space-y-1">
                <StarRating rating={Math.round(averageRating)} size="md" />
                <p className="text-sm text-muted-foreground">Based on {totalReviews} reviews</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center space-x-2 text-sm">
                <span className="w-8">{item.stars}★</span>
                <Progress value={item.percentage} className="flex-1 h-2" />
                <span className="w-8 text-muted-foreground">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review Form */}
        {showWriteReview && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Write a Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Rating</label>
                <div className="flex items-center space-x-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setNewReview({ ...newReview, rating: star })} className="p-1">
                      <Star
                        className={cn(
                          "h-6 w-6",
                          star <= newReview.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200 hover:fill-yellow-200 hover:text-yellow-200",
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Review Title</label>
                <input
                  type="text"
                  placeholder="Summarize your review"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Review</label>
                <Textarea
                  placeholder="Tell others about your experience with this product"
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleSubmitReview} disabled={!newReview.rating || !newReview.content}>
                  Submit Review
                </Button>
                <Button variant="outline" onClick={() => setShowWriteReview(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-b-0">
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.customer.avatar || "/placeholder.svg"} alt={review.customer.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    {getInitials(review.customer.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{review.customer.name}</span>
                      {review.verified_purchase && (
                        <Badge variant="secondary" className="text-xs">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <StarRating rating={review.rating} size="sm" />
                    <span className="text-sm text-muted-foreground">{formatDate(review.date)}</span>
                  </div>

                  <div>
                    <h4 className="font-medium">{review.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{review.content}</p>
                  </div>

                  {review.images.length > 0 && (
                    <div className="flex space-x-2">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt={`Review image ${index + 1}`}
                          className="h-16 w-16 object-cover rounded-md border"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center space-x-4 text-sm">
                    <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                      <ThumbsUp className="h-3 w-3" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                      <ThumbsDown className="h-3 w-3" />
                      <span>Not helpful ({review.notHelpful})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline">Load More Reviews</Button>
        </div>
      </CardContent>
    </Card>
  )
}
