export interface User {
    _id:      string;
    email:    string;
    name:     string;
    isActive: boolean;
    roles:    string[];
    banks:    Bank[];
}

export interface CreateUser {
    name     : string;
    email    : string;
    password : string;
}

export interface UpdateUser {
    name   : string;
    banks? : Bank[];
}

export interface Bank {
    name: string,
    number: string
}