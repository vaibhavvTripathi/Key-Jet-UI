export type Room = {
  total_participants: number;
  participants: Array<Participant>;
};
export type Participant = {
  cw: number;
  speed: number;
  name: string;
};
