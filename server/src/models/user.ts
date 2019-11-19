import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  password: string;
  tokens: { token: string }[];
}

export interface IntUser extends IUser {
  generateAuthToken: () => string;
}

export interface IntUserModel extends Model<IntUser> {
  findByCredentials: (email: string, password: string) => Promise<IntUser>;
}

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value: string): any | boolean {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    phonenumber: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    tokens: [{ token: { type: String, required: true } }],
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

userSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'creator',
});

userSchema.methods.toJSON = function(): Document {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function(): Promise<string> {
  const token: string = jwt.sign(
    { _id: this._id.toString() },
    process.env.JWT_SECRET || ''
  );

  this.tokens = this.tokens.concat({ token });

  await this.save();
  return token;
};
// kk

userSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

userSchema.pre<IntUser>('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const plaintext = this.get('password');
  this.set('password', bcrypt.hashSync(plaintext, 8));
  next();
});

const User: IntUserModel = mongoose.model<IUser, IntUserModel>(
  'User',
  userSchema
);

export default User;
