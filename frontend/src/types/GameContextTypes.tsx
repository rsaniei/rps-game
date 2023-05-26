export type weaponType = { id: string; image: string };
export type resultsType = { wins: number; draws: number; loses: number };
export type userType = { _id: string; userName: string; score: number };

export type lastResultType = "drew" | "won" | "lost" | null;
