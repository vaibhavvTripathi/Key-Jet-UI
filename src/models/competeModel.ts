export interface Compete {
    roomId : string;
    raceData : Array<IndividualResult>
}

export interface IndividualResult {
    userId : string;
    username: string;
    result: Result;
}

export enum Process {
   RACE_STARTED = 0,
   RACE_INITIALIZING = 1,
   RACE_NOT_STARTED = 2,
   RACE_ENDED = 3
}