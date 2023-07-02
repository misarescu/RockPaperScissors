import { z } from "zod";

export const PlayerDataSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  score: z.number(),
});

export type PlayerDataType = z.infer<typeof PlayerDataSchema>;
