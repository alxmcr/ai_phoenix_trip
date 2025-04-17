import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, CheckCircle, Lightbulb, LineChart, MessageSquareText } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="py-20 bg-muted/50 w-full flex justify-center">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful AI-Driven Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform provides comprehensive analysis of passenger
            trip experiences to help you improve your service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <MessageSquareText className="h-10 w-10 text-primary mb-2" />
              <CardTitle>AI Sentiment Analysis</CardTitle>
              <CardDescription>
                Advanced natural language processing to understand the emotional
                tone behind passenger feedback.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    Detect positive, negative, and neutral sentiments with 95%
                    accuracy
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    Identify emotional intensity and key concerns in real-time
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    Multilingual support for global passenger feedback
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <LineChart className="h-10 w-10 text-primary mb-2" />
              <CardTitle>AI Actionable Insights</CardTitle>
              <CardDescription>
                Transform passenger feedback into concrete actions to improve
                your service.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    Automatically categorize issues by urgency and impact
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    Generate prioritized action items for service improvement
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    Track resolution effectiveness with before/after analysis
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Lightbulb className="h-10 w-10 text-primary mb-2" />
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>
                Get AI-powered recommendations to enhance passenger experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    Personalized service improvement suggestions based on
                    feedback patterns
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Competitive benchmarking against industry leaders</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    Proactive issue prevention strategies with predictive
                    analytics
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Trend Analysis & Visual Reports</CardTitle>
              <CardDescription>
                Comprehensive visual analytics of travel experience data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    Interactive dashboards with real-time data visualization
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Identify seasonal trends and recurring patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Exportable reports for stakeholder presentations</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
