const UserModel = require("../api/user/user.model");
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

async function signUpUser(user) {
  const { email, password } = user;
  const existEmail = await UserModel.findOne({ email });

  if (existEmail) {
    return null;
  }
  const newUser = new UserModel(user);
  newUser.password = CryptoJS.AES.encrypt(password, process.env.PASS_SECRET_KEY).toString();
  await newUser.save();
  return newUser;
}

async function signInUser(user) { 
  const { email, password } = user;

  try {
    const existUser = await UserModel.findOne({ email });

    if (!existUser) {
      return null;
    }
    const decryptedPassword = CryptoJS.AES.decrypt(existUser.password, process.env.PASS_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    if (decryptedPassword !== password) {
      return null;
    }
    return existUser;
  } catch (error) {
    return null;
  }
}

function signToken(payload) {
  const token = JWT.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
}

module.exports = {
  signUpUser,
  signInUser,
  signToken,
}
