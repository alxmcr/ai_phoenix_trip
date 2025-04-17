import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-20 md:py-28 container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Unlock insights from passenger trip experiences with AI
          </h1>
          <p className="text-lg text-muted-foreground">
            Our AI-powered platform analyzes passenger feedback to deliver
            actionable insights, sentiment analysis, and recommendations to
            improve your service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button asChild size="lg" className="gap-2">
              <Link href="#form">
                Share your review <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#dashboard">View dashboard</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
          <Image
            src="/landing-page/travel-004.jpg?height=500&width=500"
            alt="AI analyzing trip data"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
