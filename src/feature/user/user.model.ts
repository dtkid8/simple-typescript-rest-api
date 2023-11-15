import * as mongoose from "mongoose";
import bcrypt from 'bcrypt';
import Config from "../../shared/config/config";
import { BadRequestError } from "../../shared/error/error";

export interface IUser extends mongoose.Document {
    username: string;
    password: string;
    email: string;
}

export const UserSchema = new mongoose.Schema({
    username: {
        type: String, required: true, unique: true,
    },
    password: { type: String, required: true, },
    email: {
        type: String, required: true,
        unique: true,
    }
},);

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const saltRounds = Config.JWT_SALT;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error as mongoose.CallbackError);
    }
}
);

UserSchema.statics.findById = async function (id: String) {
    try {
        const result = await User.findOne({ _id: id }).select('-_id -__v -password');
        return result;
    }
    catch (e) {
        throw new BadRequestError("User Not Found", undefined, e);
    }
};

const User = mongoose.model<IUser>("User", UserSchema);
export default User; 
