import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our simple 4-step process turns passenger feedback into valuable
            insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fill a Form</h3>
            <p className="text-muted-foreground">
              Submit passenger trip experience details through our simple form
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Send Information</h3>
            <p className="text-muted-foreground">
              Securely transmit the data to our AI-powered analysis engine
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Process with AI</h3>
            <p className="text-muted-foreground">
              Our advanced AI analyzes the feedback using natural language
              processing
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">4</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
            <p className="text-muted-foreground">
              Receive detailed sentiment analysis, actionable insights, and
              recommendations
            </p>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <Button asChild size="lg">
            <Link href="#form">Try It Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
