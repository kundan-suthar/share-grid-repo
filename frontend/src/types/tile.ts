export type Tile = {
  id: number;
  x: number;
  y: number;
  ownerId: string | null;
  claimedAt: string | null;
};

export type CaptureTilePayload = {
  userId: string;
  tileId: number;
};
