const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const token = require("../utils/generatetoken");

exports.signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password does not match" });
    } 
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    // later i will hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //profile oic url api
    const maleProfie = `https://avatar.iran.liara.run/public/boy?userName=${userName}`;
    const femaleProfile = `https://avatar.iran.liara.run/public/girl?userName=${userName}`;
    const newUser = new User({
      fullName,
      userName,
      password: hashPassword,
      gender,
      profilePicture: gender === "male" ? maleProfie : femaleProfile,
    });
    if (newUser) {
      token.generateTokenAndSaveCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePicture: newUser.profilePicture,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    console.log("Error while signup controller", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.signin = async (req, res) => {
  try {
    const {userName, password} =req.body;
    const user = await User.findOne({userName});
    const isValidPassword = await bcrypt.compare(password, user?.password ||"");
    if(!user || !isValidPassword){
      return res.status(400).json({ error: "Invalid credentials" });
    }
    token.generateTokenAndSaveCookie(user._id, res);
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePicture: user.profilePicture,
      createdAt : user.createdAt
    });
  } catch (err) {
    console.log("Error while signin controller", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.signout = async (req, res) => {
  try{
   res.cookie("jwt","",{
    maxAge:0
   });
   res.status(200).json({message: "Logged out successfully"});
  }catch(err){
    console.log("Error while signout controller", err.message);
    return res.status(500).json({error: "Internal server error"});
  }
};
