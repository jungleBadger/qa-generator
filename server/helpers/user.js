"use strict";

const User = require("../models/User"); // Import the User model

// Function to create a new user
async function createUser(profile) {
  try {
    // Create a new user document with profile information
    const newUser = new User({
      _id: profile.id, // Use Auth0 profile ID as the user ID
      owner: profile.displayName || profile.name || "" // Use displayName or name from the profile
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    console.log("User created:", savedUser);
    return savedUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// Function to find a user by ID
async function findUser(userId) {
  try {
    // Find the user with the given ID
    return await User.findById(userId);
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
}

// Function to find a user by profile ID
async function findUserByProfileId(profileId) {
  try {
    // Find the user with the given profile ID
    return await User.findOne({ _id: profileId });
  } catch (error) {
    console.error("Error finding user by profile ID:", error);
    throw error;
  }
}

// Function to get all users
async function getUsers() {
  try {
    // Retrieve all user documents
    return await User.find();
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
}

// Function to update a user
async function updateUser(userId, updateData) {
  try {
    // Update the user with the given ID using updateData
    return await User.findByIdAndUpdate(userId, updateData, {
      new: true, // Return the updated document
      runValidators: true // Run schema validators on the update
    });
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

// Function to delete a user
async function deleteUser(userId) {
  try {
    // Delete the user with the given ID
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

// Export the user helper functions
module.exports = {
  createUser,
  findUser,
  findUserByProfileId,
  getUsers,
  updateUser,
  deleteUser
};
