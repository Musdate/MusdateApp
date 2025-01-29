export interface Pet {
    _id          : string;
    name         : string;
    comment      : string;
    walks        : Walk[];
    totalPrice   : number;
    pendingPrice : number;
}

export interface Walk {
    date      : string;
    isNewWeek : boolean;
    paid      : boolean;
    clicked?  : boolean;
}

export interface UpdatePet {
    name?    : string;
    comment? : string;
    walks?   : Walk[];
}