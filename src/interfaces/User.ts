import { Document } from 'mongoose';

/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 */

export default interface IUser extends Document {
    email: string;
    password: string;
}

