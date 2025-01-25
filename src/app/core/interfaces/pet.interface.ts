export interface Pet {
    _id        : string;
    name       : string;
    comment    : string;
    walks      : Walk[];
    totalPrice : number;
}

export interface Walk {
    date: string;
    isNewWeek: boolean;
}