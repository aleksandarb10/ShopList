import { Document, Model, model, Schema } from "mongoose";
import IUser from "../interfaces/User"


const userSchema: Schema = new Schema(
  {
    email: {type: String,unique: true},
    password: {type: String,required: true}
},
{
  timestamps: true
});

const User: Model<IUser> = model("User", userSchema);

export default User;
