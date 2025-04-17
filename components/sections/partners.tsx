"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Partners() {
  const partners = [
    {
      name: "American Airlines",
      logo: "/logos/american-airlines.svg?height=40&width=120",
    },
    {
      name: "Delta Airlines",
      logo: "/logos/delta-airlines.svg?height=40&width=120",
    },
    { name: "Air Canada", logo: "/logos/air-canada.svg?height=40&width=120" },
    {
      name: "British Airways",
      logo: "/logos/british-airways.svg?height=40&width=120",
    },
    {
      name: "Qatar Airways",
      logo: "/logos/qatar-airways.svg?height=40&width=120",
    },
    { name: "Booking.com", logo: "/logos/bookingcom.svg?height=40&width=120" },
    { name: "TripAdvisor", logo: "/logos/tripadvisor.svg?height=40&width=120" },
    { name: "Kayak", logo: "/logos/kayak.svg?height=40&width=120" },
    { name: "Airbnb", logo: "/logos/airbnb.svg?height=40&width=120" },
  ];

  // Duplicate the partners array to create a seamless loop
  const allPartners = [...partners, ...partners];

  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Animation effect for the carousel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set animation properties
    container.style.animationPlayState = isPaused ? "paused" : "running";

    // Reset animation when it completes
    const handleAnimationEnd = () => {
      if (container) {
        container.style.animation = "none";
        container.offsetHeight; // Trigger reflow
        container.style.animation = `scroll 30s linear infinite`;
      }
    };

    container.addEventListener("animationend", handleAnimationEnd);

    return () => {
      container.removeEventListener("animationend", handleAnimationEnd);
    };
  }, [isPaused]);

  return (
    <section className="py-12 bg-background">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold font-inter text-muted-foreground mb-2">
            Trusted by leading companies in the travel industry
          </h2>
        </div>

        <div className="relative w-full overflow-hidden py-4 bg-muted/20 rounded-lg">
          {/* Add animation keyframes */}
          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
          `}</style>

          <div
            ref={containerRef}
            className="flex items-center gap-12 animate-none"
            style={{
              animation: "scroll 30s linear infinite",
              width: "fit-content",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {allPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center h-20 w-32"
              >
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={120}
                  height={40}
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
