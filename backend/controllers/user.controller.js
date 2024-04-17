const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
exports.getUsersForSidebar = async(req, res)=>{
try {
  const loggedInUserId = req.user._id;
  const filteredUsers = await User.find({_id: { $ne: loggedInUserId}}).select("-password");
  return res.status(200).json(filteredUsers);   
} catch (err) {
    console.log("Error while getUsersForSidebar controller: ", err.message);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      data: {}
    });
}
}
exports.updateUserPassword = async (req, res) => {
  try {
    const { new_password, old_password } = req.body;
    
    // Check if both new and old passwords are provided
    if (!new_password || !old_password) {
      return res.status(400).json({ error: "Both new and old passwords are required" });
    }

    // Validate the new password length
    if (new_password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // Check if old and new passwords are different
    if (old_password === new_password) {
      return res.status(400).json({ error: "Old password and new password can't be the same" });
    }

    const loggedInUserId = req.user._id;
    const user = await User.findById(loggedInUserId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(old_password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid old password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_password, salt);
    
    // Update the password for the logged-in user
    await User.updateOne(
      { _id: loggedInUserId }, // Update only the logged-in user
      { $set: { password: hashedPassword } }
    );
      return res.status(200).json({
      error: false,
      message: "Password updated successfully",
      data: {}
    });
    
    //return res.status(200).json({ success: "Password updated successfully" });

  } catch (err) {
    console.error("Error while updateUserPassword controller: ", err.message);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      data: {}
    });
  }
}; 

exports.updateUserInfo = async(req,res)=>{
  try {
    const {fullName, userName} = req.body;
    if(!fullName && !userName){
      return res.status(400).json({error: "Please enter fullname or username"});
    }
    const loggedInUserId = req.user._id;
    const user = await User.findById(loggedInUserId);
    if(!user){
      return res.status(404).json({ error: "User not found" });
    }
    const updatedUser= await User.findOneAndUpdate(
      { _id: loggedInUserId },   // Find the document with the specified ObjectId
      { $set: { fullName: fullName, userName: userName } },    // Set the status field to "active"
      { returnDocument: "after" }         // Return the updated document
   )
   return res.status(200).json({
    error: false,
    message: "UserInfo updated successfully",
    data: {updatedUser}
  });
  
  //  return res.status(200).json({ success: "UserInfo updated successfully" });
  } catch (err) {
    console.error("Error while updateUserInfo controller: ", err.message);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      data: {}
    });
  }
}
