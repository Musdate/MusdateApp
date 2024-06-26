import { User } from "./index";

export interface CheckTokenResponse {
    user:  User;
    token: string;
}