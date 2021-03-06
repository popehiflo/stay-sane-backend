const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  userName: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    required: true,
    default: "PATIENT_ROLE",
  },
  google: {
    type: Boolean,
    default: false,
  },
  facebook: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
  versionKey: false,
});

UserSchema.virtual("profile").get(function () {
  const { _id, firstName, lastName, userName, email, role, isAdmin } = this;
  return {
    _id,
    fullName: `${firstName} ${lastName}`,
    userName,
    email,
    role,
    isAdmin,
  };
});

module.exports = model('User', UserSchema);
