import type { AiSearchResponse } from "@repo/types";
import { api } from ".";

export const searchAiContent = async (query: string): Promise<AiSearchResponse> =>
  await api.post("/ai/search", { query });
