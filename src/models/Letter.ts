type Letter = {
     value : string;
     isCurrent : boolean;
     color : Color;
}
export enum Color {
     RED = 0,
     GREEN = 1,
     BLUE = 2
}

export default Letter;