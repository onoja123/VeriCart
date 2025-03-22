import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
import { IdentityStatus, UserType } from "../types/enums/user";
import { Iuser } from "../types/interfaces/user.inter";


const userSchema = new Schema<Iuser>({
	firstname: {
		type: String,
	},
    lastname: {
		type: String,
	},
    phone: {
		type: String,
	},
    gender: {
		type: String,
	},
	email: {
		type: String,
		unique: true,
		index: true,
		lowercase: true,
	},
	userType: {
		  type: String,
		  enum: Object.values(UserType),
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	image: {
		type: String,
		default: '',
	},
	isActive: {
		type: Boolean,
		required: true,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
    verificationToken: {
			type: String
	},
	verificationTokenExpires: {
			type: Date
	},
    otp: {
        code: {
            type: Number
        },
        expiresAt: {
            type: Date
        }
    },
	_service: [
		{
			type: Schema.Types.ObjectId,
			ref: "Service"
		}
	],
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	verifyEmailToken: {
		type: String,
		select: false,
	},
	identityVerificationStatus: {
		type: String,
		enum: Object.values(IdentityStatus),
		default: IdentityStatus.PENDING
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	  },
});


userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
	  return next();
	}

	try {
	  const hashedPassword = await bcrypt.hash(this.password, 12);
	  this.password = hashedPassword;
	} catch (error) {

	  return next();
	}

	next();
});

userSchema.methods.matchTransactionPin = function (
	enteredPin: string
	){
	return bcrypt.compare(enteredPin, this.pin);
};


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY || '', {
      expiresIn: process.env.JWT_EXPIRES_IN || '',
    });
    return token;
};

userSchema.methods.correctPassword = async function(
    candidatePassword: string,
    userPassword: string
){
    return await bcrypt.compare(candidatePassword, userPassword)
}

function isValidObjectId(id: string): boolean {
	return mongoose.Types.ObjectId.isValid(id);
  }

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: any) {
    if (this.passwordChangedAt) {
      const changedTimestamp = String(
        this.passwordChangedAt.getTime() / 1000
      );

      return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
};



const User = mongoose.model<Iuser>('User', userSchema)

export default User;