import { QueryClient } from "@tanstack/solid-query";

export const QueryClientKeys = {
  goals: "goals",
  goalCategories: "goal-categories",
};

export const queryClient = new QueryClient();

