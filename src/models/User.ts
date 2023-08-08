import { Document, ObjectId, Schema, Types, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document<ObjectId>{
    username: string;
    email: string;
    password: string;
    roles: ObjectId[];
    encryptPassword(password:string):Promise<string>,
    comparePassword(password:string, receivedPassword:string): Promise<boolean>,
}

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
});

userSchema.methods.encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.methods.comparePassword = async (password:string, receivedPassword:string) => {
    return await bcrypt.compare(password,receivedPassword);
}

export default model<IUser>("User", userSchema);