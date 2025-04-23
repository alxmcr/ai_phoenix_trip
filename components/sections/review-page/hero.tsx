"use client";

import { ReviewData } from "@/app/types/db/review";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { formatDate } from "@/lib/util-dates";
import { Copy, Facebook, MessageCircle, Twitter } from "lucide-react";

interface HeroSectionProps {
  review: ReviewData;
}

export function Hero({ review }: HeroSectionProps) {
  const shareOnTwitter = (id: string) => {
    const url = `${window.location.origin}/reviews/${id}`;
    const text = `Check out this review on Phoenix Trip AI!`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareOnFacebook = (id: string) => {
    const url = `${window.location.origin}/reviews/${id}`;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareOnWhatsApp = (id: string) => {
    const url = `${window.location.origin}/reviews/${id}`;
    const text = `Check out this review on Phoenix Trip AI!`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
      "_blank"
    );
  };

  // Check if the review is valid
  if (!review) {
    return <div>Review not found</div>;
  }

  return (
    <section className="mb-8 px-4 md:px-0 container">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Review Analysis</h1>
          <p className="text-muted-foreground">
            Insights from passenger feedback for improved service
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => shareOnTwitter(review.review_id)}
            title="Share on X/Twitter"
          >
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Share on X/Twitter</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => shareOnFacebook(review.review_id)}
            title="Share on Facebook"
          >
            <Facebook className="h-4 w-4" />
            <span className="sr-only">Share on Facebook</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => shareOnWhatsApp(review.review_id)}
            title="Share on WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="sr-only">Share on WhatsApp</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{review.company_name}</CardTitle>
              <CardDescription>
                {review.transport_mode} journey from {review.origin} to{" "}
                {review.destination}
              </CardDescription>
            </div>

            {review.review_id ? (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  ID: {review.review_id.substring(0, 8)}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => copyToClipboard(review.review_id)}
                  title="Copy Review ID"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy ID</span>
                </Button>
              </div>
            ) : null}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{review.trip_type}</Badge>
                <Badge variant="secondary">{review.age_group}</Badge>
                <div className="flex items-center ml-auto">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < review.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {review.description}
              </p>
            </div>

            {review.start_date && review.end_date ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Travel Date</p>
                  <p className="text-sm text-muted-foreground">
                    {`${formatDate(review.start_date)} to ${formatDate(
                      review.end_date
                    )}`}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Submitted</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(review.created_at)}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
