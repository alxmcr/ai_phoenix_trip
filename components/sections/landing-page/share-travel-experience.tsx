import EnhancedLeadCaptureForm from "@/components/forms/enhanced-lead-capture-form";
import { Card, CardContent } from "@/components/ui/card";

export default function ShareTravelExperience() {
  return (
    <section
      id="form"
      className="py-20 px-4 md:px-0 w-full flex justify-center"
    >
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Share Your Travel Experience
            </h2>
            <p className="text-lg text-muted-foreground">
              Submit your trip details and get AI-powered insights
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <EnhancedLeadCaptureForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
