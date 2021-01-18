import { Document } from 'mongoose';
import mongoose from "mongoose";
import IUser from './user';

export default interface IList extends Document {
    UserID: string;
    ListName: string;
    Products: [string, number];
    _id: mongoose.Types.ObjectId;
    
}
