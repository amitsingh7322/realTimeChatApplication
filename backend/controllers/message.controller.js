const express = require("express");
const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    console.log("req", message, receiverId, senderId);
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error while sendMessage controller: ", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const { id: userWithChat } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userWithChat] },
    }).populate("messages"); //not reference but actual messages
    if (!conversation) return res.status(201).json([]);
    const messages = conversation.messages;
    return res.status(201).json(messages);
  } catch (err) {
    console.log("Error while getMessage controller: ", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
