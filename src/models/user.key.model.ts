import { Schema } from "mongoose";

export enum UserRole {
    ADMIN='Admin',
    USER='User',
}

export class UserKey {
    _id?: string;
    apiKey: string;
    userId?: string;
    role: UserRole;
}