import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smile, Meh, Frown } from "lucide-react";
import { SentimentData } from "@/app/types/db/sentiment";
import { getLabelColor, getScoreColor } from "@/app/helpers/models/sentiments";

interface Props {
  sentiment: SentimentData;
}

export function Sentiment({ sentiment }: Props) {
  const getEmotionIcon = (sentiment: SentimentData) => {
    if (!sentiment) {
      return <div>No sentiment data available</div>;
    }

    switch (sentiment.label.toLowerCase()) {
      case "positive":
        return <Smile className="h-16 w-16 text-emerald-500" />;
      case "neutral":
        return <Meh className="h-16 w-16 text-blue-500" />;
      case "negative":
        return <Frown className="h-16 w-16 text-rose-500" />;
      default:
        return <div>No sentiment data available</div>;
    }
  };

  // Check if the sentiment is valid
  if (!sentiment) {
    return <div>No sentiment data available</div>;
  }

  return (
    <section className="mb-8 px-4 md:px-0 container">
      <h2 className="text-2xl font-bold tracking-tight mb-4">
        Sentiment Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emotion Tone</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-6">
            {getEmotionIcon(sentiment)}
            <h3 className="mt-4 text-2xl font-bold">
              {sentiment.emotion_tone.toUpperCase()}
            </h3>
            <div
              className={`mt-2 text-3xl font-bold ${getScoreColor(sentiment)}`}
            >
              {(sentiment.score * 10).toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Sentiment Score
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Analysis Summary</CardTitle>
            <CardDescription>
              Key emotions and sentiments detected
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge
                key={sentiment.label}
                className={getLabelColor(sentiment.label.toLowerCase())}
              >
                {sentiment.label.toLocaleUpperCase()}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{sentiment.summary}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
