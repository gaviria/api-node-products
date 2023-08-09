import { Document, ObjectId, Schema, model } from "mongoose";

export interface IRole {
    name: string;
}

export const ROLES = ["user", "admin", "moderator"];

const roleSchema = new Schema({
    name: String
},{
    versionKey: false
});

export default model<IRole>("Role", roleSchema);