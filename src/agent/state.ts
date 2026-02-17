import { Annotation } from "@langchain/langgraph";
import * as z from "zod";

export const stateSchema = z.object({
  citation: z.string(),
  correction:z.string(),
  auteur:z.string().optional(),
  resultats: z.array(z.string()),
  sortieCombine: z.string().optional(),
  histoire:z.string().optional()
});

export const State = Annotation.Root({
  citation: Annotation<string>(),
  correction:Annotation<string>(),
  auteur:Annotation<string>(),
  resultats: Annotation<string[]>({
    reducer: (currentState, next) => currentState.concat(next),
    default: () => [],
  }),
sortieCombine:Annotation<string>(),
  histoire:Annotation<string>()
});
