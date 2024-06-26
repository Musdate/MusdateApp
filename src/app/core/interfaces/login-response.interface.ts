import { User } from "./index";

export interface LoginResponse {
    user:  User;
    token: string;
}