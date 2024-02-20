const express = require("express");
const User = require("../models/user.model");
exports.getUsersForSidebar = async(req, res)=>{
try {
  const loggedInUserId = req.user._id;
  const filteredUsers = await User.find({_id: { $ne: loggedInUserId}}).select("-password");
  return res.status(200).json(filteredUsers);   
} catch (err) {
    console.log("Error while getUsersForSidebar controller: ", err.message);
    return res.status(500).json({ error: "Internal server error" })
}
}