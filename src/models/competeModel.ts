export interface Compete {
    roomId : string;
    raceData : Array<IndividualResult>
}

export interface IndividualResult {
    userId : string;
    username: string;
    result: Result;
}