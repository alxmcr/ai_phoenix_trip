import { ActionableDB } from "@/app/classes/db/actionable-db";
import { ActionableData } from "@/app/types/db/actionable";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const dbActionable = new ActionableDB();

async function getActionableInsights() {
  const actionables = await dbActionable.paginate(1, 5);

  return actionables;
}

export default async function ActionableInsights() {
  let actionableInsights: ActionableData[] = [];

  try {
    actionableInsights = await getActionableInsights();
  } catch (error) {
    console.log("🚀 ~ ActionableInsights ~ error:", error);
  }

  if (!actionableInsights) {
    return <div>Error loading actionable insights</div>;
  }

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

  if (!actionableInsights) {
    return <div>Error loading actionable insights</div>;
  }

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
                {getPriorityBadge(insight.priority.toLocaleUpperCase())}
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
