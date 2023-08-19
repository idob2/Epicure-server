import mongoose from "mongoose"

export interface IChef {
    name:string,    
    image:string,
    description: string,
    restaurants: mongoose.Schema.Types.ObjectId[],
    is_active: boolean,
  };