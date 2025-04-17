"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle } from "lucide-react";

export default function LeadCaptureForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Update the form state to include all the new fields
  const [formData, setFormData] = useState({
    review_id: `REV-${Math.floor(Math.random() * 10000)}`,
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          We've received your trip experience. Our AI is analyzing it now, and
          we'll send the insights to your email shortly.
        </p>
        <div className="w-full max-w-md p-6 bg-muted rounded-lg">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Sentiment Analysis</h4>
              <div className="h-4 bg-primary/20 rounded animate-pulse"></div>
            </div>
            <div>
              <h4 className="font-medium mb-1">Actionable Insights</h4>
              <div className="h-4 bg-primary/20 rounded animate-pulse"></div>
            </div>
            <div>
              <h4 className="font-medium mb-1">Recommendations</h4>
              <div className="h-4 bg-primary/20 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        <Button
          className="mt-8"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              review_id: `REV-${Math.floor(Math.random() * 10000)}`,
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
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
          }}
        >
          Submit Another Experience
        </Button>
      </div>
    );
  }

  // Replace the form JSX with this updated version:
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="review_id" value={formData.review_id} />
      <input type="hidden" name="created_at" value={formData.created_at} />
      <input type="hidden" name="updated_at" value={formData.updated_at} />

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
                  Number.parseInt(formData.rating as any) >= star
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

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          "Submit Trip Experience"
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By submitting this form, you agree to our Terms of Service and Privacy
        Policy.
      </p>
    </form>
  );
}
