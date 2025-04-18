import { ActionableData } from "@/app/types/db/actionable";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ActionableInsights() {
  // Next.js API url by environment variable
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // Endpoint to GET actionable insights
  const endpoint = `${baseUrl}/api/actionables?page=1&limit=5`;

  // Fetch the actionable insights
  const response = await fetch(endpoint);

  // Actionable insights
  const actionableInsights = (await response.json()) as ActionableData[];

  // Function to get badge variant based on priority
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">{priority}</Badge>;
      case "medium":
        return <Badge variant="default">{priority}</Badge>;
      case "low":
        return <Badge variant="secondary">{priority}</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Actionable Insights</CardTitle>
        <CardDescription>Key issues that need attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actionableInsights.map((insight) => (
            <div key={insight.actionable_id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{insight.title}</h3>
                {getPriorityBadge(insight.priority)}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {insight.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="outline">{insight.department}</Badge>
                <Badge variant="outline">{insight.category}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
