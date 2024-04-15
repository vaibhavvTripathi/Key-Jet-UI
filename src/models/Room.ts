export type IRoom = {
  createTime: Date;
  startTime: Date | undefined | null;
  roomId: string;
  players: Array<Player>; // username against Userperformance
  currentStatus: RaceStatus;
};

export type Player = {
  username: string;
  performance: Array<Result>;
};
export enum RaceStatus {
  INITIALISED = 0, // HOST JOINED
  INTERMEDIATE = 1, // BOTH PLAYERS JOINED BUT WAITING
  STARTED = 2, // RACE STARTED
  ENDED = 3, // ISN'T IT OBVIOUS
  DEPRECATED = 4,
}
