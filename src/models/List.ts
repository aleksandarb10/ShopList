import {Date, Document, Model, model, Schema} from "mongoose";
import mongoose from "mongoose";
import IList from "../interfaces/List";

  const ListSchema:Schema = new Schema(
      {
      
        UserID:{type:String},
        ListName:{type:String,required:true,unique:true},
        Products:{ type:[String,Number]},
        _id:{ type: mongoose.Types.ObjectId} 
       
    },
    {
        timestamps: true
    }
); 

 const List: Model<IList> = model("List", ListSchema); 

 export default List;