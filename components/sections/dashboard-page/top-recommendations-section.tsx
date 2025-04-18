import { RecommendationDB } from "@/app/classes/db/recommendation-db";
import { RecommendationData } from "@/app/types/db/recommendation";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const dbRecommendation = new RecommendationDB();

async function getTopRecommendations() {
  const recommendations = await dbRecommendation.paginate(1, 5);
  return recommendations;
}

export default async function TopRecommendations() {
  let recommendations: RecommendationData[] = [];

  try {
    recommendations = await getTopRecommendations();
  } catch (error) {
    console.log("🚀 ~ TopRecommendations ~ error:", error);
  }

  // Function to get badge variant based on impact
  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-green-600">{impact}</Badge>;
      case "medium":
        return <Badge variant="default">{impact}</Badge>;
      case "low":
        return <Badge variant="secondary">{impact}</Badge>;
      default:
        return <Badge variant="outline">{impact}</Badge>;
    }
  };

  // Function to get badge variant based on effort
  const getEffortBadge = (effort: string) => {
    switch (effort) {
      case "high":
        return <Badge variant="destructive">{effort}</Badge>;
      case "medium":
        return <Badge variant="default">{effort}</Badge>;
      case "low":
        return <Badge className="bg-green-600">{effort}</Badge>;
      default:
        return <Badge variant="outline">{effort}</Badge>;
    }
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Top Recommendations</CardTitle>
        <CardDescription>
          Suggested improvements based on customer feedback
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((recommendation) => (
            <div
              key={recommendation.recommendation_id}
              className="rounded-lg border p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{recommendation.title}</h3>
                <div className="flex gap-2">
                  <span className="text-xs text-muted-foreground">Impact:</span>
                  {getImpactBadge(recommendation.impact)}
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {recommendation.description}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <Badge variant="outline">{recommendation.target_area}</Badge>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Effort:</span>
                  {getEffortBadge(recommendation.effort_level)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
