"use client";

import { FormSubmissionHandler } from "@/app/classes/forms/form-submission-handler";
import { ReviewData } from "@/app/types/db/review";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useMemo, useState } from "react";

export default function EnhancedLeadCaptureForm() {
  const router = useRouter();
  const [review_id, setReviewId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loadingText, setLoadingText] = useState(
    "Analyzing your trip experience"
  );
  const [loadingStep, setLoadingStep] = useState(0);
  const formSubmissionHandler = useMemo(() => new FormSubmissionHandler(), []);

  // Update the form state to include all fields
  const [formData, setFormData] = useState<Partial<ReviewData>>({
    email: "",
    age_group: "",
    trip_type: "",
    description: "",
    transport_mode: "",
    rating: 5,
    company_name: "",
    origin: "",
    destination: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Effect to cycle through loading messages
  useEffect(() => {
    const loadingMessages = [
      "Analyzing sentiment in your feedback",
      "Identifying key themes in your experience",
      "Generating actionable insights",
      "Comparing with similar experiences",
      "Creating personalized recommendations",
      "Finalizing your trip analysis",
    ];

    if (isSubmitting) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
        setLoadingText(loadingMessages[loadingStep]);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isSubmitting, loadingStep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const review_id = await formSubmissionHandler.handleFormSubmission(formData as ReviewData);
      setReviewId(review_id);
      setIsSubmitted(true);
      router.push(`/reviews/${review_id}`);
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center text-center py-8">
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-6">
          <svg
            className="h-10 w-10 text-green-600 dark:text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          {`We've received your trip experience. Your review ID is `}
          <span className="font-semibold">{review_id}</span>.
        </p>
        <div className="w-full max-w-md p-6 bg-muted rounded-lg mb-6">
          <p className="text-center mb-4">
            Redirecting you to your personalized insights page...
          </p>
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center text-center py-12">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-primary/30"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">{loadingText}</h3>
        <p className="text-muted-foreground max-w-md">
          Our AI is working on your submission. This will just take a moment...
        </p>
      </div>
    );
  }

  // Form JSX remains the same as before
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age_group">Age Group</Label>
          <select
            id="age_group"
            name="age_group"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.age_group}
            onChange={handleChange}
            required
          >
            <option value="">Select age group</option>
            <option value="18-24">18-24</option>
            <option value="25-34">25-34</option>
            <option value="35-44">35-44</option>
            <option value="45-54">45-54</option>
            <option value="55-64">55-64</option>
            <option value="65+">65+</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="trip_type">Trip Type</Label>
          <select
            id="trip_type"
            name="trip_type"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.trip_type}
            onChange={handleChange}
            required
          >
            <option value="">Select trip type</option>
            <option value="Business">Business</option>
            <option value="Leisure">Leisure</option>
            <option value="Family">Family</option>
            <option value="Solo">Solo</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="transport_mode">Transport Mode</Label>
          <select
            id="transport_mode"
            name="transport_mode"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.transport_mode}
            onChange={handleChange}
            required
          >
            <option value="">Select transport mode</option>
            <option value="Airplane">Airplane</option>
            <option value="Train">Train</option>
            <option value="Bus">Bus</option>
            <option value="Car">Car</option>
            <option value="Ship">Ship</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company_name">Company Name</Label>
          <Input
            id="company_name"
            name="company_name"
            placeholder="Airline or travel company"
            required
            value={formData.company_name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rating">Rating</Label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`text-2xl ${
                  Number.parseInt(formData.rating?.toString() ?? "1") >= star
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, rating: star }))
                }
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="origin">Origin</Label>
          <Input
            id="origin"
            name="origin"
            placeholder="City or airport of departure"
            required
            value={formData.origin}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            name="destination"
            placeholder="City or airport of arrival"
            required
            value={formData.destination}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="start_date">Start Date</Label>
          <Input
            id="start_date"
            name="start_date"
            type="date"
            required
            value={formData.start_date}
            max={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="end_date">End Date</Label>
          <Input
            id="end_date"
            name="end_date"
            type="date"
            required
            value={formData.end_date}
            max={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Trip Experience Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Please share details about your most recent trip experience..."
          required
          className="min-h-[150px]"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full" size="lg">
        Submit Trip Experience
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By submitting this form, you agree to our Terms of Service and Privacy
        Policy.
      </p>
    </form>
  );
}
