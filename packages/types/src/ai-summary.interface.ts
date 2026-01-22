export interface AiSummary {
  id: string;
  prompt: string;
  response: {
    title: string;
    summary: string;
    keyPoints: string[];
  };
  createdAt: Date;
}
