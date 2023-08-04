import { Document, Schema, model } from "mongoose";

export interface IProduct extends Document{
    name: string,
    category: string,
    price: number,
    imgUrl: string
}

const productSchema = new Schema({
    name: {
        type: String,
        require: true,
        min: 4
    },
    category: String,
    price: Number,
    imgUrl: String
},{
    timestamps: true,
    versionKey: false,
});

export default model<IProduct>("Product", productSchema);