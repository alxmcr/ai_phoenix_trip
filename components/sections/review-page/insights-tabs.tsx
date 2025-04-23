"use client";

import { ActionableData } from "@/app/types/db/actionable";
import { RecommendationData } from "@/app/types/db/recommendation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  BarChart,
  Briefcase,
  CheckCircle,
  Clock,
  FileText,
  Lightbulb,
  Target,
  Zap,
} from "lucide-react";

interface InsightsTabsProps {
  actionables: ActionableData[];
  recommendations: RecommendationData[];
}

export function InsightsTabs({
  actionables,
  recommendations,
}: InsightsTabsProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-rose-100 text-rose-800";
      case "Medium":
        return "bg-amber-100 text-amber-800";
      case "Low":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "High":
        return <AlertTriangle className="h-5 w-5 text-rose-500" />;
      case "Medium":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "Low":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "High":
        return <Zap className="h-5 w-5 text-rose-500" />;
      case "Medium":
        return <Target className="h-5 w-5 text-amber-500" />;
      case "Low":
        return <BarChart className="h-5 w-5 text-emerald-500" />;
    }
  };

  return (
    <Tabs defaultValue="actionables" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6 h-15">
        <TabsTrigger value="actionables" className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          Actionables
        </TabsTrigger>
        <TabsTrigger
          value="recommendations"
          className="flex items-center gap-2"
        >
          <Lightbulb className="h-4 w-4" />
          Recommendations
        </TabsTrigger>
      </TabsList>

      <TabsContent value="actionables">
        <div className="grid grid-cols-1 gap-4">
          {actionables
            ? actionables.map((item) => (
                <Card key={item.actionable_id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {getPriorityIcon(item.priority)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">
                            {item.title}
                          </h3>
                          <Badge className={getPriorityColor(item.priority)}>
                            {item.priority} Priority
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Briefcase className="h-3 w-3" />
                            {item.department}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <FileText className="h-3 w-3" />
                            {item.category}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            Source: {item.source_aspect}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            : null}
        </div>
      </TabsContent>

      <TabsContent value="recommendations">
        <div className="grid grid-cols-1 gap-4">
          {recommendations
            ? recommendations.map((item) => (
                <Card key={item.recommendation_id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {getImpactIcon(item.impact)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">
                            {item.title}
                          </h3>
                          <div className="flex gap-2">
                            <Badge className={getPriorityColor(item.impact)}>
                              {item.impact} Impact
                            </Badge>
                            {item.data_driven && (
                              <Badge
                                variant="secondary"
                                className="flex items-center gap-1"
                              >
                                <BarChart className="h-3 w-3" />
                                Data-Driven
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Target className="h-3 w-3" />
                            {item.target_area}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={getPriorityColor(item.effort_level)}
                          >
                            {item.effort_level} Effort
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            : null}
        </div>
      </TabsContent>
    </Tabs>
  );
}
