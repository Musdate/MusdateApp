export interface Pet {
    _id          : string;
    name         : string;
    comment      : string;
    walks        : Walk[];
    totalPrice   : number;
    pendingPrice : number;
}

export interface UpdatePet {
    name?    : string;
    comment? : string;
    walks?   : Walk[];
}

export interface Walk {
    date      : string;
    isNewWeek : boolean;
    paid      : boolean;
    clicked?  : boolean;
}

export interface WalksPrice {
    _id?      : string;
    oneDay    : number;
    threeDays : number;
    fourDays  : number;
    fiveDays  : number;
}