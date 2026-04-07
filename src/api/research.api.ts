import { apiClient } from "./client";
import type { ResearchSession, ResearchJob } from "@/types";

export const researchApi = {
  getSessions: async () => {
    const response = await apiClient.get("research/sessions").json<any>();
    return Array.isArray(response)
      ? response
      : response.data || response.sessions || [];
  },

  createSession: (data: {
    title: string;
    description?: string;
    provider: string;
  }) =>
    apiClient.post("research/sessions", { json: data }).json<ResearchSession>(),

  getSession: (id: number) =>
    apiClient.get(`research/sessions/${id}`).json<ResearchSession>(),

  submitQuery: (sessionId: number, query: string, provider: string) =>
    apiClient
      .post("research/query", { json: { sessionId, query, provider } })
      .json<{ jobId: string; sessionId: number; status: string }>(),

  getJob: (jobId: string) =>
    apiClient.get(`research/jobs/${jobId}`).json<ResearchJob>(),
};
