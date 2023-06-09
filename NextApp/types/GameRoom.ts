import { z } from "zod";

export const GameRoomSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(32),
  playerLimit: z.number().min(2).max(12),
  playerName: z.string(),
  playerList: z.string().array(),
});

export type GameRoomType = z.infer<typeof GameRoomSchema>;
