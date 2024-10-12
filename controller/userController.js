const { userModel } = require("../model/userModel.js");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.jwt_secret, { expiresIn: "15m" });
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, msg: "user already exists!" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        msg: "password should contain min 8 characters!",
      });
    }
    console.log(".....");
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);
    const newUser = new userModel({
      email,
      password: hashPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      msg: "User signed up successfully!",
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      return res.status(404).json({ success: false, msg: "user not exists!" });
    }

    const hashPassword = await bcrypt.compare(password, userExists.password);

    if (!hashPassword) {
      return res
        .status(401)
        .json({ success: false, msg: "incorrect email or password!" });
    }

    const token = createToken(userExists._id);

    res.status(200).json({
      success: true,
      msg: "User logged in successfully!",
      data: token,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "error" });
  }
};

const profile = async (req, res) => {
  const id = req.body._id;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "user not exists!" });
    }
    res.status(200).json({ success: true, msg: "user profile", user });
  } catch (error) {
    res.status(500).json({ success: false, msg: "error" });
  }
};

module.exports = { signup, login, profile };
