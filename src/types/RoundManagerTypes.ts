export interface roundOrderCategory {
  type: "category";
  categoryId: string;
  categoryName: string;
}

export interface roundOrderMiniGame {
  type: "minigame";
  minigame: string;
}

export interface IRoundManager {
  _id: string;
  isManual: boolean;
  roundOrder: roundOrderCategory | roundOrderMiniGame[];
  roundSettings: {
    suggestBreak: boolean;
    breakDuration: number;
    pauseAfterRule: number;
    pauseAfterQuestion: number;
  };
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type createRoundTypePayload = Omit<
  IRoundManager,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;

export type updateRoundTypePayload = Partial<createRoundTypePayload>;
